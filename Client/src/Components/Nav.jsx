import { useLocation } from "react-router";
import { getProducts } from "../api/Api";
import {  useDispatch } from "react-redux";
import { loading as setLoading, getProducts as setProducts } from "../Redux/Products";

export const Nav = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
 
  const onSubmit = async () => {
    dispatch(setLoading());
    setTimeout(async () => {
      const res = await getProducts();
      dispatch(setProducts(res))
      console.log(res);
    }, 1000);
    // const result = await getProducts();
  };
 
  return (
    <div className="flex  bg-neutral-100 shadow-xs  px-16 py-4 items-center justify-between">
      <div>
        <h1 className="text-xl text-shadow-xs">Ecommerce</h1>
      </div>
      <div className="gap-3 flex items-center">
        {pathname == "/Products" ? (
          <button
            onClick={() => {
              onSubmit();
            }}
            className="px-6 py-2 bg-neutral-800 text-neutral-100 rounded-md outline-1 outline-neutral-700 shadow-xs cursor-pointer hover:bg-neutral-100 hover:text-neutral-800 transition-all duration-300 ease-in-out  "
          >
            Get Products
          </button>
        ) : (
          <a href="/Products">
            <button className="px-6 py-2 bg-neutral-800 text-neutral-100 rounded-md outline-1 outline-neutral-700 shadow-xs cursor-pointer hover:bg-neutral-100 hover:text-neutral-800 transition-all duration-300 ease-in-out  ">
              Products
            </button>
          </a>
        )}
        <a href="/" className="border border-neutral-800 rounded-md px-4 py-2">
          Create Product
        </a>
      </div>
    </div>
  );
};
