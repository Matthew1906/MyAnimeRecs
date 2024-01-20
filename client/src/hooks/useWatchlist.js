import { useCookies } from "react-cookie";

const useWatchlist = ()=>{
    const [ cookies, setCookie ] = useCookies(['watchlist']);
    const addToWatchlist = (id, rating)=>{
        const watchlist = cookies?.watchlist??[];
        watchlist.push({anime_id:id, rating});
        setCookie('watchlist', watchlist)
    }
    const removeFromWatchlist = (id)=>{
        const watchlist = cookies?.watchlist??[];
        const newWatchlist = watchlist.filter(value=>value.anime_id!==id);
        setCookie('watchlist', newWatchlist);
    }
    const isInWatchlist = (id)=>{
        const watchlist = cookies?.watchlist??[];
        const filtered = watchlist.filter(value=>value.anime_id===id);
        return filtered.length===0
    }
    
    return { 
        watchlist: cookies?.watchlist??[], 
        addToWatchlist, removeFromWatchlist, isInWatchlist 
    }
}

export default useWatchlist;