import { Product } from "../../Models/Product.model.js";
import { v2 as cloudinary } from "cloudinary";

export const createProduct = async (req, res) => {
  try {
    const { name, image, price, desc } = req.body;

    if (!name || !price) {
      return res.status(400).json({ msg: "Please fill all the details" });
    }
    if (!image || !image.public_id || !image.url) {
      return res.status(400).json({ msg: "Something went wrong" });
    }
    const product = await Product.create({
      name,
      price,
      desc,
      image: {
        public_id: image.public_id,
        url: image.url,
      },
    });
    res.status(200).json({ msg: "Created ", product });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
};
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res
      .status(200)
      .json({ msg: `Found Product ${products.length}`, products });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
export const deletProduct = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const product = await Product.findById(id).select("image.public_id");
    await cloudinary.uploader.destroy(product.image.public_id);
    await Product.findByIdAndDelete(id);

    return res.status(200).json({ msg: "Data deleted" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
};
