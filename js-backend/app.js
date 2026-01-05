const dotenv = require("dotenv")
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const port = process.env.PORT || 3000
const authRoute = require("./routes/auth")
const brandRoute = require("./routes/brand")
const categoryRoute = require("./routes/category")
const colorRoute = require("./routes/color")
const materialRoute = require("./routes/material")
const customerRoute = require("./routes/customer")
const { verifyToken, isAdmin, isSalesPerson } = require("./middleware/auth-middleware")

//Allow access to .env file
dotenv.config()

mongoose.set("strictQuery", true);

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}))
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.get("/", (req, res) => {
    res.send("server running")
})

app.get("/test-db", async (req, res) => {
  const state = mongoose.connection.readyState;
  res.json({ mongoState: state }); 
});

app.use("/auth", authRoute)
app.use("/brand", verifyToken, isAdmin, brandRoute)
app.use("/category", verifyToken, isAdmin, categoryRoute)
app.use("/color", verifyToken, isAdmin, colorRoute)
app.use("/material", verifyToken, isAdmin, materialRoute)
app.use("/customer", verifyToken, isSalesPerson, customerRoute)

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

connectDb().catch((err) => {
    console.log(err);
})

app.listen(port, '0.0.0.0', () => {
    console.log("server is running", port)
})