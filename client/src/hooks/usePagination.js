import { useState } from "react";

const usePagination = ()=>{
    const [ offset, setOffset ] = useState(0);
    const nextPage = ()=>setOffset(offset+20);
    const prevPage = ()=>setOffset(offset>=20?offset-20:0)
    const resetPage = ()=>setOffset(0);
    return { currentPage:offset, nextPage, prevPage, resetPage}
}

export default usePagination;