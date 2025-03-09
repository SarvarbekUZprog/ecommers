const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

// Function to create a product with multiple image files
async function createProduct(productData, imagePaths, token) {
    // Create a FormData object
    const formData = new FormData();

    // Append product data to FormData
    formData.append('name', productData.name);
    formData.append('price', productData.price);
    formData.append('imageUrl', productData.imageUrl);

    // Append multiple image files
    if (imagePaths.length > 0) {
        imagePaths.forEach((path, index) => {
            const fileStream = fs.createReadStream(path);
            formData.append(`files`, fileStream); // API should expect an array of files
        });
    }

    try {
        // Make the API request using axios
        const response = await axios.post('http://localhost:3000/api/product/', formData, {
            headers: {
                ...formData.getHeaders(), // Set headers for FormData
                'Authorization': `${token}`, // Add authentication token
            },
        });

        // Handle the response
        console.log('Product created successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating product:', error);
        if (error.response) {
            console.error('Server responded with:', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error:', error.message);
        }
    }
}

// Example usage
const productData = {
    name: 'Note',
    price: 12,
    imageUrl: 'https://media.example.com',
};

const imagePaths = ['./img1.jpg', ]; // List of images
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc0MDgyNDk3OCwiZXhwIjoxNzQwODI1ODc4fQ.LWCGNPd65q0BIFFHKlIvvPU8OMNHnkPnizKBaDWNKmo' // Replace with your actual authentication token

createProduct(productData, imagePaths, token);
