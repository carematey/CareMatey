import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const createUser = async (data: {
    email: string;
    password: string;

}) => {
    return await prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        fullName: data.email,
      },
    })
    };
        
export default createUser