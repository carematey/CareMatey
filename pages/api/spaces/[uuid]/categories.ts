// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Category } from '@prisma/client';
import prisma from '../../../../lib/prismadb';
import { NextRequest } from 'next/server';

export default function SpaceHandler(
    req: NextApiRequest,
    res: NextApiResponse<Category[] | Category | { error: string }>
) {
    /* 
        GET a Category by its uuid
    */
    async function findAllCategories() {
        const categories = await prisma.category.findMany({
            where: {
                spaceId: Number(req.query.uuid),
            },
        });
        return categories;
    }

    // switch case for different methods (GET, POST, PUT, DELETE)
    switch (req.method) {
        case 'GET':
            return findAllCategories()
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
            // postCategories(req, res)
            break;
        case 'PUT':
            // putCategories(req, res)
            break;
        case 'DELETE':
            // deleteCategories(req, res)
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
