// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { User, Card, Home, PrismaClient } from '@prisma/client';

export default function CardsHandler(
    req: NextApiRequest,
    res: NextApiResponse<Card[] | Card | { error: string }>
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
    async function createCard() {
        // ... you will write your Prisma Client queries here
        const card = await prisma.card.create(
            {
                data: {
                    creatorId: Number(req.body.creatorId),
                    ownerId: Number(req.body.ownerId),
                    homeId: Number(req.query.uuid),
                    title: req.body.title,
                    text: req.body.text,
                    tags: req.body.tags,
                },
            },
        );
        return card;
        
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
            createCard()
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
