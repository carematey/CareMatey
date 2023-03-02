// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import {  Card } from '@prisma/client';
import prisma from '../../../lib/prismadb';
export default function CardsHandler(
    req: NextApiRequest,
    res: NextApiResponse<Card[] | Card | { error: string }>
) {

    async function findUniqueCard() {
        const cards = await prisma.card.findUniqueOrThrow({
            where: {
                id: Number(req.query.uuid),
            },
        });
        return cards;
    }
    async function createCard() {
        // ... you will write your Prisma Client queries here
        const card = await prisma.card.create(
            {
                data: {
                    creatorId: req.body.creatorId,
                    ownerId: req.body.ownerId,
                    space: { connect: {id: Number(req.query.uuid)}},
                    title: req.body.title,
                    text: req.body.text,
                    tags: req.body.tags,
                    User: {connect: {
                        id: req.body.ownerId
                    }}
                    
                },
            },
        );
        return card;
        
    }

    // switch case for different methods (GET, POST, PUT, DELETE)
    switch (req.method) {
        case 'GET':
            return findUniqueCard()
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
            return createCard()
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
