import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PiShoppingCart } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { asyncDeleteProduct } from "../../store/actions/productActions";
import { asyncUpdateProduct } from "../../store/actions/productActions";

const ProductDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    productReducer: { products },
    userReducer: { user },
  } = useSelector((state) => state);

  const product = products?.find((product) => product.id == id);
  // console.log(product.title);
  // console.log(product, user);

  const [showForm, setShowForm] = useState(false);

  const { register, reset, handleSubmit } = useForm({
    defaultValues: {
      image: product?.image,
      title: product?.title,
      price: product?.catogery,
      catogery: product?.catogery,
    },
  });

  const updateProductHandler = (updateProduct) => {
    dispatch(asyncUpdateProduct(product.id, updateProduct));
  };

  const DeleteHandler = (id) => {
    // console.log('ID',id)
    dispatch(asyncDeleteProduct(id));
    navigate(-1); // Ek step back (piche) aajo
  };

  if (!product) return <p> Loading... </p>;

  return (
    <div className="flex mt-12 min-h-screen  mx-16 max-w-[90vw]  flex-wrap ">
      <div
        key={product.id}
        className="w-[90%] flex rounded-lg overflow-hidden  h-[35rem] bg-[#fafafa] "
      >
        <div className=" left  w-[60%] h-full      ">
          <img
            className="w-full h-full object-cover "
            src={product.image}
            alt={product.title}
          />
        </div>
        <div className=" right w-full h-full flex flex-col gap-10  py-2 px-2  text-black ">
          <h3 className=" leading-5  h-10 flex items-center  text-2xl font-semibold tracking-tight  ">
            {product.title}
          </h3>

          <h3 className="text-xl   h-16 tracking-wide  ">
            <b>Description</b> - {product.description}
          </h3>

          <h3 className="text-4xl font-semibold  h-6 tracking-wide  ">
            ${product.price}
          </h3>

          <div className="flex items-center justify-between  ">
            <h3 className="text-lg border border-gray-900  capitalize text-black rounded-sm px-4 font-medium py-2 ">
              {product.category}
            </h3>
            <div
              onClick={() => handleCartClick(p)}
              className="w-9 h-9 bg-[#111]   flex items-center justify-center rounded-full"
            >
              <PiShoppingCart className="text-white " />
            </div>
          </div>
          <div className="flex gap-20 items-center justify-evenly">
            <Link
              to={`/products`}
              className="text-lg w-36 text-center  font-medium text-white mt-2 px-3 py-2 bg-blue-500 rounded-sm "
            >
              All Products
            </Link>
            <button //
              onClick={() => setShowForm(true)}
              className="text-lg w-40  text-center font-medium text-white mt-2 px-2 py-2 bg-indigo-800 rounded-sm "
            >
              Update Product
            </button>
            <Link
              onClick={() => DeleteHandler(id)}
              className="text-lg w-36  text-center font-medium text-white mt-2 px-1 py-2 bg-red-700 rounded-sm "
            >
              Delete Product
            </Link>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center w-full " >
        {user && user?.isAdmin && (
          <form
            onSubmit={handleSubmit(updateProductHandler)}
            className="flex flex-col gap-3 w-[27vw] my-20 justify-between"
          >
            <div className="flex flex-col gap-2 mb-2 ">
              <h3 className="text-base font-semibold "> Product Name</h3>
              <input
                {...register("title")}
                className="  outline-0 h-12 border rounded-sm border-gray-500 p-2   text-md "
                type="text"
                placeholder="Enter Product name"
              />
            </div>
            <div className="flex flex-col gap-2 mb-2 ">
              <h3 className="text-base font-semibold "> Price</h3>
              <input
                {...register("price")}
                className="  outline-0 h-12 border rounded-sm border-gray-500 p-2   text-md "
                type="text"
                placeholder="Enter Price"
              />
            </div>
            <div className="flex flex-col gap-2 mb-2 ">
              <h3 className="text-base font-semibold "> Description</h3>
              <input
                {...register("description")}
                className="  outline-0 h-20 flex items-start border rounded-sm border-gray-500 p-2   text-md "
                type="text"
                placeholder="Enter Description"
              />
            </div>
            <select
              className=" w-full font-semibold block rounded-sm h-12  bg-zinc-800 text-[1rem] outline-0 p-2"
              {...register("category")}
            >
              <option value="">Select Category</option>
              <option
                className=" text-white text-sm bg-zinc-900 "
                value="Electronics"
              >
                Electronics
              </option>
              <option
                className=" text-white text-sm bg-zinc-900 "
                value="Clothes"
              >
                Clothes
              </option>
              <option
                className=" text-white text-sm bg-zinc-900 "
                value="Accessories"
              >
                Accessories
              </option>
              <option
                className=" text-white text-sm bg-zinc-900 "
                value="Others"
              >
                Others
              </option>
            </select>
            <div className="flex flex-col gap-2 ">
              <h3 className="text-base font-semibold "> Image </h3>
              <input
                {...register("image")}
                className=" bg-zinc-800 rounded-sm text-sm h-12 font-normal w-full block p-2  outline-0"
                type="url"
                placeholder="Image url Here"
              />
            </div>
            <div className="flex w-full items-center  justify-center">
              <button className="block h-12   mt-4 w-full font-semibold py-2 bg-green-700 text-base rounded-sm">
                Update Product
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
