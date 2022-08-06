import { useParams } from "react-router-dom";
import { fetchOrders } from "../../api";
import { useQuery } from "@tanstack/react-query";

const OrdersDetail = () => {
  const { id } = useParams();
  const { isLoading, isError, data, error } = useQuery(
    ["admin:orders"],
    fetchOrders
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error {error.message}</div>;
  }

  const order = data.filter((item) => item._id == id);

  return (
    <div className="flex flex-col gap-y-5 items-center ">
      <div className="font-rob text-2xl font-semibold ">
        {order[0].user.email}'s Order
      </div>
      <div className="font-rob text-xl font-semibold ">
        Address : {order[0].adress}
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-5 justify-center">
        {order[0].items.map((item, i) => (
          <div
            key={i}
            className="flex flex-col items-center border rounded-lg border-gray-500 w-1/4"
          >
            <div className="p-4">
              <img src={item?.photos[0]} alt="" />
            </div>
            <div className="font-semibold text-lg pb-5">{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersDetail;
