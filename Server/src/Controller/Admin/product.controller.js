import { Product } from "../../Models/Product.model.js";

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
