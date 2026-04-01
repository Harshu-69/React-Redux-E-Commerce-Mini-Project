import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../../index.css";

const Cart = () => {
  const carts = useSelector((state) => state.userReducer.user?.cart);
  const products = useSelector((state) => state.productReducer.products);
  console.log("cart", carts);
  console.log("products", products);
  console.log(products.length);
  return (
    <div className="flex items-start mt-4  mx-1 h-[calc(100vh-5rem)] max-w-[96vw] overflow-hidden  ">
      <div className="h-full w-full pr-2 overflow-y-auto flex items-center flex-col gap-4 no-scrollbar">
        {carts?.length > 0 ? (
          carts.map((c) => {
            const product = products.find((p) => p.id === c.productId);

            if (!product) return null;

            return (
              <div
                key={c.productId}
                className="w-lg flex-shrink-0 flex items-center rounded-lg p-3 h-28 gap-2 bg-[#fafafa]"
              >
                <div className="w-24 h-20">
                  <img
                    className="w-full h-full rounded-md object-cover"
                    src={product.image}
                    alt={product.title}
                  />
                </div>

                <div className="w-full flex items-start justify-center mt-2 flex-col h-[45%] py-2 px-2 text-black">
                  <h3 className="leading-5 capitalize h-10 flex items-center text-base font-semibold tracking-tight">
                    {product.title.length < 13
                      ? product.title
                      : product.title.slice(0, 60)}
                  </h3>

                  <h3 className="text-xs h-8 tracking-wide leading-[0.8rem]">
                    Description - {product.description.slice(0, 80)}...
                  </h3>

                  <h3 className="text-sm font-semibold h-6 tracking-wide">
                    ${product.price}
                  </h3>

                  <h3 className="text-xs font-medium">
                    Quantity : {c.quantity}
                  </h3>

                  <div className="flex items-center gap-2 justify-between mt-1">
                    <h3 className="text-xs border border-gray-900 capitalize text-black rounded-xs px-2 py-1 font-medium">
                      {product.category}
                    </h3>

                    <Link
                      to={`/product/${product.id}`}
                      className="text-xs font-medium h-6 content-center text-white px-2 py-1 bg-indigo-600 rounded-xs"
                    >
                      More Info
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center  mt-30">
            <p className="text-lg"> No items Available </p>

            <Link
              to="/products"
              className="text-xl mt-2  rounded-xs px-4 py-2 bg-green-500"
            >
              Go to Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
