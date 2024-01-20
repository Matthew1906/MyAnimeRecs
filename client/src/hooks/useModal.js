import { useState } from "react";
import useScreenSize from "./useScreenSize";

const useModal = () => {
    const screenSize = useScreenSize();
    const [isOpen, setIsOpen] = useState(false);
    const openModal = ()=>setIsOpen(true);
    const closeModal = ()=>setIsOpen(false);
    const [status, setStatus] = useState(true);
    const toggleStatus = ()=>setStatus(!status);
    const style = {
        content:{
            width:screenSize>0?"640px":"480px",
            height:"480px",
            margin:"auto"
        }
    };
    return { 
        isOpen, style,    
        modal:{
            open:openModal, 
            close:closeModal
        }, 
        status:{
            value:status, 
            toggle:toggleStatus
        }
    };
};

export default useModal;