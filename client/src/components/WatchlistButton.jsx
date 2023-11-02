import { FaMinus, FaPlus } from "react-icons/fa";

const WatchlistButton = ({status=false, anime})=>{
    const theme = status?'blue':'red';
    const updateWatchlist = ()=>console.log(anime);
    return ( 
        <button 
            className = {`mx-auto mt-2 lg:mt-0 py-1 px-2 text-white bg-${theme} rounded-md body-normal-10 flex lg:justify-between items-center gap-1`}
            type = 'button'
            onClick={updateWatchlist}
        >
            {status?<FaPlus/>:<FaMinus/>} List
        </button>
    );
}

export default WatchlistButton;