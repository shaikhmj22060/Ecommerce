import axios from "axios";
const server = import.meta.env.VITE_URL;

export const getProducts = async () => {
  const res = await axios.get(`${server}/api/admin/getProducts`);
  const products = res.data.products;
  return products;
};

export const createProduct = async (data) => {
  const res = await axios.post(`${server}/api/admin/createProduct`, data);
  return res.data.product;
};

export const deletProduct = async (id) => {
  const res = await axios.delete(`${server}/api/admin/delete/${id}`);
  return res.data;
};

export const getSignature = async () => {
  const res = await axios.get(`${server}/api/admin/cloudinary/signature`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data.signatureData;
};

export const onUpload = async (Image) => {
  const { timestamp, signature, folder, cloudName, apiKey } =
    await getSignature();

  if (!timestamp || !signature || !folder || !cloudName || !apiKey) {
    throw new Error("Upload configuration missing");
  }
  if (!Image) {
    console.log("upload error triggerd");
    throw new Error("Please choose an image to upload");
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
  const { secure_url, public_id } = res.data;
  const image = {
    public_id,
    url: secure_url,
  };
  return image;
};
