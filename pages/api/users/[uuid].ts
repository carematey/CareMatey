// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { User, Card, Home, PrismaClient } from '@prisma/client';

export default function userHandler(
    req: NextApiRequest,
    res: NextApiResponse<Card[] | { error: string }>
) {
    const prisma = new PrismaClient({});

    async function findMany() {
        // ... you will write your Prisma Client queries here
        const cards = await prisma.card.findMany({
            where: {
                homeId: Number(req.query.uuid),
            },
        });
        return cards;
    }
    async function createUser() {
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