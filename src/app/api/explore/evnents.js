import { Event } from '@/models/Event';
import mongoose from 'mongoose';

export async function GET(request) {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    const { searchParams } = request.nextUrl;
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
        (event) =>
          new Date(event.date).toISOString().slice(0, 10) === date
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

    events = await events.populate('category');

    return new Response(JSON.stringify(events), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: 'Error fetching events' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } finally {
    await mongoose.disconnect();
  }
}