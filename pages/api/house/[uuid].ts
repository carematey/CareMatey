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
                    text: 'feed cj sometimes. Per day: 3 cups food, 1 tablet medicine, 1 old man treat. All split in half for morning and evening meals',
                },
                {
                    title: 'John Doe',
                    category: 'pets',
                    text: '555-555-5555',
                    tags: ['Villavicencio', 'house', 'phone'],
                    id: 101,
                },
                {
                    title: 'Rich text',
                    category: 'pets',
                    text: `<div>somewhere <h1>over a rainbow</h1>we can handle <span color="red">rich text</span></div>`,
                    tags: ['Future Features', 'rich text'],
                    id: 102,
                },
                {
                    title: 'Contact info',
                    category: 'pets',
                    text: `Call tayler or Mikey if there are any issues. If you can't reach us, please call our emergency contacts`,
                    tags: [
                        'CA',
                        'Villavicencio',
                        'bugs',
                        'food',
                        'CA',
                        'Phone',
                    ],
                    id: 108,
                },
                {
                    title: 'control casing of tags on input',
                    category: 'pets',
                    text: `that way we don't have to think about or handle for tags with different casing on display`,
                    tags: ['Phone', 'bugs'],
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
