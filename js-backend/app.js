const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const port = 3000
const authRoute = require("./routes/auth")

app.use(cors())
app.use(express.json())
app.get("/", (req, res) => {
    res.send("server running")
})

app.use("/auth", authRoute)

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


