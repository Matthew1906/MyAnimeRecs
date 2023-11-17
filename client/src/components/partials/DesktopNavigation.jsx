import { Link, NavLink } from "react-router-dom";
import SearchForm from "../utils/SearchForm";

const DesktopNavigation = ({search=false})=>{
    return (
        <header className='px-8 w-full flex justify-center py-4 bg-black text-white z-10'>
            <div className="max-w-[1440px] w-full flex justify-between items-center">
                <div className="flex justify-between items-center gap-12">
                    <Link to='/'><h1 className="heading-bold-20">MyAnimeRecs</h1></Link>  
                    <ul className="flex gap-5 text font-nunito text-light">
                        <NavLink to="/all">
                            <li className="link-expand">All Animes</li>
                        </NavLink>
                        <NavLink to="/watchlist">
                            <li className="link-expand">Watchlist</li>
                        </NavLink>
                    </ul>
                </div>
                {search && <SearchForm className="w-5/12"/>}
            </div>
        </header>
    );
};

export default DesktopNavigation;