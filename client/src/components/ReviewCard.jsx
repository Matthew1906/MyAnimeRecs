// import random from "random-name";
import { useState } from "react";
import RatingIcons from "./RatingIcons";

const SentimentIcon = ({sentiment})=>{
    const theme = {
        'Recommended':"bg-green text-pure-white",
        'Mixed Feelings':"bg-yellow text-black",
        'Not Recommended':"bg-red text-pure-white"
    }
    return <p className={`text-xs md:text-sm font-body px-2 py-1 rounded-xl font-semibold ${theme[sentiment]}`}>{sentiment}</p>
}

const ReviewCard = ({review})=>{
    const { status, rating, body } = review;
    // const name = random.first() + " " + random.last();
    const [ readMore, setReadMore ] = useState(false);
    const toggleReadMore = ()=>setReadMore(!readMore);
    return (
        <div className="py-3">
            {/* <p>{name}</p> */}
            <div className="my-2 flex gap-2 items-center">
                <RatingIcons rating={rating}/>
                <SentimentIcon sentiment={status}/>
            </div>
            <p className="text-xs md:text-sm">
                {body.slice(0, readMore?body.length:500)}... 
                <span className="ml-3 text-blue hover:underline cursor-pointer" onClick={toggleReadMore}>
                    {readMore?"Less":"Read more"}
                </span>
            </p>
        </div>
    )
}

export default ReviewCard;