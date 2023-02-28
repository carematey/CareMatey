import prisma from './../../lib/prismadb';


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