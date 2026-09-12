const express = require("express");
const connection = require("./db");
const session = require("express-session");
const bcrypt = require("bcrypt");

const app = express();
const port = 8080;

// EJS setup
app.set("view engine", "ejs");

// Static files setup
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "codealpha-secret",
    resave: false,
    saveUninitialized: true,
  }),
);
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Home route
app.get("/", (req, res) => {
  res.render("home");
});

// Products route
app.get("/products", (req, res) => {
  const sql = "SELECT * FROM products";

  connection.query(sql, (err, products) => {
    if (err) {
      console.log("Error fetching products:", err);
      return res.send("Something went wrong.");
    }

    res.render("products", { products });
  });
});

app.get("/products/:id", (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM products WHERE id = ?";

  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.log("Error fetching product:", err);
      return res.send("Something went wrong.");
    }

    if (result.length === 0) {
      return res.send("Product not found.");
    }

    res.render("product-details", {
      product: result[0],
    });
  });
});

//Cart route
app.get("/cart", (req, res) => {
  const cart = req.session.cart || [];

  let total = 0;

  cart.forEach((product) => {
    total += product.price * product.quantity;
  });

  res.render("cart", {
    cart,
    total,
  });
});

//Add to Cart route
app.post("/cart/add/:id", (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM products WHERE id = ?";

  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.log("Error fetching product:", err);
      return res.send("Something went wrong.");
    }

    if (result.length === 0) {
      return res.send("Product not found.");
    }

    const product = result[0];

    if (!req.session.cart) {
      req.session.cart = [];
    }

    const existingProduct = req.session.cart.find(
      (item) => item.id === product.id,
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      product.quantity = 1;

      req.session.cart.push(product);
    }

    res.redirect("/cart");
  });
});

//Remove Route
app.post("/cart/remove/:id", (req, res) => {
  const { id } = req.params;

  req.session.cart = (req.session.cart || []).filter(
    (product) => product.id != id,
  );

  res.redirect("/cart");
});

//Register Route
app.get("/register", (req, res) => {
  res.render("register");
});
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
            INSERT INTO users (name, email, password)
            VALUES (?, ?, ?)
        `;

    connection.query(sql, [name, email, hashedPassword], (err) => {
      if (err) {
        console.log("Registration error:", err);
        return res.send("Registration failed.");
      }

      res.redirect("/login");
    });
  } catch (error) {
    console.log(error);
    res.send("Something went wrong.");
  }
});

//Login Route
app.get("/login", (req, res) => {
  res.render("login");
});
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";

  connection.query(sql, [email], async (err, result) => {
    if (err) {
      console.log("Login error:", err);
      return res.send("Something went wrong.");
    }

    if (result.length === 0) {
      return res.send("Invalid email or password.");
    }

    const user = result[0];

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.send("Invalid email or password.");
    }

    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    res.redirect("/");
  });
});

//Lougout route
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

//Checkout route
app.get("/checkout", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  const cart = req.session.cart || [];

  if (cart.length === 0) {
    return res.redirect("/products");
  }

  let total = 0;

  cart.forEach((product) => {
    total += product.price * product.quantity;
  });

  res.render("checkout", {
    cart,
    total,
    user: req.session.user,
  });
});

//Place Order route
app.post("/place-order", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  const cart = req.session.cart || [];

  if (cart.length === 0) {
    return res.redirect("/products");
  }

  let total = 0;

  cart.forEach((product) => {
    total += product.price * product.quantity;
  });

  const orderSql = `
        INSERT INTO orders (user_id, total_amount)
        VALUES (?, ?)
    `;

  connection.query(orderSql, [req.session.user.id, total], (err, result) => {
    if (err) {
      console.log("Order error:", err);
      return res.send("Order could not be placed.");
    }

    const orderId = result.insertId;

    const itemSql = `
                INSERT INTO order_items
                (order_id, product_id, quantity, price)
                VALUES ?
            `;

    const orderItems = cart.map((product) => [
      orderId,
      product.id,
      product.quantity,
      product.price,
    ]);

    connection.query(itemSql, [orderItems], (err) => {
      if (err) {
        console.log("Order items error:", err);
        return res.send("Order items could not be saved.");
      }

      req.session.cart = [];

      res.redirect("/order-success/" + orderId);
    });
  });
});

//Order Success route
app.get("/order-success/:id", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  const { id } = req.params;

  const sql = `
        SELECT *
        FROM orders
        WHERE id = ? AND user_id = ?
    `;

  connection.query(sql, [id, req.session.user.id], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Something went wrong.");
    }

    if (result.length === 0) {
      return res.send("Order not found.");
    }

    res.render("order-success", {
      order: result[0],
    });
  });
});

//My Orders route
app.get("/my-orders", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  const sql = `
        SELECT *
        FROM orders
        WHERE user_id = ?
        ORDER BY order_date DESC
    `;

  connection.query(sql, [req.session.user.id], (err, orders) => {
    if (err) {
      console.log(err);
      return res.send("Something went wrong.");
    }

    res.render("my-orders", {
      orders,
    });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
