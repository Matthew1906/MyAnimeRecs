import { useState, useEffect } from "react"

const useScreenSize = ()=>{
    const [screenSize, setScreenSize] = useState(false); 
    const handleResize = ()=>{
        if(window.innerWidth<=768){
            setScreenSize(0); // mobile and tablet screen
        }
        else if(window.innerWidth<=1024){
            setScreenSize(1); // desktop screen
        }
        else setScreenSize(2); // large desktop screen
    }
    useEffect(()=>{
        handleResize();
        window.addEventListener('resize', handleResize)
        return()=>{
            window.removeEventListener('resize', handleResize)
        }
    }, []);
    return screenSize;
}

export default useScreenSize;