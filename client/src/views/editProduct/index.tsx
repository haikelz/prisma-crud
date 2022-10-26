import { Event } from "@/types";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LazyMotionLayout from "@/components/templates/lazyMotionLayout";
import { leftToRight } from "@/utils/animation";

const nameAtom = atom<string>("");
const priceAtom = atom<string>("");

const EditProduct = () => {
  const [name, setName] = useAtom(nameAtom);
  const [price, setPrice] = useAtom(priceAtom);
  const { id } = useParams();

  const navigate: NavigateFunction = useNavigate();

  const editProduct = async <T extends Event>(event: T) => {
    event.preventDefault();

    await axios.patch(`http://localhost:5000/products/${id}`, {
      name: name,
      price: parseInt(price),
    });
    navigate("/");
  };

  const getProductById = async () => {
    const response = await axios.get(`http://localhost:5000/products/${id}`);
    setName(response.data.name);
    setPrice(response.data.price);
  };

  useEffect(() => {
    getProductById();
  }, [id]);

  return (
    <LazyMotionLayout
      config={leftToRight}
      className="max-w-lg mx-auto my-10 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-slate-300 dark:shadow-none shadow-md"
    >
      <form className="mb-10">
        <div className="flex flex-col">
          <h2 className="text-center text-2xl font-bold">Edit Your Product</h2>
          <div className="my-5">
            <label className="font-bold text-slate-700 dark:text-white">Product Name</label>
            <input
              type="text"
              className="w-full rounded-md py-3 mt-1 border-2 border-slate-20 dark:bg-gray-700 dark:border-slate-700 focus:dark:border-indigo-500 px-3 outline-none focus:outline-none focus:border-indigo-500 hover:shadow transition-all ease-in-out"
              placeholder="Product Name"
              onChange={(event) => setName(event.target.value)}
              value={name}
            />
          </div>
          <div className="mb-5">
            <label className="font-bold text-slate-700 dark:text-white">Price</label>
            <input
              type="text"
              className="w-full rounded-md py-3 mt-1 border-2 border-slate-200 dark:bg-gray-700 dark:border-slate-700 focus:border-indigo-500 focus:dark:border-indigo-500 px-3 outline-none focus:outline-none hover:shadow transition-all ease-in-out"
              placeholder="Price"
              onChange={(event) => setPrice(event.target.value)}
              value={price}
            />
          </div>
          <button
            onClick={editProduct}
            className="w-full py-3 font-bold text-white bg-indigo-500 hover:bg-indigo-600 transition-all ease-in-out hover:shadow rounded-lg"
          >
            Update
          </button>
        </div>
      </form>
    </LazyMotionLayout>
  );
};

export default EditProduct;
