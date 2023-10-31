import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const BackgroundCarousel = ()=>{
    return ( 
    <Swiper 
      allowTouchMove={false}
      autoplay ={{
        delay:3000,
        disableOnInteraction:false,
        pauseOnMouseEnter:false,
      }}
      effect='fade'
      fadeEffect={{
        crossFade:true
      }}
      modules={[Autoplay, EffectFade]}
      className="row-start-1 col-start-1 grow w-full min-h-screen h-full"
    >
      {Array.from({length:12}, (val, idx)=>idx+1).map(idx=>
        <SwiperSlide key={idx}>
            <div className="grid grid-rows-1 grid-cols-1 w-full h-full">
              <img src={`/images/bg${idx}.png`} alt="idx" className="row-start-1 col-start-1 w-full h-full"/>
              <div className="row-start-1 col-start-1 bg-black bg-opacity-60"/>
            </div>
        </SwiperSlide>
      )}
    </Swiper>
    )
}

export default BackgroundCarousel;