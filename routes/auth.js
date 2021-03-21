const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")

const {register, login, getUser} = require("../controller/auth")

router.get("/", auth, getUser)

router.post("/register", register)

router.post("/login", login)

module.exports = router