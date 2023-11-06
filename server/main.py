from db import get_database
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app=app)

db = get_database()

anime_collection = db['animes']
review_collection = db['reviews']

@app.route("/api")
def get_animes():
    animes = anime_collection.aggregate([
        {"$match": { "image": {"$ne": None}}},
        {'$sort':{'score':-1}}, {'$limit':100}, 
        {'$project':{'_id':0}}, {'$sample':{'size':20}}
    ])
    result = [ anime for anime in animes ]
    return jsonify(result)

@app.route("/api/<slug>")
def get_anime(slug):
    anime = anime_collection.find_one({'slug':slug}, {'_id':0})
    review_data = review_collection.find({'slug':slug}, {'_id':0}, limit=10)
    reviews = [review for review in review_data]
    similar_animes_data = anime_collection.aggregate([
        { '$set' : {'initGenres':anime['genres']} },
        { '$project': { 
            '_id':0, 'title':1, 'slug': 1,
            'image': 1, 'score' : 1, 'members': 1,
            'intersectGenres':{'$setIntersection':['$genres', '$initGenres']},
        }},
        { '$match': {"intersectGenres":{'$ne':[]}} },
        { '$sort':{'score':-1} }, { '$limit':15 }
    ])
    similar_animes = [ anime for anime in similar_animes_data ]
    return jsonify(anime, reviews, similar_animes)

if __name__ == '__main__':
    app.run(debug=True)
