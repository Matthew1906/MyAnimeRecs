import { useAnimes } from "../hooks";
import { AnimeCard } from "../components/contents";
import { PageIndicator } from "../components/utils";

const Animes = ()=>{
    const {pagination, result} = useAnimes();
    return (
        <div>
            <h4 className="text-pure-white md:text-lg lg:text-2xl font-heading font-bold mb-5">All Animes</h4>
            <div className="flex justify-center lg:justify-between items-center flex-wrap gap-4 gap-y-10 p-5">
                {result?.animes?.map((anime, key)=>(<AnimeCard anime={anime} key={key}/>))}
            </div>
            <PageIndicator 
                pages={Math.ceil(result.count/20)} 
                current={Math.ceil((pagination.currentPage+20)/20)}
                prev={pagination?.prevPage}
                next={pagination?.nextPage}
            />
        </div>
    )
}

export default Animes;