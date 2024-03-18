import { MongoClient } from 'mongodb';

const uri = process.env.NEXT_PRIVATE_MONGO_URL!;
const client = new MongoClient(uri);

export default client;
