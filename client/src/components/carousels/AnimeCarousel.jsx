// import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useScreenSize } from "../../hooks";
import AnimeCard from "../AnimeCard";

const AnimeCarousel = ({title, items})=>{
    const screenSize = useScreenSize();
    return (
        <>
            <h4 className="text-pure-white md:text-lg lg:text-2xl font-heading font-bold mb-5">{title}</h4>
            <Swiper 
                loop
                autoplay={{
                    delay:3000,
                    disableOnInteraction:false
                }}
                slidesPerView={screenSize===2?6:screenSize===1?4:3}
                spaceBetween={40}
                modules={[Autoplay]}
                className="anime mb-8"
            >
                {items.map((item, key)=>(
                    <SwiperSlide key={key}><AnimeCard anime={item}/></SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}

export default AnimeCarousel;