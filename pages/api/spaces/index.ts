// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import {  Space } from '@prisma/client';
import prisma from '../../../lib/prismadb';
import { NextRequest } from 'next/server';

export default function SpaceHandler(
    req: NextApiRequest,
    res: NextApiResponse<Space[] | Space | { error: string }>
) {

    /* 
        GET a Space by its uuid
    */
    async function findAllUsers() {
        const spaces = await prisma.space.findMany({
            where: {
                deletedAt: null,
    }});
        return spaces;
    }
    

    // switch case for different methods (GET, POST, PUT, DELETE)
    switch (req.method) {
        case 'GET':
          return findAllUsers()
                .then(async (data) => {
                    res.status(200).json(data);
                    await prisma.$disconnect();
                })
                .catch(async (e) => {
                    console.error(e);
                    await prisma.$disconnect();
                    process.exit(1);
                });

            break;
        case 'POST':
            // postSpace(req, res)
            break;
        case 'PUT':
            // putHouse(req, res)
            break;
        case 'DELETE':
            // deleteHouse(req, res)
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
