import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb'; // Adjust the path as necessary

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const client = await clientPromise;
      // Use the "Production" database
      const db = client.db('Production');

      // Extract the email from the request body
      const { email } = req.body;

      // Insert the email into the "Waitlist" collection
      await db.collection('Waitlist').insertOne({ email });

      res.status(200).json({ message: 'Email added to the waitlist!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to add the email' });
    }
  } else {
    // Respond with method not allowed if the request is not POST
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
