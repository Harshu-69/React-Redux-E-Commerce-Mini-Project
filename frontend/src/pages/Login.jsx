import React from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { asyncLogInUser } from "../store/actions/userActions";
import { useDispatch } from "react-redux";

const Login = () => {
  const { register, reset, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const loginHandler = (user) => {
    // console.log(user);
    dispatch(asyncLogInUser(user));
    navigate("/products");
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit(loginHandler)}
        className=" mt-20 flex flex-col gap-6 w-1/4 justify-start "
      >
        <div className="flex flex-col gap-1 mb-2 ">
          <h3 className="text-lg font-semibold "> Email</h3>
          <input
            {...register("email")}
            className="  outline-0 h-12  border rounded-sm border-gray-500 p-2   text-lg "
            type="email"
            placeholder="johndoe@example.com"
          />
        </div>
        <div className="flex flex-col gap-1 mb-2 ">
          <h3 className="text-lg font-semibold "> Password</h3>
          <input
            {...register("password")}
            className="  outline-0 h-12  border rounded-sm border-gray-500 p-2   text-lg "
            type="password"
            placeholder="*********"
          />
        </div>

        <button className=" text-base py-2 cursor-pointer text-center bg-green-500 w-1/4 rounded-sm ">
          Login
        </button>
        <p className="text-lg ">
          Already have an account.?
          <NavLink
            className=" ml-1 text-blue-500  cursor-pointer"
            to="/register"
          >
            Register
          </NavLink>
        </p>
      </form>
    </div>
  );
};

export default Login;
