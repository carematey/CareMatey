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
    
    async function deleteSpace() {

        const spaceAuthorizations = await prisma.spaceAuthorization.deleteMany({
            where: {
                spaceId: Number(req.query.uuid),
            }
        })

        const cards = await prisma.card.deleteMany({
            where: {
                spaceId: Number(req.query.uuid),
            }
        })

        const space = await prisma.space.delete({
            where: {
                id: Number(req.query.uuid),
            }
        })
        return space
    }

    const editSpace = async () => {
        const space = await prisma.space.update({
            where: {
                id: Number(req.query.uuid),
            },
            data: {
                name: req.body.name as string,
            }
        })
        return space
    }
    
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
        case 'PUT':
            return editSpace()
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
            return deleteSpace()
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
