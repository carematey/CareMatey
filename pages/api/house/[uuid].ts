// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  emergencyContact: {
    name: string
    phone: string
    email: string
  },
    address: {
        street: string
        city: string
        state: string
        zip: string
    }

}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {


  const getHouse = (req: NextApiRequest, res: NextApiResponse<Data>) => {
    res.status(200).json({
      emergencyContact: {
        name: 'John Doe',
        phone: '555-555-5555',
        email: ''
      },
      address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zip: '12345'
      }
    })
  }

  // switch case for different methods (GET, POST, PUT, DELETE)
  switch (req.method) {
    case 'GET':
      getHouse(req, res)
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
