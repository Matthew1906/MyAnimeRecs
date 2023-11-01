import { useState } from "react";

const SearchForm = ({className})=>{
    const [ query, setQuery ] = useState("");
    const searchQuery = (e)=>{
        e.preventDefault();
        console.log(query);
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