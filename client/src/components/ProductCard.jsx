import { Link } from "react-router-dom";

const ProductCard = ({ item }) => {
  return (
    <>
      <Link to={`/product/${item._id}`}>
        <div className="font-rob mt-5">
          <div className="border-2 border-gray-400 p-4 divide-y-2 rounded-lg">
            <div>
              <img
                className="px-2 w-full"
                alt={item.title}
                src={item.photos[0]}
                data-loaded="true"
              />
            </div>
            <div className="p-4 flex text-center gap-y-4 flex-col divide-y-2">
              <div className="h-10 flex items-center justify-center">
                {item.title}
              </div>
              <div>${item.price}</div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
