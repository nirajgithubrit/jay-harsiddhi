const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const port = 3000
const authRoute = require("./routes/auth")
const brandRoute = require("./routes/brand")
const categoryRoute = require("./routes/category")
const colorRoute = require("./routes/color")
const materialRoute = require("./routes/material")
const customerRoute = require("./routes/customer")

app.use(cors())
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
    await mongoose.connect("mongodb://localhost:27017/", {
        dbName: "jay-harsiddhi-db"
    })

    console.log("mongodb connected")
}

connectDb().catch((err) => {
    console.log(err);
})

app.listen(port, () => {
    console.log("server is running", port)
})


