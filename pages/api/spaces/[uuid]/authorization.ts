// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { SpaceAuthorization } from '@prisma/client';
import prisma from '../../../../lib/prismadb';
export default function SpaceAuthorizationsHandler(
    req: NextApiRequest,
    res: NextApiResponse<
        SpaceAuthorization[] | SpaceAuthorization | Number | { error: string }
    >
) {
    async function findUniqueSpaceAuthorization() {
        const spaceAuthorizations = await prisma.spaceAuthorization.findMany({
            where: {
                authorizedUserId: req.query.uuid as string,
            },
        });
        return spaceAuthorizations;
    }
    async function createSpaceAuthorization() {
        // ... you will write your Prisma Client queries here
        const SpaceAuthorization = await prisma.spaceAuthorization.create({
            data: {
                spaceId: Number(req.query.uuid),
                authorizedUserId: req.body.userId,
                role: req.body.role,
            },
        });
        return SpaceAuthorization;
    }

    async function deleteSpaceAuthorization() {
        const spaceAuthorization = await prisma.spaceAuthorization.deleteMany({
            where: {
                spaceId: Number(req.query.uuid),
            },
        });
        return spaceAuthorization;
    }

    async function editSpaceAuthorization() {
        const spaceAuthorization = await prisma.spaceAuthorization.update({
            where: {
                id: Number(req.query.uuid),
            },
            data: {
                authorizedUserId: req.body.userId,
                role: req.body.role,
            },
        });
        return spaceAuthorization;
    }
    // switch case for different methods (GET, POST, PUT, DELETE)
    switch (req.method) {
        case 'GET':
            return findUniqueSpaceAuthorization()
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
            return createSpaceAuthorization()
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
            return editSpaceAuthorization()
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
            return deleteSpaceAuthorization()
                .then(async (data) => {
                    res.status(200).json(data.count);
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
