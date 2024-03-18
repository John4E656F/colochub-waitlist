'use server';

import clientPromise from '@/lib/mongodb'; // Adjust the path as necessary
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  // Use the "Production" database
  const client = await clientPromise;
  const db = client.db('Production');

  // Parse the request body to JSON
  const { email } = await req.json();

  try {
    // Insert the email into the "Waitlist" collection
    await db.collection('Waitlist').insertOne({ email });

    // Return a success response
    return new NextResponse(JSON.stringify({ message: 'Email added to the waitlist!' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: 'Failed to add the email' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
