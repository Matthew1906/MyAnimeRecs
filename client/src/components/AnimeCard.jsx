import { Link } from "react-router-dom";
import RatingIcons from "./RatingIcons";
import WatchlistButton from "./WatchlistButton";
import { formatMembers } from "../utils/string";

const AnimeCard = ({anime})=>{
    const { title, slug, image, score, members } = anime;
    return (
        <Link to={`/animes/${slug}`}>
            <img src={image??'/images/not-exist.jpg'} alt={title} className="aspect-[2/3] w-full cursor-pointer"/>
            <div className="h-36 lg:h-28 flex flex-col items-center justify-center">
                <p className="grow mt-2 body-normal-10 font-bold lg:body-bold-15 text-pure-white text-center flex items-center">{title}</p>
                <div className="mt-1 lg:flex lg:flex-row lg:justify-between lg:items-center lg:gap-x-0.5">
                    <div className="flex justify-between items-center gap-x-0.5">
                        <RatingIcons rating={Math.round(score)} className="w-2 h-2 lg:w-3 lg:h-3"/>
                        <p className="text-pure-white body-normal-10">({formatMembers(members)})</p>
                    </div>
                    <WatchlistButton status={false} anime={slug}/>
                </div>
            </div>
        </Link>
    )
}

export default AnimeCard;
