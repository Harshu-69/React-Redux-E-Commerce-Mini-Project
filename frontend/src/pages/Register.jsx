import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { asyncRegisterUser } from "../store/actions/userActions";
import { nanoid } from "nanoid";
import { useState } from "react";

const Register = () => {
  const [checked, setChecked] = useState(false);

  const navigate = useNavigate();
  const { register, reset, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const registerHandler = (user) => {
    user.id = nanoid();
    console.log(user);
    user.cart = [];
    user.isAdmin = checked;
    dispatch(asyncRegisterUser(user));
    navigate("/login");
  };

  return (
    <form
      className="flex flex-col gap-1 w-1/4 mt-10 justify-between"
      onSubmit={handleSubmit(registerHandler)}
    >
      <div className="flex flex-col gap-1 mb-2 ">
        <h3 className="text-base font-semibold "> Username</h3>
        <input
          {...register("username")}
          className="  outline-0 border rounded-sm border-gray-500 p-2   text-md "
          type="text"
          placeholder="Enter username"
        />
      </div>
      <div className="flex flex-col gap-1 mb-2 ">
        <h3 className="text-base font-semibold "> Email</h3>
        <input
          {...register("email")}
          className="  outline-0 border rounded-sm border-gray-500 p-2   text-md "
          type="email"
          placeholder="johndoe@example.com"
        />
      </div>
      <div className="flex flex-col gap-1 mb-2 ">
        <h3 className="text-base font-semibold "> Password</h3>
        <input
          {...register("password")}
          className="  outline-0 border rounded-sm border-gray-500 p-2   text-md "
          type="password"
          placeholder="*********"
        />
      </div>

      <label className="flex items-center gap-2 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
          className="w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-400 cursor-pointer"
        />
        <span className="text-gray-400 font-medium">isAdmin</span>
      </label>

      <button className="text-md px-6 py-2  text-center bg-green-500 w-1/3 rounded-sm ">
        Register
      </button>
      <p className="text-lg ">
        Don't have an account ?
        <Link className=" text-blue-500 " to="/login">
          Login
        </Link>
      </p>
    </form>
  );
};

export default Register;
