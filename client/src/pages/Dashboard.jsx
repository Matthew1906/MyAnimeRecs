import {AnimeCarousel} from "../components/carousels";
import { useAnimes } from "../hooks";

const Dashboard = ()=>{
    const animes = useAnimes();
    return <>
        <AnimeCarousel title="Recommended for you" items={animes}/>
        <AnimeCarousel title="Trending now" items={animes}/>
    </>
}

export default Dashboard;