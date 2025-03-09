const { Op } = require("sequelize");
const Product = require("../../product/models/product.model");
const User = require("../models/user.model");

/**
 * Get Profile - Retrieves a user's profile by ID
 */
const getProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findByPk(userId, { attributes: { exclude: ["confirmationCode", "refreshToken"] } });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while retrieving profile" });
  }
};

/**
 * Update Profile - Updates a user's profile
 */
const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { firstName, lastName, email } = req.body;

    const user = await User.findByPk(userId, { attributes: { exclude: ["confirmationCode", "refreshToken"] } });
    if (!user) return res.status(404).json({ error: "User not found" });

    await user.update({ firstName, lastName, email });
    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while updating profile" });
  }
};
/**
 * Get Prouducts - get all user's products
 */
const myProducts = async (req, res) => {
    try {
      const userId = req.userId;
      const products = await Product.findAll({
        where: {
          [Op.or]: [
            { userId: userId },
          ]
        }
      });
      res.status(200).json({ products: products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error while updating profile" });
    }
  };

module.exports = { getProfile, updateProfile, myProducts };
