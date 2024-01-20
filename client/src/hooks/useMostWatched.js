import { useQuery } from "react-query"
import { getMostWatched } from "../api"

const useMostWatched = ()=>{
    const { data:animes = [] } = useQuery('most-watched', ()=>getMostWatched().then(res=>res.data));
    return animes; 
}

export default useMostWatched;