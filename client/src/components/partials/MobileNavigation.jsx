import { useState } from "react";
import { BiMenu } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";
import SearchForm from "../SearchForm";

const MobileNavigation = () => {
    const [dropdown, setDropdown] = useState(false);
    const display = ()=>setDropdown(!dropdown);
    return (
        <header className='w-full bg-black text-white z-10'>
            <div className="px-8 py-4 flex justify-between items-center gap-12">
                <Link to="/">
                    <h1 className="heading-bold-20">MyAnimeRecs</h1>
                </Link>
                <button onClick={display} className="relative">
                    <BiMenu  className="w-10 h-10"/>
                </button>
            </div>
            <ul className={`bg-black pb-4 px-8 w-full absolute z-50 ${dropdown ? "block" : "hidden"}`}>
                <NavLink to="/"><li className="mb-4">Home</li></NavLink>
                <NavLink to="/all"><li className="mb-4">All Animes</li></NavLink>
                <NavLink to="/watchlist"><li className="mb-4">Watchlist</li></NavLink>
                <SearchForm className='w-full'/>
            </ul>
        </header>
    );
};

export default MobileNavigation;