import { AnimeCard } from "../components/contents";
import { PageIndicator } from "../components/utils";
import { useRecommendations, useWatchlistAnimes } from "../hooks";

const Watchlist = ()=>{
    const { pagination, animes, count } = useWatchlistAnimes();
    const recommended = useRecommendations()
    return (
        <>
        <div>
            <h4 className="text-pure-white md:text-lg lg:text-2xl font-heading font-bold mb-5">Watchlist</h4>
            <div className={`flex justify-center lg:justify-${animes.length>5?'between':'start'} items-center flex-wrap gap-4 gap-y-10 p-5`}>
                {count>0 
                ? animes?.map((anime, key)=>(<AnimeCard anime={anime} key={key}/>))
                : <p className="text-sm lg:text-xl text-white">No animes in watchlist</p>}
            </div>
            <PageIndicator 
                pages={Math.ceil(count/20)} 
                current={Math.ceil((pagination.currentPage+20)/20)}
                prev={pagination?.prevPage}
                next={pagination?.nextPage}
            />
        </div>
        <h4 className="text-pure-white md:text-lg lg:text-2xl font-heading font-bold mb-5">Recommended</h4>
        <div className="flex justify-center lg:justify-between items-center flex-wrap gap-4 gap-y-10 p-5">
        { count>0
        ? recommended.map((anime, key)=>(<AnimeCard anime={anime} key={key} isRecommendation={key}/>))
        : <p className="text-sm lg:text-xl text-white">No animes</p>
        }
        </div>
        </>
    )
}

export default Watchlist;