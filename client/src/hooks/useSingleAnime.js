import { useQuery } from "react-query"
import { getAnime } from "../api";
import useWatchlist from "./useWatchlist";

const useSingleAnime = (slug)=>{
    const { isLoading, 
        data: [anime, reviews, similarAnimes] = [null, null, []]
    } = useQuery(
        ['anime', slug], ()=>getAnime(slug).then(res=>res.data)
    );
    const { isInWatchlist } = useWatchlist();
    return { status:isInWatchlist(slug), isLoading, anime, reviews, similarAnimes };
}

export default useSingleAnime;