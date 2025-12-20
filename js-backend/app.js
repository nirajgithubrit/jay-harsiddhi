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

//Allow access to .env file
dotenv.config()

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}))
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.get("/", (req, res) => {
    res.send("server running")
})

app.use("/auth", authRoute)
app.use("/brand", brandRoute)
app.use("/category", categoryRoute)
app.use("/color", colorRoute)
app.use("/material", materialRoute)
app.use("/customer", customerRoute)

async function connectDb() {
    await mongoose.connect(process.env.MONGO_URI, {
        dbName: "jay-harsiddhi-db"
    })

    console.log("mongodb connected")
}

connectDb().catch((err) => {
    console.log(err);
})

app.listen(port, '0.0.0.0', () => {
    console.log("server is running", port)
})