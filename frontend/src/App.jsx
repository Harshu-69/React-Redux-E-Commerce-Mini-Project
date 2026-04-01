import { useEffect, useState } from "react";
import Mainroutes from "./routes/Mainroutes";
import Navbar from "./components/Navbar";
import { asyncCurrentUser } from "./store/actions/userActions";
import { useDispatch } from "react-redux";
import { asyncLoadProducts } from "./store/actions/productActions";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = async () => {
      dispatch(asyncLoadProducts());
      dispatch(asyncCurrentUser());
      setLoading(false);
    };
    loadData();
  }, [dispatch]);

  if (loading) return <h2> Loading... </h2>;

  return (
    <div className=" max-w-screen min-h-screen text-white flex  flex-col gap-[5%] px-4 bg-[#111] ">
      <Navbar />
      <Mainroutes />
    </div>
  );
}

export default App;
