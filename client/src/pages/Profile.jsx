import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "../api";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { isLoading, isError, data } = useQuery(["admin:orders"], fetchOrders);

  console.log(user);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  const a = data.filter((item) => item.user.email == user.email);

  const order = data.filter((item) => item.user.email == user.email);

  const handleLogout = async () => {
    logout(() => {
      navigate("/");
    });
  };

  return (
    <>
      <div className="flex flex-col gap-y-5 items-center">
        <div className="flex  mt-5 justify-between w-full items-center">
          <div className="font-rob text-2xl font-semibold ">My Orders</div>
          <div>
            <button
              className="px-4 py-2 border bg-red-500 hover:bg-red-700 text-white rounded-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
        <div>
          {order.length < 1 && (
            <div className="text-4xl font-rob text-red-500 mt-10">
              You don't have an order.
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-5 justify-center">
          {order.length >= 1 &&
            order[0].items.map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center border rounded-lg border-gray-500 w-1/2 p-2 lg:p-0 lg:w-1/4"
              >
                <div className="p-4">
                  <img src={item?.photos[0]} alt="" />
                </div>
                <div className="font-semibold text-lg pb-5">{item.title}</div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Profile;
