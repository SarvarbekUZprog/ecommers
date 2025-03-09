const path = require('path');
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");
const Product = require("../models/product.model");


// ✅ Create a new product
const createProduct = async (req, res) => {
  try {
    if (!req.files || !req.files.files) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    let files = [].concat(req.files.files); // Ensure it's always an array
    console.log(files, files.length);

    // Check the number of uploaded images
    if (files.length > 3) {
      return res.status(400).json({ error: "Only one image is allowed." });
    }

    const images = [];

    for (const file of files) {
      const uuid = uuidv4();
      let uploadPath = path.join('media/images/', 'products', `${uuid}.${file.mimetype.split('/')[1]}`);
      images.push(uploadPath);
      await file.mv(uploadPath);
    }

    const { name, description, price, stock } = req.body;
    const userId = req.userId; // Assuming user is authenticated

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      images,
      userId,
    });

    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while creating product" });
  }
};

// ✅ Get a single product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) return res.status(404).json({ error: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while fetching product" });
  }
};

// ✅ Update a product
const updateProduct = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { name, description, price, stock, imageUrl } = req.body;

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    if(product.userId !== userId) return res.status(403).json({ error: "You are not the product owner" });

    await product.update({ name, description, price, stock, imageUrl });
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while updating product" });
  }
};

// ✅ Delete a product
const deleteProduct = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    if(product.userId !== userId) return res.status(403).json({ error: "You are not the product owner" });

    await product.destroy();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while deleting product" });
  }
};

// ✅ Get all products with pagination and search
const getAllProducts = async (req, res) => {
  try {
    let { page, limit, search } = req.query;

    // Default pagination values
    page = page ? parseInt(page) : 1;
    limit = limit ? parseInt(limit) : 10;
    const offset = (page - 1) * limit;

    // Search filter
    const searchFilter = search
      ? {
          [Op.or]: [
            { name: { [Op.iLike]: `%${search}%` } }, // Case-insensitive search
            { description: { [Op.iLike]: `%${search}%` } },
          ],
        }
      : {};

    // Fetch products
    const { rows: products, count } = await Product.findAndCountAll({
      where: searchFilter,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      totalProducts: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while fetching products" });
  }
};

module.exports = {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getAllProducts,
};
