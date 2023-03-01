// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import {  Card } from '@prisma/client';
import prisma from '../../../lib/prismadb';
export default function CardsHandler(
    req: NextApiRequest,
    res: NextApiResponse<Card[] | { error: string }>
) {

    async function findMany() {
        // ... you will write your Prisma Client queries here
        const cards = await prisma.card.findMany({
            where: {
                homeId: Number(req.query.uuid),
            },
        });
        return cards;
    }
    async function createCard() {
        // ... you will write your Prisma Client queries here
    }

    // switch case for different methods (GET, POST, PUT, DELETE)
    switch (req.method) {
        case 'GET':
            findMany()
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
            // postHouse(req, res)
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
