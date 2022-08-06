import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const Slider = ({ images }) => {
  return (
    <div className="flex justify-center items-center">
      <ImageGallery className="h-10" showPlayButton={false} items={images} />
    </div>
  );
};

export default Slider;
