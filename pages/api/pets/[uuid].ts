// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

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
   // switch case for different methods (GET, POST, PUT, DELETE)
   switch (req.method) {
    case 'GET':
      res.status(200).json({
        sections: [
          {
            "title": "Feeding Instructions",
            "content": `Here are the instructions on how to feed my pets while I am away:
            - My dog, [dog's name], needs to be fed twice a day, once in the morning and once in the evening. 
            - They eat [brand and type of food] and you'll find the food in [location].
            - My cat, [cat's name], needs to be fed once a day in the morning. 
            - They eat [brand and type of food] and you'll find the food in [location].
            - Please make sure to leave enough water for both of them, you'll find water and water bowls in [location].
            - If you're unsure about anything, don't hesitate to contact me.`
            },
            {
              "title": "Walking Instructions",
              "content": `Here are the instructions on how to walk my pets while I am away:
              - My dog, [dog's name], needs to be walked twice a day, once in the morning and once in the evening. 
              - The usual walking route is [route or location], but feel free to change it up and explore new areas.
              - Make sure to bring poop bags and clean up after [dog's name].
              - My cat, [cat's name], is indoor cat and doesn't need to be walked. 
              - If you have any questions or concerns, don't hesitate to contact me.`
              }
            
          ]})
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
