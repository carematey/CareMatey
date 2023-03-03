import { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

export default async function aiHandler(req: NextApiRequest, res: NextApiResponse) {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    let response;
    try {

        response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [
              { role: "system", content: "You are an API endpoint that returns new cards for task in JSON format. DO NOT include any extra sentences, only JSON formatted data is returned. Separate by commas. Properly escape chars. Should be valid JSON!"}, // helps set the behavior of the assistant
              {role: "assistant", content: `the recommendations should be based on the following tags: ${req.body.tags}`},
              {role: "assistant", content: "Provide 3 more cards as an array [], valid JSON data in the form [{title: string, text: string, tags: string[]}, ...] should be returned. DO NOT include any extra sentences! only JSON formatted data is returned. Separate by commas. Properly escape chars. Should be valid JSON!"},
              { role: 'user', content: JSON.stringify({
                title: req.body.title,
                text: req.body.text,
                tags: req.body.tags,

              }) },
            ],

        });
    } catch (error) {
        return res.status(500).json(error);
    }

    if (response) {
        return res.status(200).json(response?.data);
    }
}
