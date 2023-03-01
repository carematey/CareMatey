// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import {  Space } from '@prisma/client';
import prisma from '../../../lib/prismadb';

export default function SpaceHandler(
    req: NextApiRequest,
    res: NextApiResponse<Space[] | Space | { error: string }>
) {

    /* 
        GET a Space by its uuid
    */
    async function findSpaceById() {
        const spaces = await prisma.space.findUniqueOrThrow({
            where: {
                id: Number(req.query.uuid),
    }});
        return spaces;
    }
    async function createSpace() {
        const space = await prisma.space.create({
            data: {
                name: req.body.name as string,
                userId: req.body.ownerId as string,

            },  
        })
        return space
    }

    // switch case for different methods (GET, POST, PUT, DELETE)
    switch (req.method) {
        case 'GET':
            return findSpaceById()
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
            return createSpace()
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
