# CodeAlpha E-commerce Store

A simple full-stack e-commerce web application developed as part of the CodeAlpha Full Stack Development Internship.

## Features

- User Registration
- User Login and Logout
- Secure Password Hashing
- Product Listing
- Product Details
- Shopping Cart
- Add and Remove Products from Cart
- Cart Quantity Management
- Checkout
- Order Placement
- Order Success Page
- My Orders
- MySQL Database Integration
- Session-based Authentication and Cart

## Technologies Used

### Frontend

- HTML5
- CSS3
- Bootstrap
- JavaScript
- EJS

### Backend

- Node.js
- Express.js

### Database

- MySQL

### Other Tools

- Git
- GitHub
- npm
- Express Session
- Bcrypt
- Method Override

## Project Structure

```text
CodeAlpha_Ecommerce/
│
├── public/
│   └── css/
│       └── style.css
│
├── views/
│   ├── home.ejs
│   ├── products.ejs
│   ├── product-details.ejs
│   ├── cart.ejs
│   ├── register.ejs
│   ├── login.ejs
│   ├── checkout.ejs
│   ├── order-success.ejs
│   └── my-orders.ejs
│
├── app.js
├── db.js
├── package.json
├── package-lock.json
└── .gitignore

Database

The application uses MySQL with the following tables:

users
products
orders
order_items
How to Run
Clone the repository.
Open the project folder in VS Code.
Install dependencies:
npm install
Create a .env file and add your MySQL database details.
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD
DB_NAME=ecommerce
Make sure MySQL is running.
Start the server:
node app.js

For development with nodemon:

npx nodemon app.js
Open:
http://localhost:8080
Internship Project

This project was developed as part of the CodeAlpha Full Stack Development Internship.

Author

Vaibhavi Gupta
```
