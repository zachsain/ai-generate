import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// Set the runtime to edge for best performance
export const runtime = 'edge';

export async function POST(req: Request) {
  const { vibe, formType, bio } = await req.json();

  const contentInput = 
    formType === 'ig'
    ? `Genereate a great instagram post caption that is no more than 200 characters and base the caption context of this description: ${bio}${
      bio.slice(-1) === '.' ? '' : '.'}`
    : formType === 'lyrics'
    ? `Generate song lyrics with 2 verses and 1 chorus. 
      Make sure the song lyrics rhyme and are no more than 600 characters, and base the lyrics off this context: ${bio}${
      bio.slice(-1) === '.' ? '' : '.'}`
    : formType ===  'elevator' 
    ? `Generate an elevator pitch no more that 280 characters based off the following description:${bio}${
      bio.slice(-1) === '.' ? '' : '.'} make to include key points provided in the description`
    : ''

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'user',
        content: `${contentInput}`
      },
    ],
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
