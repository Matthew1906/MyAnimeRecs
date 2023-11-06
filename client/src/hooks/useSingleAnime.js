import { useQuery } from "react-query"
import { getAnime } from "../api";

const useSingleAnime = (slug)=>{
    const { isLoading, 
        data: [anime, reviews, similarAnimes] = [null, null, []]
    } = useQuery(
        ['anime', slug], ()=>getAnime(slug).then(res=>res.data)
    );
    return { isLoading, anime, reviews, similarAnimes };
}

export default useSingleAnime;