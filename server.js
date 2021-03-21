const express = require("express")
const app = express()
const cors = require("cors")
const connectDB = require("./db")

const authRoute = require("./routes/auth")


connectDB()

const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use("/api/auth", authRoute)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))