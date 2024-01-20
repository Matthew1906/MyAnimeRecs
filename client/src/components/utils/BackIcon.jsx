import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import { TiArrowBack } from "react-icons/ti";

const BackIcon = ({className, modal})=>{
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    return <TiArrowBack onClick={modal?modal:goBack} className={className??""}/>
};

BackIcon.propTypes = {
    className: PropTypes.string,
    modal: PropTypes.func
}

export default BackIcon;