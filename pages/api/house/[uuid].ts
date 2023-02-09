// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type userContentObject = {
    title: string;
    category: string;
    text: string;
    tags: string[];
    id: number;
};

type Data = {
    userContent: userContentObject[];
};

export default function houseHandler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const getHouse = (req: NextApiRequest, res: NextApiResponse<Data>) => {
        res.status(200).json({
            userContent: [
                {
                    id: 12333,
                    category: 'pets',
                    tags: ['pets', 'food', 'emergency'],
                    title: `CJ's food`,
                    text: 'feed cj sometimes',
                },
                {
                    title: 'John Doe',
                    category: 'pets',

                    text: '555-555-5555',
                    tags: ['emergency', 'house', 'phone'],
                    id: 101,
                },
                {
                    title: '123 Main St',
                    category: 'pets',

                    text: 'Anytown',
                    tags: ['CA', 'house'],
                    id: 102,
                },
                {
                    title: '123 Main St',
                    category: 'pets',

                    text: 'Anytown',
                    tags: ['CA'],
                    id: 108,
                },
                {
                    title: '123 Main St',
                    category: 'pets',

                    text: 'Anytown',
                    tags: ['CA'],
                    id: 107,
                },
                {
                    title: '123 Main St',
                    category: 'pets',

                    text: 'Anytown',
                    tags: ['CA'],
                    id: 106,
                },
                {
                    title: '123 Main St',
                    category: 'pets',

                    text: 'Anytown',
                    tags: ['CA'],
                    id: 105,
                },
                {
                    title: '123 Main St',
                    category: 'house',

                    text: 'Anytown',
                    tags: ['CA'],
                    id: 103,
                },
                {
                    title: '123 Main St',
                    category: 'plants',

                    text: 'Anytown',
                    tags: ['CA'],
                    id: 104,
                },
            ],
        });
    };

    // switch case for different methods (GET, POST, PUT, DELETE)
    switch (req.method) {
        case 'GET':
            getHouse(req, res);
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
