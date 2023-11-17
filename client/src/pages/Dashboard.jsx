import { AnimeCarousel } from "../components/carousels";
import { useRecommendations } from "../hooks";

const Dashboard = ()=>{
    const animes = useRecommendations();
    return <>
        <AnimeCarousel title="Recommended for you" items={animes}/>
        <AnimeCarousel title="Trending now" items={animes}/>
    </>
}

export default Dashboard;