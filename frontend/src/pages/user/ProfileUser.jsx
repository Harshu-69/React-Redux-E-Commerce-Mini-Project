import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  asyncDeleteUser,
  asyncLogOutUser,
  asyncUpdateUser,
} from "../../store/actions/userActions";
import { useForm } from "react-hook-form";

function ProfileUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userReducer.user);
  //   console.log(user);

  const { register, reset, handleSubmit } = useForm({
    defaultValues: {
      username: user?.username,
      email: user?.email,
      password: user?.password,
    },
  });

  const UpdateUserHandler = (usr) => {
    if(!user?.id){
      console.log("User ID Missing")
      return ;
    }
    dispatch(asyncUpdateUser(user.id, usr));
  };
  const LogoutUserHandler = () => {
    dispatch(asyncLogOutUser());
    navigate("/login");
  };

  const DeleteHandler = () => {
    dispatch(asyncDeleteUser(user.id));
    navigate("/login");
  };

  return (
    <div className="w-[97vw] h-[93vh]  flex flex-col items-center justify-center  " >
      <div className="flex flex-col items-start  gap-3 w-1/4 " >
      <h1 className="text-3xl  text-blue-400 font-medium " > {user.username}  </h1>
      <h1 className="text-lg text-indigo-400 font-medium " > {user.email}   </h1>

      </div>
      <form
        onSubmit={handleSubmit(UpdateUserHandler)}
        className="flex  flex-col gap-4 w-1/4 mt-10 justify-between"
      >
        <div className="flex flex-col gap-1 mb-2 ">
          <h3 className="text-base font-semibold "> Email</h3>
          <input
            {...register("email")}
            className="  outline-0 border rounded-sm border-gray-500 p-2   text-md "
            type="email"
            placeholder="johndoe@gmail.com"
          />
        </div>
        <div className="flex flex-col gap-1 mb-2 ">
          <h3 className="text-base font-semibold "> Password </h3>
          <input
            {...register("password")}
            className="  outline-0 border rounded-sm border-gray-500 p-2   text-md "
            type="password"
            placeholder="******"
          />
        </div>

        <div>
          <h3 className="text-base font-semibold "> Username </h3>
          <input
            {...register("username")}
            className=" bg-zinc-800 rounded-sm text-sm font-normal w-full block p-2  outline-0"
            type="text"
            placeholder="username url Here"
          />
        </div>
        <div className="flex w-full items-center  justify-center">
          <button className="block cursor-pointer mt-4 w-full font-semibold py-2 bg-green-700 text-sm rounded-sm">
            Update User
          </button>
        </div>

        <button
          className="block cursor-pointer mt-4 w-full font-semibold py-2 bg-red-400 text-sm rounded-sm"
          onClick={LogoutUserHandler}
          type="button"
        >
          Loguot User
        </button>
        <button
          className="block cursor-pointer mt-4 w-full font-semibold py-2 bg-red-700 text-sm rounded-sm"
          onClick={DeleteHandler}
          type="button"
        >
          Delete User
        </button>
      </form>
    </div>
  );
}

export default ProfileUser;
