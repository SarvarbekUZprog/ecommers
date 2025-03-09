# E-Commerce

![Version](https://img.shields.io/badge/version-1.0.0-green.svg)  
![Tech Stack](https://img.shields.io/badge/tech%20stack-Node.js%20%7C%20Express%20%7C%20MongoDB-orange)

A robust and scalable backend for an e-commerce platform, built to handle product management, user authentication, orders, and payments. This project is designed to be easily integrated with any frontend application.

---

## Features

- **User Authentication**: Secure user registration and login with JWT (JSON Web Tokens).
- **Product Management**: CRUD operations for products, including categories, pricing, and inventory.
- **Search and Filtering**: Advanced search and filtering for products.
- 
---

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: SQLite3 (with sequelize for modeling)
- **Authentication**: JWT (JSON Web Tokens)
---

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/SarvarbekUzProg/ecommers.git
   cd ecommers
   ```
2. **Set up environment variables**:
   Create a .env file in the root directory and add the following variables:
  ```bash
    PORT = 3000
    ACCESS_TOKEN_SECRET=MYSECRETACCESS
    REFRESH_TOKEN_SECRET=MYREFRESHTOKENSECRET
    EMAIL_HOST_USER = youremail@gmail.com
    EMAIL_HOST_PASSWORD = yourEmailAppPassword
  ```
3. **Run the server**:
   ```
    npm start
   ```
  
