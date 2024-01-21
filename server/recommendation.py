from pandas import concat, DataFrame, read_csv
from numpy import dot, mean, multiply
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import MinMaxScaler

def get_pred_rating(user_anime_matrix, dummy_train, user_id, n_similar_users):
    # fill null values with zeros
    watchlist_matrix_clean = user_anime_matrix.fillna(0)
    
    # get top N similar users
    user_sim_score = DataFrame(
        cosine_similarity(watchlist_matrix_clean),
        index=watchlist_matrix_clean.index,
        columns=watchlist_matrix_clean.index
    )
    selected_user_ids = user_sim_score.loc[user_id]\
        .sort_values(ascending=False)[:n_similar_users+1].index

    # subset the user-anime interaction matrix, user-user similarity matrix, and the dummy matrix
    selected_user_sim_score = user_sim_score.loc[user_id, selected_user_ids]
    selected_user_watchlist_matrix = watchlist_matrix_clean.loc[selected_user_ids]
    selected_dummy_train = dummy_train.loc[selected_user_ids]

    # predict the score for possible unwatched animes
    aumr = mean(watchlist_matrix_clean.loc[user_id]) # get average user rating for the watched animes
    user_predicted_ratings = dot(selected_user_sim_score, selected_user_watchlist_matrix) + aumr
    user_final_rating = multiply(user_predicted_ratings,selected_dummy_train) 
    
    # return user final rating
    return user_final_rating

def get_recommended_animes(watchlist, n_recommendations, n_similar_users):
    # create user-anime interaction matrix
    client_watchlist = DataFrame(watchlist)
    client_watchlist['user_id'] = 1
    train_data = read_csv('watchlist.csv')
    train_data = concat([train_data, client_watchlist])
    user_anime_matrix = train_data.pivot(index='user_id', columns='anime_id', values='rating')

    # create a dummy data to mark unwatched animes
    dummy_train = train_data.copy()
    dummy_train['rating'] = dummy_train['rating'].apply(lambda x: 0 if x>=1 else 1)
    dummy_train = dummy_train.pivot(index='user_id', columns='anime_id', values='rating').fillna(1)
    
    # get rating predictions
    pred_rating_data = get_pred_rating(user_anime_matrix, dummy_train, 1, n_similar_users)
    possible_recoms = pred_rating_data.loc[1].rename('predicted_ratings').reset_index()
    
    # Scale the predicted ratings
    sc = MinMaxScaler()
    possible_recoms['predicted_ratings'] = sc.fit_transform(possible_recoms[['predicted_ratings']])*10
    
    # create and return dataframe of top N recommendations
    recommendations = possible_recoms.sort_values('predicted_ratings',ascending=False)[:n_recommendations]
    recommendations = DataFrame(recommendations).reset_index(drop=True).rename(columns={'1':'predicted_ratings'})
    recommendations['user_id'] = 1
    
    # return recommendation in the form of anime ids 
    return recommendations['anime_id'].tolist()