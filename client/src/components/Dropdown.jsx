import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const Dropdown = () => {
  const [active, setActive] = useState(false);
  const { loggedIn, basket } = useAuth();

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <div
      className={`${
        active ? "mb-40" : "mb-10"
      } p-5 flex flex-col font-mont font-bold`}
    >
      <button onClick={() => handleClick()}>
        {active ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="fill-yell"
            height="48"
            width="48"
          >
            <path d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="fill-yell"
            height="48"
            width="48"
          >
            <path d="M6 36v-3h36v3Zm0-10.5v-3h36v3ZM6 15v-3h36v3Z" />
          </svg>
        )}
      </button>
      <div
        className={`${
          active ? "block absolute" : "hidden"
        } flex flex-col ml-10 mt-10 gap-y-2 bg-bl rounded-lg p-5 font-rob text- text-2xl z-50 bg-slate-50`}
      >
        <NavLink
          to="/"
          onClick={() => setActive(false)}
          className={({ isActive }) =>
            isActive
              ? "flex flex-row items-center bg-blue-100 p-1 rounded-lg gap-x-2"
              : `flex flex-row items-center p-1 gap-x-2`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/products/computers"
          onClick={() => setActive(false)}
          className={({ isActive }) =>
            isActive
              ? "flex flex-row items-center bg-blue-100 p-2 rounded-lg gap-x-2"
              : `flex flex-row items-center p-1 gap-x-2`
          }
        >
          Computers
        </NavLink>
        <NavLink
          to="/products/keyboards"
          onClick={() => setActive(false)}
          className={({ isActive }) =>
            isActive
              ? "flex flex-row items-center bg-blue-100 p-1 rounded-lg gap-x-2"
              : `flex flex-row items-center p-1 gap-x-2`
          }
        >
          Keyboards
        </NavLink>
        <NavLink
          to="/products/mouse"
          onClick={() => setActive(false)}
          className={({ isActive }) =>
            isActive
              ? "flex flex-row items-center bg-blue-100 p-1 rounded-lg gap-x-2"
              : `flex flex-row items-center p-1 gap-x-2`
          }
        >
          Mouse
        </NavLink>
        <NavLink
          to="/products/headsets"
          onClick={() => setActive(false)}
          className={({ isActive }) =>
            isActive
              ? "flex flex-row items-center bg-blue-100 p-1 rounded-lg gap-x-2"
              : `flex flex-row items-center p-1 gap-x-2`
          }
        >
          Headsets
        </NavLink>
        {!loggedIn && (
          <>
            <NavLink
              to="/signin"
              onClick={() => setActive(false)}
              className={({ isActive }) =>
                isActive
                  ? "flex flex-row items-center bg-blue-100 p-1 rounded-lg gap-x-2"
                  : `flex flex-row items-center p-1 gap-x-2`
              }
            >
              Sign in
            </NavLink>
            <NavLink
              to="/signup"
              onClick={() => setActive(false)}
              className={({ isActive }) =>
                isActive
                  ? "flex flex-row items-center bg-blue-100 p-1 rounded-lg gap-x-2"
                  : `flex flex-row items-center p-1 gap-x-2`
              }
            >
              Register
            </NavLink>
          </>
        )}
        {loggedIn && (
          <>
            <NavLink
              to="/basket"
              onClick={() => setActive(false)}
              className={({ isActive }) =>
                isActive
                  ? "flex flex-row items-center bg-blue-100 p-1 rounded-lg gap-x-2"
                  : `flex flex-row items-center p-1 gap-x-2`
              }
            >
              Basket({basket.length})
            </NavLink>
            <NavLink
              to="/profile"
              onClick={() => setActive(false)}
              className={({ isActive }) =>
                isActive
                  ? "flex flex-row items-center bg-blue-100 p-1 rounded-lg gap-x-2"
                  : `flex flex-row items-center p-1 gap-x-2`
              }
            >
              Profile
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
