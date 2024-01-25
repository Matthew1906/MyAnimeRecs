from db import get_database
from flask import Flask, jsonify, request
from flask_cors import CORS
from os import environ
from recommendation import get_recommended_animes

app = Flask(__name__)
CORS(app=app)

db = get_database()

anime_collection = db['animes']
review_collection = db['reviews']

@app.route("/api/trending")
def get_trending():
    animes = anime_collection.aggregate([
        {"$match": { "image": {"$ne": None}}},
        {'$sort':{'score':-1}}, {'$limit':100}, 
        {'$project':{'_id':0}}, {'$sample':{'size':10}}
    ])
    result = [ anime for anime in animes ]
    return jsonify(result)

@app.route("/api/recommendation", methods=['POST'])
def get_recommendations():
    watchlist = request.json
    recommendations = get_recommended_animes(watchlist, 10, 10)
    recommended_animes = anime_collection.aggregate([
        { '$match':{'id':{'$in':recommendations}}},
        { '$project': { 
            '_id':0, 'title':1, 'slug': 1, 'id':1,
            'image': 1, 'score' : 1, 'members': 1,
        }},
        { '$sort':{'title':1} }
    ])
    animes = [ anime for anime in recommended_animes ]
    return jsonify(animes)

@app.route("/api/all")
def get_animes():
    query = request.args.get('query', "")
    offset = int(request.args.get('offset', 0))
    if query.strip()=='':
        noquery_count = anime_collection.count_documents({})
        animes_noquery = anime_collection.aggregate([ 
            {'$sort':{'title':1}},
            {'$skip':offset}, 
            {'$project':{
                '_id':0, 'title':1, 'slug': 1, 'image': 1, 
                'score' : 1, 'members': 1, 'offset':1
            }}, 
            {'$limit':20}
        ])
        result = list(animes_noquery)
        return jsonify(count=noquery_count, animes=result)
    else:
        query_count = anime_collection.count_documents({"title":{'$regex':query.lower(), '$options':'i'}})
        animes_query = anime_collection.aggregate([ 
            { '$sort':{'title':1} },
            { '$match': {'title':{'$regex':query.lower(), '$options':'i'}} },
            { '$skip':offset },
            { '$project':{
                '_id':0, 'title':1, 'slug': 1,
                'image': 1, 'score' : 1, 'members': 1
            }}, 
            { '$limit':20 }
        ])
        result = list(animes_query)
        return jsonify(count=query_count, animes=result)

@app.route("/api/watchlist", methods=['POST'])
def get_watchlist():
    query = request.args.get('query', "")
    offset = int(request.args.get('offset', 0))
    watchlist = list(map(lambda x:x['anime_id'], request.json))
    print(watchlist)
    if query.strip()=='':
        watchlist_count = anime_collection.count_documents({'id':{'$in':watchlist}})
        watchlist_animes = anime_collection.aggregate([
            { '$match':{'id':{'$in':watchlist}}},
            { '$skip':offset },
            { '$project': { 
                '_id':0, 'title':1, 'slug': 1, 'id':1,
                'image': 1, 'score' : 1, 'members': 1,
            }},
            { '$sort':{'title':1} }
        ])
        animes = [ anime for anime in watchlist_animes ]
        return jsonify(count=watchlist_count, animes=animes)
    else:
        watchlist_count = anime_collection.count_documents({'id':{'$in':watchlist}, 'title':{'$regex':query.lower(), '$options':'i'}})
        watchlist_animes = anime_collection.aggregate([
            { '$match':{'id':{'$in':watchlist}, 'title':{'$regex':query.lower(), '$options':'i'}}},
            { '$skip':offset },
            { '$project': { 
                '_id':0, 'title':1, 'slug': 1, 'id':1,
                'image': 1, 'score' : 1, 'members': 1,
            }},
            { '$sort':{'title':1} }
        ])
        animes = [ anime for anime in watchlist_animes ]
        return jsonify(count=watchlist_count, animes=animes)

@app.route("/api/<slug>")
def get_anime(slug):
    anime = anime_collection.find_one({'slug':slug}, {'_id':0})
    review_data = review_collection.find({'slug':slug}, {'_id':0})
    reviews = [review for review in review_data]
    similar_animes_data = anime_collection.aggregate([
        { '$set' : {'initGenres':anime['genres'], 'initThemes':anime['themes']} },
        { '$project': { 
            '_id':0, 'title':1, 'slug': 1,
            'image': 1, 'score' : 1, 'members': 1,
            'intersectGenres':{'$setIntersection':['$genres', '$initGenres']},
            'intersectThemes':{'$setIntersection':['$themes', '$initThemes']},
        }},
        { '$match': {
            "$and":[
                {"intersectGenres":{'$ne':[]}},
                {"intersectThemes":{'$ne':[]}},
            ]
           } 
        },
        { '$sort':{'score':-1} }, { '$limit':10 }
    ])
    similar_animes = [ anime for anime in similar_animes_data ]
    return jsonify(anime, reviews, similar_animes)

if __name__ == '__main__':
    port = int(environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
