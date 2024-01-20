import { useEffect, useState } from "react";
import Modal from "react-modal";
import Rating from "react-rating";
import { FaPlus, FaRegStar, FaStar } from "react-icons/fa";
import { useWatchlist } from "../../hooks";

Modal.setAppElement("#modal");

const WatchlistButton = ({id})=>{
    const watchlist = useWatchlist();
    const [ isOpen, setIsOpen ] = useState(false);
    const [ rating, setRating ] = useState(5);
    const [ status, setStatus ] = useState(false);
    const [ isChanged, setIsChanged ] = useState(false);
    useEffect(()=>{
        const newStatus = watchlist.isInWatchlist(id);
        setStatus(newStatus);
    }, [id, isChanged, watchlist]);
    const updateWatchlist = ()=>{
        if(status){
            watchlist.addToWatchlist(id, rating);
            setIsOpen(false);
        }
        else{
            watchlist.removeFromWatchlist(id);
        }
        setIsChanged(!isChanged)
    }
    return (
        <>
            {isOpen ?
            <div className="mt-5 flex justify-center items-center gap-4"> 
                <Rating
                    emptySymbol={<FaRegStar className="text-yellow w-10 h-10" />}
                    fullSymbol={<FaStar className="text-yellow w-10 h-10" />}
                    onChange={(rating)=>setRating(rating)}
                    fractions={1}
                    initialRating={rating}
                    stop={10}
            />
            <button 
                className = {`mx-auto mt-2 lg:mt-0 py-2 px-4 text-white bg-blue rounded-md text-xs md:text-base flex lg:justify-between items-center gap-1`}
                type = 'button'
                onClick={updateWatchlist}
            >
                <FaPlus/> List
            </button>
        </div>
        : <button className="text-xs md:text-base mt-4 border-2 border-pure-white font-semibold px-5 py-2 rounded-lg hover:px-6 hover:py-3" onClick={status?()=>setIsOpen(true):updateWatchlist}>
            {status?"Add to list":"Remove from list"}
        </button>
        }
        </>
    );
}

export default WatchlistButton;