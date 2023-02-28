import prisma from './../../lib/prismadb';



const getUserByEmail = async (email: string) => {


    return await prisma.user?.findUnique({
      where: { email: email},
    });
  };

  
 export default getUserByEmail;
  