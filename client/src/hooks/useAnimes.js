import { getAnimes } from "../api";
import useSearchContext from "./useSearchContext";
import { useEffect, useState } from "react";

const useAnimes = ()=>{
    const { searchAnime: query, animeOffset: pagination } = useSearchContext();
    const [ animes, setAnimes ] = useState([]);
    const [ count, setCount ] = useState(0);
    useEffect(()=>{
        getAnimes(pagination.currentPage, query).then(res=>{
            if(typeof(res.data)=='string'){
                console.log(res.data);
                const result_string = res.data.replace('NaN', 'null');
                console.log(result_string);
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
    return { 
        pagination,
        result:{ count, animes } 
    };
}

export default useAnimes;