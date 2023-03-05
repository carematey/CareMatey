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
                    spaceId: Number(req.query.uuid),
                    title: req.body.title,
                    text: req.body.text,
                    tags: req.body.tags,
                },
            },
        );
        return card;
        
    }

    async function deleteCard() {
        const card = await prisma.card.delete(
            {
                where: {
                    id: Number(req.query.uuid),
                },
            },
        );
        return card;
    }

    async function editCard() {
        const card = await prisma.card.update(
            {
                where: {
                    id: Number(req.query.uuid),
                },
                data: {
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
            
        case 'PUT':
            return editCard()
                .then(async (data) => {
                    res.status(200).json(data);
                    await prisma.$disconnect();
                })
                .catch(async (e) => {
                    console.error(e);
                    await prisma.$disconnect();
                    process.exit(1);
                });
                
            
        case 'DELETE':
            return deleteCard() 
                .then(async (data) => {
                    res.status(200).json(data);
                    await prisma.$disconnect();
                })
                .catch(async (e) => {
                    console.error(e);
                    await prisma.$disconnect();
                    process.exit(1);
                });
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
