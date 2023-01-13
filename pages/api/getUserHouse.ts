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
  res.status(200).json({ 
    emergencyContact: {
        name: 'John Doe',
        phone: '555-555-5555',
        email: ''
    },
    address: {
        street: '123 Main St',
        city: 'San Francisco',
        state: 'CA',
        zip: '94105'
    },

   })
}
