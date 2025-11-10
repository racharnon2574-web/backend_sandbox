import { PrismaClient } from "../../generated/prisma/client.js";

const prisma = new PrismaClient();

export const createUser = async (userData) => {
    console.log('---')
    return await prisma.user.create({ data: userData })
}

export const getUserBy = async (column, value) => {
    return await prisma.user.findUnique({ where: { [column]: value } })
}