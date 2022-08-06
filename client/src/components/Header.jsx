import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Dropdown from "./Dropdown";

const Header = () => {
  const { loggedIn, user, basket } = useAuth();
  const [search, setSearch] = useState("");
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${search}`);
    setSearch("");
  };

  return (
    <>
      <div className="block lg:hidden">
        <Dropdown />
      </div>
      <div className="bg-[#f8f7f7] p-1 border-b-2 sticky top-0 z-50 lg:block hidden">
        <div className="w-3/4 mx-auto flex justify-between items-center">
          <Link to="/" className="text-[#81CACF] font-bold text-4xl font-rob">
            BBMark
          </Link>
          <div className="w-1/3 flex justify-center">
            <form onSubmit={handleSubmit} className="w-full flex flex-row mt-2">
              <input
                value={search}
                placeholder="Search..."
                className="p-1 w-full outline-none h-8 rounded-l-sm"
                type="text"
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="submit" className="bg-white px-2 rounded-r-sm">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </form>
          </div>
          <div className="flex flex-row gap-x-5 items-center mt-3">
            {!loggedIn && (
              <>
                <Link
                  className="hover:text-[#5e9a9e] text-[#81CACF] border-[#5e9a9e] hover:border-[#5e9a9e] rounded-sm p-1 font-bold text-2xl font-rob"
                  to="/signin"
                >
                  Sign in
                </Link>
                <Link
                  className="hover:text-[#5e9a9e] text-[#81CACF] border-[#5e9a9e] hover:border-[#5e9a9e] rounded-sm p-1 font-bold text-2xl font-rob"
                  to="/signup"
                >
                  Register
                </Link>
              </>
            )}

            {loggedIn && (
              <>
                <Link
                  to="/basket"
                  className="hover:text-[#5e9a9e] text-[#81CACF] border-[#5e9a9e] hover:border-[#5e9a9e] rounded-sm p-1 font-bold text-2xl font-rob"
                >
                  Basket ({basket.length})
                </Link>
                {user.role == "admin" && (
                  <Link
                    className="hover:text-[#5e9a9e] text-[#81CACF] border-[#5e9a9e] hover:border-[#5e9a9e] rounded-sm p-1 font-bold text-2xl font-rob"
                    to="/admin/orders"
                  >
                    Admin
                  </Link>
                )}

                <Link
                  className="hover:text-[#5e9a9e] text-[#81CACF] border-[#5e9a9e] hover:border-[#5e9a9e] rounded-sm p-1 font-bold text-2xl font-rob"
                  to="/profile"
                >
                  Profile
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <Navbar />
    </>
  );
};

export default Header;
