import { Ticket } from '@/models/Ticket';
import mongoose from 'mongoose';

export async function GET(req, { params }) {
  await mongoose.connect(process.env.MONGO_URL);

  const { eventId } = params;
  const tickets = await Ticket.find({ event: eventId });

  return Response.json(tickets);
}