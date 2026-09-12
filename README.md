# CodeAlpha E-commerce Store

A simple full-stack e-commerce web application developed as part of the CodeAlpha Full Stack Development Internship.

## Features

- User Registration
- User Login and Logout
- Secure Password Hashing
- Product Listing
- Product Details
- Shopping Cart
- Add Products to Cart
- Remove Products from Cart
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

### Other Tools and Packages

- Git
- GitHub
- npm
- Express Session
- Bcrypt
- Method Override
- Dotenv
- Nodemon

## Project Structure

```text
CodeAlpha_Ecommerce/
│
├── public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   └── images/
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
├── README.md
└── .gitignore
## Database

The application uses MySQL with the following tables:
users
products
orders
order_items

## How to Run

1. Clone the Repository

Clone this repository to your local system.

2. Open the Project

Open the project folder in VS Code.

3. Install Dependencies

npm install

4. Configure Environment Variables

Create a .env file in the project root and add your MySQL database details:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD
DB_NAME=ecommerce

Do not upload the .env file to GitHub.

5. Start MySQL

Make sure your local MySQL server is running.

6. Start the Server

node app.js

For development using Nodemon:

npx nodemon app.js

7. Open the Application

Open the following URL in your browser:

http://localhost:8080

## Main Application Routes

Route	            Description

/	                Home page
/products	        Product listing
/products/:id	    Product details
/cart           	Shopping cart
/register       	User registration
/login          	User login
/logout         	User logout
/checkout       	Checkout page
/place-order    	Place an order
/order-success/:id	Order confirmation
/my-orders      	User's orders

## Project Workflow

User Registration
        ↓
      Login
        ↓
   View Products
        ↓
 View Product Details
        ↓
   Add to Cart
        ↓
     Checkout
        ↓
   Place Order
        ↓
  Order Confirmation
        ↓
    My Orders

## Security

User passwords are hashed using Bcrypt before being stored in the database.
Database credentials are stored in environment variables.
.env is excluded from GitHub using .gitignore.
User sessions are handled using Express Session.

## Internship Project

This project was developed as part of the CodeAlpha Full Stack Development Internship.

## Task

Task 1 – Simple E-commerce Store

The project includes product management, shopping cart functionality, user registration and login, checkout, order processing, and database integration.

## Author

Vaibhavi Gupta
```
