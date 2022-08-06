import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-[#f8f7f7] flex justify-center items-center lg:block hidden">
      <div className="w-3/4 mx-auto p-2 flex flex-row justify-around font-medium font-rob">
        <Link to="/products/computers">Computer</Link>
        <Link to="/products/keyboards">Keyboard</Link>
        <Link to="/products/mouse">Mouse</Link>
        <Link to="/products/headsets">Headset</Link>
      </div>
    </div>
  );
};

export default Navbar;
