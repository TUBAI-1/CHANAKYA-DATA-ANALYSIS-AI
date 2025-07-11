import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { prompt } = req.body;

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": prompt}],
      });

      res.status(200).json({ result: completion.choices[0].message.content });
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      res.status(500).json({ error: 'Failed to generate AI insights.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}