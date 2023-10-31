import axiosClient from "./base";

export const getAnimes = ()=>{
    return axiosClient.get('/api')
}

export const getAnime = (slug)=>{
    return axiosClient.get(`/api/${slug}`);
}