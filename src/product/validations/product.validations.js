const Joi = require("joi");


// Product validation schema
const productSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    "string.min": "Product name must be at least 3 characters",
    "string.max": "Product name cannot exceed 100 characters",
    "any.required": "Product name is required",
  }),
  price: Joi.number().positive().required().messages({
    "number.positive": "Price must be a positive number",
    "any.required": "Price is required",
  }),
  imageUrl: Joi.string().uri().required().messages({
    "string.uri": "Invalid URL format for imageUrl",
  }),
});

module.exports = { productSchema };
