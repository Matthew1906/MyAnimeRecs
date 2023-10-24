from db import get_database
from pandas import read_json
from slugify import slugify

db = get_database()

validate_element = lambda var, null_value: var if var!= null_value else None

validate_list = lambda list_str, null_value: eval(list_str) if list_str!= null_value else None

def seed_animes():
    collection = db['animes']
    animes = read_json('./server/animes.json')
    for anime in animes.to_dict('records'):
        data = {
            'slug': slugify(anime['title'].lower()),
            'title':anime['title'],
            'duration': validate_element(anime['duration'], "Unknown"),
            'status': anime['status'],
            'episodes': anime['episodes'],
            'type': validate_element(anime['type'], 'Unknown'),
            'source': validate_element(anime['source'], 'Unknown'),
            'aired': validate_element(anime['aired'], 'Not available'),
            'demographic': validate_element(anime['demographic'], "NOT_EXIST"),
            'studio': validate_element(anime['studios'], "None found, add some"),
            'licensor': validate_element(anime['licensors'], "None found, add some"),
            'rating': validate_element(anime['rating'], 'None'),
            'synopsis': anime['synopsis'],
            'image': anime['image'],
            'synonyms': validate_element(anime['synonyms'], 'NOT_EXIST'),
            'japanese': validate_element(anime['japanese'], 'NOT_EXIST'),
            'genres': validate_list(anime['genres'], 'NOT_EXIST'),
            'themes': validate_list(anime['themes'], 'NOT_EXIST'),
            'producers': validate_list(anime['producers'], "['None found', 'add some']"),
            'voice_actors': validate_list(anime['voice_actors'], '[]'),
            'staffs': validate_list(anime['staffs'], '[]'),
            'platforms': validate_list(anime['platforms'], '[]'),
            'score': anime['score'],
            'ranked': int(anime['ranked'].replace("#", '')) if anime['ranked']!=None else None,
            'favorites': int(anime['favorites'].replace(',','')) if anime['favorites']!=None else 0,
            'popularity': int(anime['popularity'].replace("#", '')) if anime['popularity']!=None else None,
            'members': int(anime['members'].replace(',',''))if anime['members']!=None else 0,
        }
        collection.insert_one(data)

def seed_reviews():
    collection = db['reviews']
    reviews = read_json('./server/reviews.json')
    for review in reviews.to_dict('records'):
        data = {
            'slug': slugify(review['title'].lower()),
            'anime': review['title'],
            'status': review['status'],
            'rating': review['rating'],
            'body': review['body']
        }
        collection.insert_one(data)

seed_reviews()