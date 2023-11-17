import { useCookies } from "react-cookie";

const useWatchlist = ()=>{
    const [ cookies, setCookie ] = useCookies(['watchlist']);
    const addToWatchlist = (slug)=>{
        const watchlist = cookies?.watchlist??[];
        watchlist.push(slug);
        setCookie('watchlist', watchlist)
    }
    const removeFromWatchlist = (slug)=>{
        const watchlist = cookies?.watchlist??[];
        const newWatchlist = watchlist.filter(value=>value!==slug);
        setCookie('watchlist', newWatchlist);
    }
    const isInWatchlist = (slug)=>{
        const watchlist = cookies?.watchlist??[];
        const filtered = watchlist.filter(value=>value===slug);
        return filtered.length===0
    }
    
    return { 
        watchlist: cookies?.watchlist??[], 
        addToWatchlist, removeFromWatchlist, isInWatchlist 
    }
}

export default useWatchlist;