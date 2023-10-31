import { useEffect, useState } from "react";
import {AnimeCarousel} from "../components/carousels";
import { getAnimes } from "../api";

const Dashboard = ()=>{
    const [ animes, setAnimes ] = useState([]);
    useEffect(()=>{
        getAnimes().then(res=>setAnimes(res.data));
    }, [])
    return <>
        <AnimeCarousel items={animes}/>
        {/* <AnimeCarousel items={animes}/> */}
    </>
}

export default Dashboard;