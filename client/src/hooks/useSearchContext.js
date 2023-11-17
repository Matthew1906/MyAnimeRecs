import { useContext } from "react";
import { SearchContext } from "../contexts";

const useSearchContext = ()=>{
    const context = useContext(SearchContext);
    return context;
}

export default useSearchContext;
