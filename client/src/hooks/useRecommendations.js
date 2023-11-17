import { useQuery } from "react-query"
import { getRecommendations } from "../api"

const useRecommendations = ()=>{
    const { data:animes = [] } = useQuery('recommendations', ()=>getRecommendations().then(res=>res.data));
    return animes; 
}

export default useRecommendations;