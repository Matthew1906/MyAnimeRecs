import axiosClient from "./base";

export const getMostWatched = ()=>{
    return axiosClient.get('/api/trending');
}

export const getRecommendations = (body)=>{
    return axiosClient.post('/api/recommendation', body);
}

export const getWatchlist = (offset, query, body)=>{
    return axiosClient.post(`/api/watchlist?offset=${offset}&query=${query}`, body);
}

export const getAnimes = (offset, query)=>{
    return axiosClient.get(`/api/all?offset=${offset}&query=${query}`);
}

export const getAnime = (slug)=>{
    return axiosClient.get(`/api/${slug}`);
}