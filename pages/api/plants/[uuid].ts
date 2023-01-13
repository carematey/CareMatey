// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Section = {
  title: string;
  content: string;
};

type Data = {
  sections: Section[];
};

export default function plantsHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const getPlants = (req: NextApiRequest, res: NextApiResponse<Data>) => {
    res.status(200).json({
      sections: [
        {
          title: 'Watering Instructions',
          content: `It is important to properly water your house plants to ensure they stay healthy. Here are a few tips:
        - Most plants need to be watered once a week, but be sure to check the soil moisture levels before watering.
        - Water the soil directly, avoiding getting water on the leaves.
        - Use room temperature water, as cold water can shock the plant.
        - Be careful not to overwater, as this can lead to root rot.
        - Be sure to check the specific watering needs of each plant, as some may require more or less water than others.`,
        },
        {
          title: 'Lighting Instructions',
          content: `This section could provide information on the type of light each plant needs, how much light is ideal, and how to position the plants to ensure they receive the right amount of light:
        - Most plants need at least 6 hours of sunlight per day, but be sure to check the specific lighting needs of each plant.
        - Be careful not to overexpose your plants to direct sunlight, as this can lead to sunburn.
        - Be sure to check the specific lighting needs of each plant, as some may require more or less light than others.`,
        },
        {
          title: 'Fertilizing Instructions',
          content: `This section could provide information on when and how to fertilize the plants, what type of fertilizer to use, and how much to use:
        - Most plants need to be fertilized once a month, but be sure to check the specific fertilizing needs of each plant.
        - Be sure to check the specific fertilizing needs of each plant, as some may require more or less fertilizer than others.`,
        },
      ],
    });
  };
  // switch case for different methods (GET, POST, PUT, DELETE)
  switch (req.method) {
    case 'GET':
      getPlants(req, res);
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
