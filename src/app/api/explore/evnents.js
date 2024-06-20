import { Event } from '@/models/Event';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    await mongoose.connect(process.env.MONGO_URL);

    const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
    const {
      name,
      description,
      date,
      category,
      location,
      capacity,
      availableTickets,
    } = Object.fromEntries(searchParams);

    let events = await Event.find({});

    if (name) {
      events = events.filter((event) =>
        event.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    if (description) {
      events = events.filter((event) =>
        event.description.toLowerCase().includes(description.toLowerCase())
      );
    }

    if (date) {
      events = events.filter(
        (event) => new Date(event.date).toISOString().slice(0, 10) === date
      );
    }

    if (category) {
      events = events.filter((event) => event.category.toString() === category);
    }

    if (location) {
      events = events.filter((event) =>
        event.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (capacity) {
      events = events.filter((event) => event.capacity === parseInt(capacity));
    }

    if (availableTickets) {
      events = events.filter(
        (event) => event.availableTickets === parseInt(availableTickets)
      );
    }

    events = await Event.populate(events, { path: 'category' });

    return res.status(200).json(events);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching events' });
  } finally {
    await mongoose.disconnect();
  }
}
