const express = require("express");
const dotenv = require("dotenv");
const passport = require("passport");
const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session");
const helmet = require("helmet");
const connectDB = require("./config/db");

// Load config
dotenv.config({ path: "./config/config.env" });

//Passport Config
require("./config/passport")(passport);

connectDB();

const app = express();

//Logging requests
app.use(morgan("dev"));

//CORS
let corsOption = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  exposedHeaders: ["x-auth-token"],
};
app.use(cors(corsOption));

//Passport Sessions Middleware
app.use(
  session({
    secret: process.env.API_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Helmet
app.use(helmet());

//HTML Template for Login Page
app.set("view engine", "ejs");

//Parsing JSON
app.use(express.json());

//Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/", require("./routes/index"));

app.use((req, res, next) => {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
});

app.use((err, req, res, next) => {
  /* eslint-enable no-unused-vars */
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
    response: err.response ? err.response.data : null,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
