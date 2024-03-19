'use server';

import clientPromise from '@/lib/mongodb'; // Adjust the path as necessary
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const client = await clientPromise;
  const db = client.db('Production');
  const { email } = await req.json();

  try {
    // Check if the email already exists in the "Waitlist" collection
    const existingEmail = await db.collection('Waitlist').findOne({ email });

    if (existingEmail) {
      // If email exists, return a message indicating it's already registered
      return new NextResponse(JSON.stringify({ error: 'This email is already on the waitlist.' }), {
        status: 409, // HTTP status code 409 Conflict is often used in cases of resource conflict
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // If email does not exist, insert it into the collection
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
    // Return a generic error response
    return new NextResponse(JSON.stringify({ error: 'Failed to add the email' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
