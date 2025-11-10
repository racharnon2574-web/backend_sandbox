
import { z } from "zod"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const mobileRegex = /^[0-9]{10,15}$/

export const registerSchema = z.object({
    // ระบุเงื่อไขข้อมูล
    firstname: z
        .string()
        .min(1, "กรุณากรอกชื่อ")
        .max(50, "ชื่อยาวเกินไป"),

    lastname: z
        .string()
        .min(1, "กรุณากรอกนามสกุล")
        .max(50, "นามสกุลยาวเกินไป"),

    password: z
        .string()
        .min(1, "กรุณากรอก Password"),

    confirmPassword: z
        .string()
        .min(1, "กรุณากรอก Confirm Password"),

    email: z
        .string()
        .regex(emailRegex, "รูปแบบอีเมลไม่ถูกต้อง"),

    phone: z
        .string()
        .regex(mobileRegex, "เบอร์โทรศัพท์ไม่ถูกต้อง"),

    contactInfo: z
        .string()
        .optional(),

    bio: z
        .string()
        .max(500, "ประวัติส่วนตัวยาวเกินไป")
        .optional(),

    profile: z
        .string()
        .url("ลิงก์โปรไฟล์ไม่ถูกต้อง")
        .optional(),
}).refine(data => data.password === data.confirmPassword, {
    // ตรวจสอบความเหมือนกันของ password ในข้อมูล
    message: "Confirm Password must match password",
    path: ['password']
}).transform(data => {
    // แปลงข้อมูลให้ตรงกับ pisma
    const newValue = { ...data }
    delete newValue.confirmPassword
    return newValue
})

export const loginSchema = z.object({
    email: z
        .string()
        .email("รูปแบบอีเมลไม่ถูกต้อง"),

    password: z
        .string()
        .min(1, "กรุณากรอกรหัสผ่าน"),
})

