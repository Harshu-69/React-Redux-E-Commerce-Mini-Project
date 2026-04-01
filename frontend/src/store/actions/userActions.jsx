import axios from "../../api/axiosconfig";
import { logInUser, logOutUser } from "../reducers/userReducer";
//? JSON.stringify() - converts a JavaScript object into a JSON string.
//? JSON.parse() - converts a JSON string back into a JavaScript object.

//~ currentUser - if user exist krta h localStorage me then us user ko utha ke userReducer m daldo using the logInUser()

export const asyncCurrentUser = () => async (dispatch, getState) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log(user);
    if (user) {
      dispatch(logInUser(user));
      console.log("Session Restored!");
    } else {
      console.log("Login to access the resource!");
    }
  } catch (error) {
    console.log(error);
  }
};

//~ Logged In - if entered details (email, passwd) exist in db then fetch whole data of that user and save in LocalStorage.
//*  check krege ky user(bnda) db mein available hai ya nhi, agar hai to us user ka pura data nikalo aur local storage mein save krdo.
//* If local storage mein data save hogya means user logged In hogya hai.

export const asyncLogInUser = (user) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(
      `/users?email=${user.email}&password=${user.password}`,
    );
    if (data[0]) {
      console.log(`User ${data[0].username}  Logged In!`);

      localStorage.setItem("user", JSON.stringify(data[0]));
      dispatch(asyncCurrentUser());
    } else {
      console.log("Wrong Credientials!");
    }
  } catch (err) {
    console.log(err);
  }
};

export const asyncRegisterUser = (user) => async (dispatch, getState) => {
  try {
    const resp = await axios.post("/users", user);
    console.log(resp);
    //! -> /users (backend/db) pr jake user ko save krdo
    //~ post() - send data to Database(Backend)
  } catch (err) {
    console.log(err);
  }
};

export const asyncUpdateUser = (id, user) => async (dispatch, getState) => {
  console.log(user.id, user);

  try {
    const { data } = await axios.patch(`/users/${id}`, user); //! data chng on bcknd
    console.log(data);
    localStorage.setItem("user", JSON.stringify(data)); //! data chng on LocalStorage
    dispatch(asyncCurrentUser());
    //! -> /users (backend/db) pr jake user ko save krdo
    //~ post() - send data to Database(Backend)
  } catch (err) {
    console.log(err);
  }
};

//~ Logged Out - Remove data(user) from the localStorage
export const asyncLogOutUser = (user) => async (dispatch, getState) => {
  try {
    localStorage.removeItem("user");
    dispatch(logOutUser());
    console.log("user " + "Logged Out!");
  } catch (err) {
    console.log(err);
  }
};

export const asyncDeleteUser = (id) => async (dispatch, getState) => {
  try {
    await axios.delete("/users/" + id); //~ delete user means - Remove user from both frontend & db
    dispatch(asyncLogOutUser()); //~ logout user means - Remove user from frontend
  } catch (err) {
    console.log(err);
  }
};
