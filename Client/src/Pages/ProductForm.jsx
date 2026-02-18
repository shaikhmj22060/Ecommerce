import { useState } from "react";
import { useNavigate } from "react-router";
import { createProduct, onUpload } from "../api/Api";
import { useDispatch } from "react-redux";
import {
  loading,
  createProduct as setPoduct,
  error as setError,
} from "../Redux/Products";
export const ProductForm = () => {
  const [Image, setImage] = useState(null);
  const [ProductName, setProductName] = useState("");
  const [Price, setPrice] = useState("");
  const [Desc, setDesc] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const clearForm = () => {
    setImage(null);
    setPrice("");
    setProductName("");
    setDesc("");
  };
  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      dispatch(loading());
      if (!ProductName || !Price) {
        dispatch(setError("Please fill all the details"));
        return;
      }

      const image = await onUpload(Image);
      const data = {
        name: ProductName,
        price: Price,
        desc: Desc,
        image,
      };
      const res = await createProduct(data);

      dispatch(setPoduct(res));
      clearForm();
      navigate("/Products");
    } catch (error) {
      dispatch(setError(error.response?.data?.msg || error.message));
    }
  };
  const inputItems = [
    {
      type: "text",
      label: "Product Name",
      value: ProductName,
      onChange: (e) => {
        setProductName(e.target.value);
      },
    },
    {
      type: "number",
      label: "Price",
      value: Price,
      onChange: (e) => {
        setPrice(e.target.value);
      },
    },
    {
      type: "textarea",
      label: "Description",
      value: Desc,
      onChange: (e) => {
        setDesc(e.target.value);
      },
    },
    {
      type: "file",
      label: "Choose an Image ",
      onChange: (e) => {
        const selected = e.target.files[0];
        setImage(selected);
      },
    },
  ];
  return (
    <>
      <div className="text-xl text-neutral-800 flex flex-col items-center justify-center h-screen space-y-2 ">
        <h1>Upload test </h1>
        <form className="gap-2 flex flex-col w-2/8" onSubmit={onSubmit}>
          {inputItems.map((data) => (
            <Input
              key={data.label}
              label={data.label}
              type={data.type}
              value={data?.value}
              onChange={data.onChange}
            />
          ))}

          {Image && <p>Selected:{Image.name}</p>}

          <button
            className="bg-neutral-300 px-4  cursor-pointer py-2 rounded-md active:scale-95"
            type="submit"
          >
            Create
          </button>
        </form>
      </div>
    </>
  );
};

const Input = ({ type, label, onChange, value }) => {
  return (
    <div className={` flex flex-col space-y-2 w-full `}>
      <label
        htmlFor={label}
        className={`${
          type == "file"
            ? "bg-neutral-300 px-4 py-2 w-fit rounded-md active:scale-95"
            : ""
        }`}
      >
        {label}
      </label>
      {type == "textarea" ? (
        <textarea
          id={label}
          value={value}
          className="bg-neutral-50 py-2 px-2 rounded-xl shadow-2xs focus:ring-1 focus:ring-neutral-200 outline-none transition-all duration-300"
          onChange={onChange}
        ></textarea>
      ) : (
        <input
          type={type}
          id={label}
          value={value}
          className={`bg-neutral-50 py-2 px-2 rounded-xl shadow-2xs focus:ring-1 focus:ring-neutral-200 outline-none transition-all duration-300 ${
            type == "file" ? "hidden" : "flex"
          }`}
          onChange={onChange}
        />
      )}
    </div>
  );
};
