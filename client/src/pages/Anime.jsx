import { useParams } from "react-router";
import { AnimeCarousel } from "../components/carousels";
import { ReviewCard } from "../components/contents";
import { RatingIcons } from "../components/utils";
import { useSingleAnime } from "../hooks";
import { cleanText, formatMembers } from "../utils/string";

const Anime = ()=>{
    const { slug } = useParams();
    const { isLoading, anime, reviews, similarAnimes } = useSingleAnime(slug);
    if(isLoading){
        return <p className="text-pure-white">Loading...</p>
    }
    else return (
        <>
            <section id="basic-info" className="lg:grid lg:grid-rows-1 lg:grid-cols-3 md:py-2 lg:py-4 md:px-6 lg:px-12 md:gap-5 lg:gap-10 mb-5 sm:mb-10 md:mb-0">
                <img src={anime.image??"/images/not-exist.jpg"} alt={anime.title} className="hidden lg:flex h-full w-full aspect-[2/3]"/>
                <div className="text-left text-pure-white lg:col-span-2 pt-5">
                    <h5 className="text-center lg:text-left font-heading font-bold md:text-xl lg:text-3xl mb-5 lg:mb-0">{anime.title}</h5>
                    <img src={anime.image??"/images/not-exist.jpg"} alt={anime.title} className="mx-auto lg:hidden w-32 h-56 md:w-64 md:h-80"/>
                    <div className="my-2 md:my-4 flex flex-wrap justify-center lg:justify-start gap-2 md:gap-4">
                        {(anime.genres??[]).map((genre, key)=>(
                            <p key={key} className="px-2 py-1 bg-blue font-semibold rounded-lg text-xs md:text-base">{genre}</p>
                        ))}
                    </div>
                    <div className="mb-4 flex justify-center lg:justify-start items-center gap-x-3">
                        <RatingIcons rating={Math.round(anime.score)} className="w-3 h-3 md:w-5 md:h-5"/>
                        <p className="body-normal-10 font-light md:text-lg">({formatMembers(anime.members)})</p>
                    </div>
                    <p className="text-xs md:text-base">{cleanText(anime.synopsis, '[Written by MAL Rewrite]')}</p>
                    <button className="text-xs md:text-base mt-4 border-2 border-pure-white font-semibold px-5 py-2 rounded-lg hover:px-6 hover:py-3">Add to list</button>
                </div>
            </section>
            <section id="statistics-and-reviews" className="mb-8 grid grid-cols-1 grid-rows-2 md:grid-rows-1 md:grid-cols-3 py-2 md:py-4 px-6 md:px-12 gap-5 md:gap-10">
                <div className="mb-5 sm:mb-10 md:mb-0">
                    <p className='font-heading font-bold md:text-xl lg:text-2xl pb-2 border-b-2 border-b-pure-white text-pure-white'>Information</p>
                    <div className="mt-2 text-pure-white grid grid-cols-2 gap-y-2 text-sm md:text-base">
                        <p className="font-semibold font-body">Type : </p>
                        <p>{anime.type}</p>
                        <p className="font-semibold font-body">Episodes : </p>
                        <p>{anime.episodes}</p>
                        <p className="font-semibold font-body">Status : </p>
                        <p>{anime.status}</p>
                        <p className="font-semibold font-body">Aired : </p>
                        <p>{anime.aired}</p>
                        <p className="font-semibold font-body">Studios : </p>
                        <p>{anime.studios??"Unknown"}</p>
                        <p className="font-semibold font-body">Source : </p>
                        <p>{anime.source??"Unknown"}</p>
                        <p className="font-semibold font-body">Demographic : </p>
                        <p>{anime.demographic??"None"}</p>
                        <p className="font-semibold font-body">Themes : </p>
                        <p>{(anime.themes??[]).length>0
                            ? anime.themes.filter(p=>p.trim()!=='').join(", ")
                            : "Unknown"
                        }</p>
                        <p className="font-semibold font-body">Duration : </p>
                        <p>{anime.duration}</p>
                        <p className="font-semibold font-body">Rating : </p>
                        <p>{anime.rating}</p>
                        <p className="font-semibold font-body">Platforms : </p>
                        <p>{(anime.platforms??[]).length>0
                            ? anime.platforms.filter(p=>p.trim()!=='').join(", ")
                            : "Unknown"
                        }</p>
                    </div>
                </div>
                <div className="text-left text-pure-white md:col-span-2 mb-5 sm:mb-10 md:mb-0">
                    <p className='font-heading font-bold md:text-xl lg:text-2xl pb-2 border-b-2 border-b-pure-white text-pure-white'>Reviews</p>
                    <div className="min-h-full max-h-[55vh]  overflow-y-scroll pr-4">
                        {(reviews??[]).map((review, key)=>(
                            <ReviewCard review={review} key={key}/>
                        ))}
                    </div>
                </div>
            </section>
            <section id="staffs-and-vas" className="md:grid md:grid-rows-1 md:grid-cols-3 py-2 md:py-4 px-6 md:px-12 gap-5 md:gap-10">
                <div className='mb-5 sm:mb-10 md:mb-0'>
                    <p className='font-heading font-bold md:text-xl lg:text-2xl pb-2 border-b-2 border-b-pure-white text-pure-white'>Staffs</p>
                    <ul className="mt-2 text-pure-white">
                        {(anime.staffs??[]).map((staff, key)=>(<li className="pb-2" key={key}>
                            <p className="text-sm md:text-base font-heading italic font-semibold">{staff.name}</p>
                            <p className="ml-8 list-disc font-body text-xs md:text-sm">{staff.role}</p>
                        </li>))}
                    </ul>
                </div>
                <div className="mb-5 sm:mb-10 md:mb-0">
                    <p className='font-heading font-bold md:text-xl lg:text-2xl pb-2 border-b-2 border-b-pure-white text-pure-white'>Voice Actors</p>
                    <ul className="mt-2 ml-5 text-pure-white grid lg:grid-cols-2 lg:gap-x-5">
                        {(anime.voice_actors??[]).map((va, key)=>(<li 
                            className="list-disc pb-2 font-semibold italic text-sm md:text-base" 
                            key={key}
                        >
                         {va}
                        </li>))}
                    </ul>
                </div>
            </section>
            <section id="more-like-this" className="py-2 md:py-4 px-6 md:px-12">
                <AnimeCarousel title="More like this" items={similarAnimes}/>
            </section>
        </>
    )
}

export default Anime;