import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import TicketItem from './TicketItem';

const EventDetailsPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [event, setEvent] = useState(null);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`/api/explore/${slug}`);
        const data = await response.json();
        setEvent(data.event);
        setTickets(data.tickets);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    if (slug) {
      fetchEventDetails();
    }
  }, [slug]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 mb-4 md:mb-0">
          <img src={event.image} alt={event.name} className="w-full rounded-lg" />
        </div>
        <div className="md:w-1/2 md:pl-8">
          <h1 className="text-3xl font-bold mb-2">{event.name}</h1>
          <p className="text-gray-500 mb-4">{event.category}</p>
          <p className="text-gray-700 mb-4">{event.description}</p>
          <p className="text-gray-700 font-bold mb-4">
            {new Date(event.date).toLocaleDateString()}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {tickets.map((ticket) => (
              <TicketItem key={ticket.id} ticket={ticket} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;