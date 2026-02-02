import React from "react";
import { Edit2, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
export const Products = () => {
  const { listProducts, loading } = useSelector((state) => state.products);
  console.log(listProducts);
  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="  w-full p-6 flex flex-col items-center">
      <div className="grid mb-8 grid-cols-3 gap-3 w-[60%] ">
        {listProducts?.length === 0 ? (
          <h1>Nothing to show</h1>
        ) : (
          listProducts.map((item) => (
            <Cards
              key={item._id}
              id={item._id}
              title={item.title}
              imgSrc={item.image.url}
              price={item.price}
              desc={item.desc}
            />
          ))
        )}
      </div>
    </div>
  );
};

const Cards = ({ title, desc, imgSrc, price, id }) => {
  return (
    <div className="bg-neutral-50  rounded-xl  overflow-auto shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] cursor-pointer hover:scale-99 transition-all line-clamp-2 ">
      <div className="aspect-square">
        <img
          src={imgSrc}
          alt="Wafer-Spicy"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="px-2.5 pt-1.5 pb-0.5 flex items-center justify-between">
        <h1 className="text-xl text-neutral-950 text-shadow-xs">{title}</h1>
        <div className="px-2 py-0.5  rounded-full  bg-neutral-300 shadow-2xl items-center justify-center flex">
          <h3 className="text-sm text-neutral-800  ">{price}</h3>
        </div>
      </div>
      <div className="px-2.5 text-[13.5px]  text-neutral-700 font-sans   ">
        <p>{desc}</p>
      </div>
      <div className="flex justify-end items-center px-2.5 py-2 gap-2 shadow-2xl ">
        <button
          className="px-2 cursor-pointer py-1 bg-neutral-200 rounded-md text-neutral-800 hover:bg-neutral-50 hover:text-neutral-800 transition-all duration-600 ease-in-out "
          id={id}
        >
          <Edit2 />
        </button>
        <button className="px-2 cursor-pointer py-1 hover:bg-neutral-50 hover:text-neutral-800 transition-all duration-600 ease-in-out bg-red-700 rounded-md text-neutral-100">
          <Trash2 />
        </button>
      </div>
    </div>
  );
};
