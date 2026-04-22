const dotenv = require("dotenv");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const port = process.env.PORT || 3000;

const authRoute = require("./routes/auth");
const brandRoute = require("./routes/brand");
const categoryRoute = require("./routes/category");
const colorRoute = require("./routes/color");
const materialRoute = require("./routes/material");
const customerRoute = require("./routes/customer");

const {
  verifyToken,
  isAdmin,
  isSalesPerson,
} = require("./middleware/auth-middleware");

// Load env
dotenv.config();

mongoose.set("strictQuery", true);

// ✅ Allowed origins
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");

// ✅ CORS setup
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

// ✅ 🔥 IMPORTANT: Handle preflight requests
app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin); // 🔥 dynamic
  }

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // 🔥 FIXES CORS ISSUE
  }

  next();
});

// Body parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// ✅ Test route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.get("/test-db", async (req, res) => {
  const state = mongoose.connection.readyState;
  res.json({ mongoState: state });
});

// Routes
app.use("/auth", authRoute);
app.use("/brand", verifyToken, isAdmin, brandRoute);
app.use("/category", verifyToken, isAdmin, categoryRoute);
app.use("/color", verifyToken, isAdmin, colorRoute);
app.use("/material", verifyToken, isAdmin, materialRoute);
app.use("/customer", verifyToken, isSalesPerson, customerRoute);

// DB connect
async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "jay-harsiddhi-db",
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
}

connectDb().catch((err) => console.log(err));

// Start server
app.listen(port, () => {
  console.log("server is running", port);
});
