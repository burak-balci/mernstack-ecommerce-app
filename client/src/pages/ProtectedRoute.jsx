import { Link, Navigate, Routes, Route } from "react-router-dom";
import Orders from "./Admin/Orders";
import OrdersDetail from "./Admin/OrdersDetail";
import ProductDetail from "./Admin/ProductDetail";
import NewProduct from "./Admin/Products/NewProduct";
import Products from "./Admin/Products/Products";
import Error404 from "./Error404";

const ProtectedRoute = ({ user }) => {
  if (user.role == "user") {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <nav>
        <ul className="flex flex-row gap-x-10 text-[#81CACF] hover:text-[#5e9a9e] font-medium text-2xl items-center justify-center py-5 font-rob">
          <li>
            <Link to="orders">Orders</Link>
          </li>
          <li>
            <Link to="products">Products</Link>
          </li>
          <li>
            <Link to="product/new">New product</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/*" element={<Error404 />} />
        <Route path="orders" element={<Orders />} />
        <Route path="orders/:id" element={<OrdersDetail />} />
        <Route path="products" element={<Products />} />
        <Route path="product/new" element={<NewProduct />} />
        <Route path="products/:product_id" element={<ProductDetail />} />
      </Routes>
    </div>
  );
};

export default ProtectedRoute;
