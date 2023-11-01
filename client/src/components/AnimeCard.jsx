import { FaPlus } from "react-icons/fa"
import RatingIcons from "./RatingIcons";

const formatMembers = (num)=>{
    if(num>=1000000){
        return String(Math.round(num/1000000)) + "M";
    }
    else if(num>=1000){
        return String(Math.round(num/1000)) + "K";
    }
    else{
        return String(num);
    }
}

const AnimeCard = ({anime})=>{
    const { title, image, score, members } = anime;
    return (
        <>
            <img src={image} alt={title} className="aspect-[2/3] w-full cursor-pointer"/>
            <div className="h-32 lg:h-28 flex flex-col items-center justify-center">
                <p className="grow mt-2 body-normal-10 font-bold lg:body-bold-15 text-pure-white text-center flex items-center">{title}</p>
                <div className="mt-1 lg:flex lg:flex-row lg:justify-between lg:items-center lg:gap-x-0.5">
                    <div className="flex justify-between items-center gap-x-0.5">
                        <RatingIcons rating={Math.round(score)}/>
                        <p className="text-pure-white body-normal-10">({formatMembers(members)})</p>
                    </div>
                    <button className="mt-2 lg:mt-0 py-1 px-2 text-white bg-blue rounded-md body-normal-10 flex lg:justify-between items-center gap-1"><FaPlus /> List</button>
                </div>
            </div>
        </>
    )
}

export default AnimeCard;
