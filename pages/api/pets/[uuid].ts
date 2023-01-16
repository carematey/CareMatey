// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

type Section = {
  title: string
  content: string
}

type Data = {
  sections: Section[]
}

export default function petsHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

const prisma = new PrismaClient({

})


async function findMany() {
  // ... you will write your Prisma Client queries here
  const pets = await prisma.pets.findMany()
  console.log("🚀 ~ file: [uuid].ts:34 ~ findMany ~ pets", pets)
  return pets
}
async function createPet() {
  // ... you will write your Prisma Client queries here
  const pet = await prisma.pets.create({
    data: {
      name: 'Luna',
      sections: {
        create: [
          {
            title: 'Feeding Instructions',
            content: `Here are the instructions on how to feed my pets while I am away:
            - My dog, [dog's name], needs to be fed twice a day, once in the morning and once in the evening.`
          }]} 
         
}})
console.log("🚀 ~ file: [uuid].ts:42 ~ createPet ~ pet", pet)
}

   // switch case for different methods (GET, POST, PUT, DELETE)
   switch (req.method) {
    case 'GET':
      
      findMany()
        .then(async (data) => {    
          res.status(200).json(data)
          await prisma.$disconnect()
        })
        .catch(async (e) => {
          console.error(e)
          await prisma.$disconnect()
          process.exit(1)
        })
      
      break
    case 'POST':
      // postHouse(req, res)
      break
    case 'PUT':
      // putHouse(req, res)
      break
    case 'DELETE':
      // deleteHouse(req, res)
      break
    default:  
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
  
}
