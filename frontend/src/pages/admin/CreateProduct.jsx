import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import { asyncLoadProducts } from "../../store/actions/productActions";
import { useDispatch } from "react-redux";
import { asyncCreateProduct } from "../../store/actions/productActions";
import { div } from "framer-motion/client";

const CreateProduct = () => {
  const { register, reset, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const createProductHandler = (product) => {
    //! product - contains Data of recent Product created
    console.log(product);
    product.id = nanoid(); //? Generates unique id
    navigate("/products");
    console.log("product Created!");
    dispatch(asyncCreateProduct(product));

    // dispatch(asyncLoadProducts(product));
  };

  return (
    <div className="w-[97vw] h-[93vh] flex  items-center justify-center  ">
      <form
        onSubmit={handleSubmit(createProductHandler)}
        className="flex flex-col gap-3 w-[27vw] mt-10 justify-between"
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
          <option className=" text-white text-sm bg-zinc-900 " value="Clothes">
            Clothes
          </option>
          <option
            className=" text-white text-sm bg-zinc-900 "
            value="Food"
          >
            Food
          </option>
          <option
            className=" text-white text-sm bg-zinc-900 "
            value="Accessories"
          >
            Accessories
          </option>
          <option className=" text-white text-sm bg-zinc-900 " value="Others">
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
            Create Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
