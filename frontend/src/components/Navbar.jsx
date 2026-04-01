import { div } from "framer-motion/client";
import { BsUiChecksGrid } from "react-icons/bs";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const user = useSelector((state) => state.userReducer.user);
  return (
    <div className="flex w-full gap-x-10  items-center justify-center h-16 ">
      <NavLink className="text-xl" to="/products">
        Products
      </NavLink>

      {user ? ( // agar user hai
        <>
          {user?.isAdmin ? ( // If user isAdmin then only show Create Product
            <NavLink className="text-xl" to="/admin/create-product">
              Create Product
            </NavLink>
          ) : (
            ""
          )}
          <NavLink className="text-xl" to="/admin/profile-user">
            Settings
          </NavLink>
        </>
      ) : (
        <>
          <NavLink className="text-xl" to="/login">
            Login
          </NavLink>
        </>
      )}
      <NavLink className="text-xl" to="/carts">
        Cart
      </NavLink>
    </div>
  );
};

export default Navbar;
