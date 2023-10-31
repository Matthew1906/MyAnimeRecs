// import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import { useScreenSize } from "../../hooks";

const AnimeCarousel = ({items})=>{
    const screenSize = useScreenSize();
    return (
        <Swiper 
            loop 
            navigation 
            pagination={{
                dynamicBullets: true,
            }}
            slidesPerView={screenSize===2?6:screenSize===1?4:3}
            spaceBetween={40}
            modules={[Navigation, Pagination]}
            className="anime"
        >
            {items.map((item, key)=>(
                <SwiperSlide key={key}>
                    <img src={item.image} alt={item.title} className="aspect-[2/3] w-full cursor-pointer"/>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default AnimeCarousel;