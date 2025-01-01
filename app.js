const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");

dotenv.config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true,
}));

// Serve static files (images, css, js)
app.use(express.static(path.join(__dirname, "public")));

// Set EJS as template engine
app.set("view engine", "ejs");

// Routes
app.use("/", authRoutes);

// Start Server
app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running");
});
