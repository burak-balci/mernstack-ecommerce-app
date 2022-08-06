import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Basket from "./pages/Basket";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Signin from "./pages/Auth/Signin/Signin";
import Signup from "./pages/Auth/Signup/Signup";
import Computers from "./pages/Computers";
import Keyboard from "./pages/Keyboard";
import Mouse from "./pages/Mouse";
import Headsets from "./pages/Headsets";
import Profile from "./pages/Profile";
import Protected from "./pages/Protected";
import { useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import Error404 from "./pages/Error404";
import Search from "./pages/Search";

function App() {
  const { loggedIn, user } = useAuth();

  return (
    <div className="flex flex-col  min-h-screen">
      <Header />
      <Toaster position="top-right" reverseOrder={false} />
      <div className="w-3/4 mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/admin/*"
            element={<ProtectedRoute user={user} loggedIn={loggedIn} />}
            s
          />
          <Route path="/*" element={<Error404 />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/search/:item" element={<Search />} />
          <Route path="/products/computers" element={<Computers />} />
          <Route path="/products/keyboards" element={<Keyboard />} />
          <Route path="/products/mouse" element={<Mouse />} />
          <Route path="/products/headsets" element={<Headsets />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route
            path="/profile"
            element={
              <Protected loggedIn={loggedIn}>
                <Profile />
              </Protected>
            }
          />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute user={user} loggedIn={loggedIn}></ProtectedRoute>
            }
          ></Route>
        </Routes>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
