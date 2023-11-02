import PropTypes from "prop-types";
import { FaStar } from "react-icons/fa";

const RatingIcons = ({ rating, className="" }) => {
  return (
    <div className="flex items-center text-yellow gap-x-0.5">
      {Array(Math.round(rating/2))
        .fill("star")
        .map((val, key) => (
          <FaStar key={val+key} className={className}/>
        ))}
    </div>
  );
};

RatingIcons.propTypes = {
  rating: PropTypes.number
}

export default RatingIcons;