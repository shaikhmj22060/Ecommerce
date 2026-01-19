import React from "react";
import { useState } from "react";
import axios from "axios";
export const Index = () => {
  const [Image, setImage] = useState("");
  const [ProductName, setProductName] = useState("");
  const [Price, setPrice] = useState("");
  const [Desc, setDesc] = useState("");
  const [Res, setRes] = useState({});
  const server = import.meta.env.VITE_URL;

  const getSignature = async () => {
    const res = await axios.get(`${server}/api/admin/cloudinary/signature`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data.signatureData;
  };

  const onUpload = async () => {
    try {
      const { timestamp, signature, folder, cloudName, apiKey } =
        await getSignature();

      if (!timestamp || !signature || !folder || !cloudName || !apiKey) {
        return console.log(
          "Secret is missing or some necessary values is missing ",
        );
      }
      if (!Image) {
        return console.log("please choose an image to upload");
      }
      const fd = new FormData();
      fd.append("file", Image);
      fd.append("api_key", apiKey);
      fd.append("timestamp", timestamp);
      fd.append("folder", folder);
      fd.append("signature", signature);

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        fd,
      );
      setImage("");
      const { secure_url, public_id } = res.data;
      const image = {
        public_id,
        url: secure_url,
      };
      return image;
    } catch (error) {
      console.log(error.message);
    }
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const image = await onUpload();
      const data = {
        name: ProductName,
        price: Price,
        desc: Desc,
        image,
      };
      const res = await axios.post(`${server}/api/admin/createProduct`, data);
      console.log(res.data);
      setRes(res.data.product);
    } catch (error) {
      console.log(error.message);
    }
  };
  const inputItems = [
    {
      type: "text",
      label: "Product Name",
      onChange: (e) => {
        setProductName(e.target.value);
      },
    },
    {
      type: "number",
      label: "Price",
      onChange: (e) => {
        setPrice(e.target.value);
      },
    },
    {
      type: "textarea",
      label: "Description",
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
        <form onSubmit={onSubmit} className="gap-2 flex flex-col w-2/8">
          {inputItems.map((data) => (
            <Input
              key={data.label}
              label={data.label}
              type={data.type}
              onChange={data.onChange}
            />
          ))}

          {Image && <p>Selected:{Image.name}</p>}

          <button
            className="bg-neutral-300 px-4  py-2 rounded-md active:scale-95"
            type="submit"
          >
            submit
          </button>
        </form>
      </div>
      {Res && (
        <div className="w-fit hover:scale-99 cursor-pointer transition-all  m-4 bg-neutral-100 shadow-xl drop-shadow-xs p-3 rounded-4xl">
          <div>
            <img
              src={Res.image.url}
              alt=""
              className="w-48 rounded-3xl shadow"
            />
          </div>
          <div className=" flex items-center justify-between" >
            <h1 className="text-2xl font-semibold">{Res.name}</h1>
            <h1 className="text-md">₹{Res.price}/-</h1>
          </div>
            <h1 className="text-sm">{Res.desc}</h1>
        </div>
      )}
    </>
  );
};

const Input = ({ type, label, onChange }) => {
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
          className="bg-neutral-50 py-2 px-2 rounded-xl shadow-2xs focus:ring-1 focus:ring-neutral-200 outline-none transition-all duration-300"
          onChange={onChange}
        ></textarea>
      ) : (
        <input
          type={type}
          id={label}
          className={`bg-neutral-50 py-2 px-2 rounded-xl shadow-2xs focus:ring-1 focus:ring-neutral-200 outline-none transition-all duration-300 ${
            type == "file" ? "hidden" : "flex"
          }`}
          onChange={onChange}
        />
      )}
    </div>
  );
};
