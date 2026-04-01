import React from "react";
import { Route, Routes } from "react-router-dom";
import Products from "../pages/Products";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CreateProduct from "./../pages/admin/CreateProduct";
import ProductDetails from "../pages/admin/ProductDetails";
import { useSelector } from "react-redux";
import ProfileUser from "../pages/user/ProfileUser";
import AuthWrapper from "../pages/AuthWrapper";
import PageNotFound from "../pages/PageNotFound";
import Home from "../pages/Home";
import Cart from "./../pages/user/Cart";

const Mainroutes = () => {
  const { user } = useSelector((state) => state.userReducer);
  console.log(user);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route
        path="/login"
        element={user ? <PageNotFound /> : <Login />}
      ></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route
        path="/admin/create-product"
        element={
          <AuthWrapper>
            <CreateProduct />
          </AuthWrapper>
        }
      ></Route>
      <Route
        path="/admin/profile-user"
        element={
          <AuthWrapper>
            <ProfileUser />
          </AuthWrapper>
        }
      ></Route>
      <Route path="/product/:id" element={<ProductDetails />}></Route>
      <Route path="/carts" element={<Cart />}></Route>
      <Route path="*" element={<PageNotFound />}>
        {" "}
      </Route>
    </Routes>
  );
};
export default Mainroutes;
