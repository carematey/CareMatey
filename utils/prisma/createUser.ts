import prisma from './../../lib/prismadb';


const createUser = async (data: {
    email: string;
    password: string;

}) => {
    return await prisma.user.create({
      data: {
        email: data.email,
      },
    })
    };
        
export default createUser