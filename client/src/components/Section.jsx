import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";

const Section = () => {
  return (
    <div className="flex justify-center mt-10 bg-[#f8f7f7] items-center pb-10 pt-10 font-rob">
      <div className="flex flex-row items-center text-md lg:text-2xl mr-10 text-gray-400">
        <FontAwesomeIcon
          className="w-6 h-6 lg:w-12 lg:h-12 text-gray-600 mr-2"
          icon={faLocationDot}
        />
        2654 Main St, Santa Monica, CA 90405, USA
      </div>
      <div className="flex flex-row items-center text-md lg:text-2xl lg:mr-10 text-gray-400">
        <FontAwesomeIcon
          className="w-6 h-6 lg:w-12 lg:h-12 text-gray-600 mr-4"
          icon={faPhone}
        />
        +1 (213) 123-4567
      </div>
    </div>
  );
};

export default Section;
