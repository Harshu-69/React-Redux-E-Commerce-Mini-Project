import axios from "../../api/axiosconfig";
import { loadProducts } from "../reducers/productReducer";

export const asyncLoadProducts = (product) => async (dispatch, getState) => {
  //? fetch data  from db and put it on the loadProducts Reducer (state)
  try {
    const { data } = await axios.get("/products");
    console.log(data);
    dispatch(loadProducts(data));
  } catch (err) {
    console.log(err);
  }
};

export const asyncCreateProduct = (product) => async (dispatch, getState) => {
  try {
    await axios.post("/products", product); // storing product on backend/db
    dispatch(asyncLoadProducts(product));
    console.log("Product Stored in db !");
  } catch (err) {
    console.log(err);
  }
};

export const asyncUpdateProduct =
  (id, product) => async (dispatch, getState) => {
    try {
      await axios.patch("/products/" + id, product);
      dispatch(asyncLoadProducts());
      console.log("Product Updated in db !");
    } catch (err) {
      console.log(err);
    }
  };

export const asyncDeleteProduct = (id) => async (dispatch, getState) => {
  console.log("ID", id);
  try {
    await axios.delete("/products/" + id);
    dispatch(asyncLoadProducts());
    console.log("Delete Productd! ");
  } catch (err) {
    console.log(err);
  }
};
