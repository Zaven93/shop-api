const User = require("../model/user")
const jwt = require("jsonwebtoken")

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.id).select("-password")

        if(!user){
            res.status(401).json({message: "Invalid credentials"})
        }

        res.status(200).send(user)
    } catch (error) {
        res.status(500).json({message: error})
    }
}

const register = async (req, res) => {
    const {firstName, lastName, email, password} = req.body
    let user
    try {
        user = await User.findOne({email})

        if(user){
            res.status(403).json({message: "User already exists"})

            return
        }

        user = new User({
            firstName,
            lastName,
            email,
            password
        })

        await user.save()

        const payload = {
            id: user._id
        }

        const token = await jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1d"})

        res.status(200).send(token)
    } catch (error) {
        res.status(500).json({message: error})
    }
}

const login = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.findOne({email})

      if(!user){
          res.status(400).json({message: "Invalid credentials"})

          return
      }
       
      const passwordsMatch = await user.matchPasswords(password)

      if(!passwordsMatch){
        res.status(400).json({message: "Invalid credentials"})

        return
      }

      const payload = {
          id: user._id
      }

      const token = await jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1d"})

      res.status(200).send(token)
    } catch (error) {
        res.status(500).json({message: error})
    }
}

module.exports = {
    getUser,
    register,
    login
}