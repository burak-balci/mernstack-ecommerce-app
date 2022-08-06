import { useParams } from "react-router-dom";
import Slider from "../components/Slider";
import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../api";
import { useBasket } from "../contexts/BasketContext";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToBasket } = useBasket();
  const { user, setBasket, basket } = useAuth();

  const { isLoading, isError, data } = useQuery(["product", id], () =>
    fetchProduct(id)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error.</div>;
  }

  const findBasketItem = basket.find((item) => item._id === data._id);
  const images = data.photos.map((url) => ({ original: url }));

  const deleteBasket = async (item) => {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_BASE_ENDPOINT}/auth/${item}/${user._id}`
    );
    return data;
  };

  const handleClick = () => {
    if (basket.filter((item) => item._id == data._id).length < 1) {
      toast.success("The product has been added to your basket");
      setBasket((prev) => [...prev, data]);
      addToBasket(data);
    } else {
      toast.success("The product has been deleted from your basket");
      setBasket(basket.filter((item) => item._id != data._id));
      deleteBasket(data._id);
    }
  };

  return (
    <div className="w-3/4 mx-auto flex flex-col lg:flex-row p-0 mb-20 lg:mb-0 lg:p-10 gap-x-10 items-center font-rob">
      <div className="flex text-center items-center mb-10 lg:mb-0 w-full">
        <Slider images={images} />
      </div>
      <div className="flex h-1/3 w-full flex-col gap-y-5 border-2 py-6 p-2 lg:p-10 text-center items-center justify-center">
        <div className="text-2xl">{data.title}</div>
        <div>{data.description}</div>
        <div className="text-2xl">${data.price}</div>
        <button
          className={
            findBasketItem
              ? "bg-red-500 text-white p-2 rounded-sm"
              : "bg-green-500 text-white p-2 rounded-sm"
          }
          onClick={handleClick}
        >
          {findBasketItem ? "Remove from basket" : "Add to basket"}
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
