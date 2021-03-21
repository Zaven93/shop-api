require("dotenv").config()
const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true, useCreateIndex: true})

        console.log("DB successfully connected")
    } catch (error) {
        console.log(error)

        process.exit(1)
    }
}

module.exports = connectDB