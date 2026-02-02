import axios from "axios";
const server = import.meta.env.VITE_URL;
export const getProducts = async () => {
  const res = await axios.get(`${server}/api/admin/getProducts`);
  const products = res.data.products;
  return products;
};
