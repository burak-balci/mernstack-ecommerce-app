import React from "react";
import { Link } from "react-router-dom";

const BasketProduct = ({ item }) => {
  return (
    <div className="my-5 flex flex-wrap">
      <div className="w-3/4 h-48 rounded-lg border-2 items-center gap-x-10 border-gray-500 mx-auto flex flex-row">
        <div className="flex flex-col gap-y-4">
          <Link to={`/product/${item._id}`}>{item?.title}</Link>
          <div>{item.description}</div>
          <div>${item.price}</div>
          <div>
            <button>Remove from basket</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasketProduct;
