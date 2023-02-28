import { PrismaClient } from "@prisma/client";


const getUserByEmail = async (email: string) => {
  const prisma = new PrismaClient();

    return await prisma.user?.findUnique({
      where: { email: email},
    });
  };

  
 export default getUserByEmail;
  