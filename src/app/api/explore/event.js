import { Event } from '@/models/Event';
import mongoose from 'mongoose';

export async function GET(req, { params }) {
  await mongoose.connect(process.env.MONGO_URL);

  const { slug } = params;
  const event = await Event.findOne({ slug });

  if (!event) {
    return Response.json({ error: 'Event not found' }, { status: 404 });
  }

  return Response.json(event);
}