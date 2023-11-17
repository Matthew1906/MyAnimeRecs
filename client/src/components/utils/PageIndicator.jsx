import PropTypes from "prop-types";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

const PageIndicator = ({ pages, current, prev, next }) => {
  const prevPage = current <= 1 ? false : current - 1;
  const nextPage = current === pages ? false : current + 1;
  return (
    <>
    { pages>1 &&
    <div className="mt-4 flex gap-2 justify-center items-center text-pure-white text-lg font-bold">
      {prevPage && (
        <>
          <MdNavigateBefore
            className="text-2xl cursor-pointer"
            onClick={prev}
          />
          <span className="py-2 px-4">{prevPage}</span>
        </>
      )}
      <span className="bg-blue py-2 px-4 rounded-full">
        {current}
      </span>
      {nextPage && (
        <>
          <span className="py-2 px-4">{nextPage}</span>
          <MdNavigateNext className="text-2xl cursor-pointer" onClick={next} />
        </>
      )}
    </div>
  }
  </>
  );
};

PageIndicator.propTypes = {
  pages: PropTypes.number, 
  current: PropTypes.number, 
  prev: PropTypes.func, 
  next: PropTypes.func
}

export default PageIndicator;