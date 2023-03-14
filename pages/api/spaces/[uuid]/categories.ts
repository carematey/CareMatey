// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Category } from '@prisma/client';
import prisma from '../../../../lib/prismadb';
import { NextRequest } from 'next/server';

export default function CategoryHandler(
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

    async function createCategory() {
        const category = await prisma.category.create({
            data: {
                space: { connect: { id: Number(req.query.uuid) } },
                name: req.body.name,
                description: req.body.description,
                image: req.body.image,
            },
        });
        return category;
    }

    async function updateCategoryPositions() {
        interface CategoryPosition {
            categoryId: number;
            newPosition: number;
        }

        interface UpdateCategoryPositionsRequest {
            categoryPositions: CategoryPosition[];
        }

        const { categoryPositions } =
            req.body as UpdateCategoryPositionsRequest;

        // Use a transaction to update all categories in a single atomic operation
        const updatedCategories = await prisma.$transaction(
            categoryPositions.map(({ categoryId, newPosition }) =>
                prisma.category.update({
                    where: { id: categoryId },
                    data: { position: newPosition },
                })
            )
        );

        return updatedCategories;
    }
    //  Deletion needs to be handled in a separate api call
    // async function deleteCategory() {
    //     const category = await prisma.category.delete({
    //         where: {
    //             id: Number(req.query.uuid),
    //         },
    //     });
    // }

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
            return createCategory().then(async (data) => {
                res.status(201).json(data);
                await prisma.$disconnect();
            });
            break;
        case 'PUT':
            return updateCategoryPositions().then(async (data) => {
                res.status(200).json(data);
                await prisma.$disconnect;
            });
            break;
        case 'DELETE':
            // deleteCategories(req, res)
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
