import { Product } from "@/types";
import { Link } from "react-router-dom";
import { useTheme } from "@/hooks/useTheme";
import { bottomToTop } from "@/utils/animation";
import { convertToRupiah } from "@/helpers/convertToRupiah";
import useSWR, { useSWRConfig } from "swr";
import axios from "axios";
import Layout from "@/components/templates/layout";
import MoonIcon from "@/components/atoms/moonIcon";
import SunIcon from "@/components/atoms/sunIcon";
import LazyMotionLayout from "@/components/templates/lazyMotionLayout";

const App = () => {
  const [theme, setTheme] = useTheme();
  const { mutate } = useSWRConfig();

  const getData = async () => {
    const response = await axios.get("http://localhost:5000/products");
    return response.data;
  };

  const { data, error } = useSWR("products", getData);

  const deleteProduct = async (productId: number) => {
    await axios.delete(`http://localhost:5000/products/${productId}`);
    mutate("products");
  };

  if (!data && !error)
    return (
      <div className="flex justify-center items-center text-center min-h-screen">
        <h2 className="font-semibold text-xl">Loading....</h2>
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center text-center min-h-screen">
        <h2 className="font-semibold text-xl">Error!</h2>
      </div>
    );

  return (
    <Layout>
      <LazyMotionLayout
        config={bottomToTop}
        className="flex max-w-5xl w-full flex-col justify-center items-center text-center py-3"
      >
        <div className="flex gap-2">
          <h1 className="text-3xl font-semibold">List Products</h1>
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
        {data.length ? (
          <div className="relative w-full shadow-md my-3">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-gray-700 uppercase bg-gray-100 dark:bg-gray-800 dark:border-b-[1.5px] dark:border-white dark:text-white">
                <tr>
                  <th className="py-3 px-1 text-center">No</th>
                  <th className="py-3 px-6">Product Name</th>
                  <th className="py-3 px-6">Price</th>
                  <th className="py-3 px-1 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((product: Product, index: number) => (
                  <tr className="bg-white dark:bg-gray-800 dark:text-white" key={product.id}>
                    <td className="py-3 px-1 text-center">{index + 1}</td>
                    <td className="py-3 px-6 font-medium">{product.name}</td>
                    <td className="py-3 px-6">{convertToRupiah(product.price)}</td>
                    <td className="py-3 px-1 flex justify-center items-center">
                      <Link
                        to={`/edit/${product.id}`}
                        className="font-medium bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-white mr-1 transition-all ease-in-out"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="font-medium bg-red-400 hover:bg-red-500 px-3 py-1 rounded text-white transition-all ease-in-out"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-lg my-2 font-semibold">Tidak ada product!</p>
        )}
        <Link
          to="/add"
          className="bg-rose-400 hover:bg-rose-500 text-white font-bold py-2 px-4 rounded-md transition-all ease-in-out"
        >
          Add New
        </Link>
      </LazyMotionLayout>
    </Layout>
  );
};

export default App;
