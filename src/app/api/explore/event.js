import { Event } from '@/models/Event';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const { slug } = req.query;
    const event = await Event.findOne({ slug }).populate('tickets');

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    return res.status(200).json({ event, tickets: event.tickets });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching event details' });
  } finally {
    await mongoose.disconnect();
  }
}
