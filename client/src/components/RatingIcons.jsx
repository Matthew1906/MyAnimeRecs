import PropTypes from "prop-types";
import { FaStar } from "react-icons/fa";

const RatingIcons = ({ rating }) => {
  return (
    <div className="flex items-center text-yellow gap-x-0.5">
      {Array(Math.round(rating/2))
        .fill("star")
        .map((val, key) => (
          <FaStar key={val+key} className="w-2 h-2 lg:w-3 lg:h-3"/>
        ))}
    </div>
  );
};

RatingIcons.propTypes = {
  rating: PropTypes.number
}

export default RatingIcons;