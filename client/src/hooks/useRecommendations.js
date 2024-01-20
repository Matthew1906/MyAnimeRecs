import { useQuery } from "react-query"
import { getRecommendations, getMostWatched } from "../api"
import { useCookies } from "react-cookie";

const useRecommendations = ()=>{
    const [ cookies ] = useCookies(['watchlist']);
    const { data:animes = [] } = useQuery('recommendations', ()=>{
        const watchlist = cookies?.watchlist??[];
        if(watchlist.length>0){
            return getRecommendations(watchlist).then(res=>res.data)
        }
        else{
            return getMostWatched().then(res=>res.data)
        }
    });
    return animes; 
}

export default useRecommendations;