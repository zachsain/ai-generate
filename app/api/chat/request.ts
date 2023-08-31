import OpenAI from 'openai';
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    name: string;
}

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
  });

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
              role: 'user',
              content: 'hello'
            },
          ],
      });

    //   res.status(200).json(chatCompletion)
      res.status(200).json([chatCompletion.choices[0].message])
      console.log(chatCompletion.choices[0].message)
}