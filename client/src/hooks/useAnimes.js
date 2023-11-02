import { useQuery } from "react-query"
import { getAnimes } from "../api"

const useAnimes = ()=>{
    const { data:animes = [] } = useQuery('animes', ()=>getAnimes().then(res=>res.data));
    return animes; 
}

export default useAnimes;