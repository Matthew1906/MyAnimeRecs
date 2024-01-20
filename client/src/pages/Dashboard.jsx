import { AnimeCarousel } from "../components/carousels";
import { useMostWatched, useRecommendations, useWatchlist } from "../hooks";

const Dashboard = ()=>{
    const { watchlist } = useWatchlist();
    const recommended = useRecommendations()
    const trending = useMostWatched();
    return <>
        {watchlist.length>0 && <AnimeCarousel title="Recommended for you" items={recommended}/>}
        <AnimeCarousel title="Trending now" items={trending}/>
    </>
}

export default Dashboard;