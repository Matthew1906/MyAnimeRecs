from db import get_database
from flask import Flask, jsonify

app = Flask(__name__)

db = get_database()

collection = db['animes']

@app.route("/")
def get_animes():
    animes = collection.aggregate([
        {'$sort':{'score':-1}}, {'$limit':100}, {'$project':{'_id':0}}, {'$sample':{'size':20}}
    ])
    result = [ anime for anime in animes ]
    return jsonify(result)

@app.route("/<slug>")
def get_anime(slug):
    anime = collection.find_one({'slug':slug}, {'_id':0})
    return jsonify(anime)

if __name__ == '__main__':
    app.run(debug=True)
