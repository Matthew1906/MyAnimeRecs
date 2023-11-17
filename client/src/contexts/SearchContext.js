import { createContext, useState } from "react";
import usePagination from "../hooks/usePagination";

const SearchContext = createContext();
  
const SearchContextProvider= ({ children })=>{
  const [ searchWatchlist, setSearchWatchlist ] = useState("");
  const [ searchAnime, setSearchAnime ] = useState("");
  const watchlistOffset = usePagination()
  const animeOffset = usePagination();
  return (
    <SearchContext.Provider value={{
        searchWatchlist, setSearchWatchlist, watchlistOffset, 
        searchAnime, setSearchAnime, animeOffset
    }}>
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchContextProvider }