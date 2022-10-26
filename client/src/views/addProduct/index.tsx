import { atom, useAtom } from "jotai";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Event } from "src/types";
import { leftToRight } from "@/utils/animation";
import axios from "axios";
import LazyMotionLayout from "@/components/templates/lazyMotionLayout";

const nameAtom = atom<string>("");
const priceAtom = atom<string>("");

const AddProduct = () => {
  const [name, setName] = useAtom(nameAtom);
  const [price, setPrice] = useAtom(priceAtom);

  const navigate: NavigateFunction = useNavigate();

  const saveProduct = async <T extends Event>(event: T) => {
    event.preventDefault();

    await axios.post("http://localhost:5000/products", {
      name: name,
      price: parseInt(price),
    });
    navigate("/");
  };

  return (
    <LazyMotionLayout
      config={leftToRight}
      className="max-w-lg mx-auto my-10 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-slate-300 dark:shadow-none shadow-md"
    >
      <form className="mb-10">
        <div className="flex flex-col">
          <h2 className="text-center text-2xl font-bold">Add Your Product</h2>
          <div className="my-5">
            <label className="font-bold text-white">Product Name</label>
            <input
              type="text"
              className="w-full rounded-md py-3 mt-1 border-2 dark:bg-gray-700 border-slate-200 dark:border-slate-700 px-3 outline-none focus:outline-none focus:border-indigo-500 focus:dark:border-indigo-500 hover:shadow transition-all ease-in-out"
              placeholder="Product Name"
              onChange={(event) => setName(event.target.value)}
              value={name}
            />
          </div>
          <div className="mb-5">
            <label className="font-bold text-white">Price</label>
            <input
              type="text"
              className="w-full rounded-md py-3 mt-1 border-2 border-slate-200 px-3 outline-none focus:outline-none dark:bg-gray-700 dark:border-slate-700 focus:border-indigo-500 focus:dark:border-indigo-500 hover:shadow transition-all ease-in-out"
              placeholder="Price"
              onChange={(event) => setPrice(event.target.value)}
              value={price}
            />
          </div>
          <button
            onClick={saveProduct}
            className="w-full py-3 font-bold text-white bg-indigo-500 hover:bg-indigo-600 transition-all ease-in-out hover:shadow rounded-lg"
          >
            Save
          </button>
        </div>
      </form>
    </LazyMotionLayout>
  );
};

export default AddProduct;
