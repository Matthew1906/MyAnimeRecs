import { useEffect, useState } from "react";
import { getWatchlist } from "../api";
import useSearchContext from "./useSearchContext";
import { useCookies } from "react-cookie";

const useWatchlistAnimes = ()=>{
    const [ cookies ] = useCookies(['watchlist']);
    const { searchWatchlist: query, watchlistOffset: pagination } = useSearchContext();
    const [ animes, setAnimes ] = useState([]);
    const [ count, setCount ] = useState(0);
    useEffect(()=>{
        getWatchlist(pagination.currentPage, query, cookies?.watchlist??[]).then(res=>{
            if(typeof(res.data)=='string'){
                const result_string = res.data.replace('NaN', 'null');
                const data = JSON.parse(result_string)
                const { count:resCount, animes:resAnimes }  = data;
                setAnimes(resAnimes);
                setCount(resCount);
            }
            else{
                const { count:resCount, animes:resAnimes }  = res.data;
                setAnimes(resAnimes);
                setCount(resCount);
            }
        })
    }, [query, pagination.currentPage])
    return { pagination, animes, count }
}

export default useWatchlistAnimes;