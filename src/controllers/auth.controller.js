import { createUser, getUserBy } from "../services/user.service.js"
import { loginSchema, registerSchema } from "../validations/schema.user.js"
import createHttpError from "http-errors"
import bcrypt from "bcryptjs";

export const register = async (req, res, next) => {
    // รับข้อมูล
    const { firstname, lastname, password, confirmPassword, email, phone, contactInfo, bio, profile } = req.body

    // ตรวจสอบเงื่อนไข 
    const user = registerSchema.parse(req.body)
    // console.log(user)

    // if (confirmPassword !== password) {
    //     return next(createHttpError[400]('password ไม่ตรงกัน'))
    // }

    const newUser = { ...user, password: await bcrypt.hash(password, 10) }
    // console.log(newUser)
    const result = await createUser(newUser)

    res.json({
        message: "Register Successful"
    })
}

export const login = async (req, res, next) => {
    // รับข้อมูล
    const { email, password } = req.body
    const user = loginSchema.parse(req.body)
    const foundUser = await getUserBy("email", email)
    // find user
    if (!foundUser) {
        return next(createHttpError[401]("Invalid Login"))
    }
    let pwOk = await bcrypt.compare(password, foundUser.password)
    if (!pwOk) {
        return next(createHttpError[401]("Invalid Login"))
    }
    // mockdata
    const { ...userData } = foundUser
    // showdata
    res.json({
        message: "Register Successful",
        // token: token,
        user: userData,
    })
}

export const getMe = (req, res) => {
    res.json({ user: req.user })
}