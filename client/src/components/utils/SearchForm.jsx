import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useSearchContext } from "../../hooks";

const SearchForm = ({className})=>{
    const { pathname } = useLocation();
    const search = useSearchContext();
    const [ query, setQuery ] = useState("");
    useEffect(()=>{
        if(pathname.includes("all")){
            setQuery(search.searchAnime)
        }
        else{
            setQuery(search.searchWatchlist)
        }
    }, [pathname, search]);
    const searchQuery = (e)=>{
        e.preventDefault();
        if(pathname.includes('all')){
            search.animeOffset.resetPage();
            search.setSearchAnime(query);
        }
        else{
            search.watchlistOffset.resetPage();
            search.setSearchWatchlist(query);
        }
    }
    const changeQuery = (e)=>setQuery(e.target.value);
    return (
        <form onSubmit={searchQuery} className={`flex rounded-lg ${className??""}`}>
            <input 
                type="text" 
                name="query"
                value={query} 
                onChange={changeQuery}
                className="grow rounded-l-lg px-4 py-2 bg-pure-white text-black text-sm rounded-none border-pure-white border"
            />
            <button type='submit' className="rounded-r-lg px-4 py-2 bg-black text-white border-pure-white border text-sm">Search</button>
        </form>
    )
}

export default SearchForm;