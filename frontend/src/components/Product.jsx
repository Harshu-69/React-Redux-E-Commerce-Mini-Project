import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { asyncUpdateUser } from "../store/actions/userActions";

const Product = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userReducer.user);
  const products = useSelector((state) => state.productReducer.products);

 const handleCartClick = (id) => {

  const copyuser = { ...user, cart: [...(user.cart || [])] };

  const index = copyuser.cart.findIndex((c) => c.productId === id);

  if (index === -1) {
    copyuser.cart.push({
      productId: id,
      quantity: 1,
    });
  } else {
    copyuser.cart[index] = {
      ...copyuser.cart[index],
      quantity: copyuser.cart[index].quantity + 1,
    };
    toast.success("Added to Cart")
  }

  dispatch(asyncUpdateUser(copyuser.id, copyuser));
};

  return (
    <div className="flex mt-20 mx-16 max-w-[96vw]  gap-4  flex-wrap ">
      {products.map((p) => (
        <div
          key={p.id}
          className="w-60 rounded-lg overflow-hidden  h-120 bg-[#fafafa] "
        >
          <div className=" w-full h-[55%] ">
            <img
              className="w-full h-full object-cover "
              src={p.image}
              alt={p.title}
            />
          </div>
          <div className=" w-full h-[45%]  py-2 px-2  text-black ">
            <h3 className=" leading-5 capitalize h-10 flex items-center  text-base font-semibold tracking-tight  ">
              {p.title.length < 13 ? p.title : p.title.slice(0, 30)}
            </h3>

            <h3 className="text-xs h-16 tracking-wide  ">
              <b>Description</b> - {p.description.slice(0, 60)}...
            </h3>

            <h3 className="text-lg font-semibold  h-6 tracking-wide  ">
              ${p.price}
            </h3>

            <div className="flex items-center justify-between mt-1">
              <h3 className="text-xs border border-gray-900  capitalize text-black rounded-xs px-4 font-medium py-[0.35rem] ">
                {p.category}
              </h3>
              <div>
                <button
                  onClick={() => handleCartClick(p.id)}
                  className="text-xs cursor-pointer font-medium text-white  px-4 py-2 bg-blue-700 rounded-xs "
                >
                  Add to cart
                </button>
                <ToastContainer />
              </div>
            </div>
            <div className="w-full h-12 flex items-center  ">
              <Link
                to={`/product/${p.id}`}
                className="text-xs  font-medium h-8 content-center text-white px-2 py-1 bg-indigo-600 rounded-xs "
              >
                More Info
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
