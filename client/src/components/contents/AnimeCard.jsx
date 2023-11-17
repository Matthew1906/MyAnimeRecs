import { Link } from "react-router-dom";
import RatingIcons from "../utils/RatingIcons";
import WatchlistButton from "./WatchlistButton";
import { formatMembers } from "../../utils/string";

const AnimeCard = ({anime, carousel=false})=>{
    const { title, slug, image, score, members } = anime;
    return (
        <div className="flex flex-col justify-center items-center">
            <Link to={`/animes/${slug}`}>
                <img src={image??'/images/not-exist.jpg'} alt={title} className="aspect-[2/3] w-full md:w-40 lg:h-80 lg:w-60 cursor-pointer"/>
            </Link>
            <div className="h-36 flex flex-col items-center justify-center">
                <Link to={`/animes/${slug}`} className="grow flex items-center justify-center">
                    <p className={`mt-2 font-body font-bold ${carousel?'text-xs lg:text-base':`text-sm lg:w-60 lg:text-lg break-words`} text-pure-white text-center`}>{title}</p>
                </Link>
                <div className="mt-1 lg:flex lg:flex-row lg:justify-between lg:items-center lg:gap-x-0.5">
                    <div className="flex justify-between items-center gap-x-0.5">
                        <RatingIcons rating={Math.round(score)} className={carousel?'w-2 h-2 lg:w-3 lg:h-3':'w-3 h-3 lg:w-4 lg:h-4'}/>
                        <p className={`text-pure-white font-body text-xs lg:text-base`}>({formatMembers(members)})</p>
                    </div>
                    <WatchlistButton status={false} anime={slug}/>
                </div>
            </div>
        </div>
    )
}

export default AnimeCard;
