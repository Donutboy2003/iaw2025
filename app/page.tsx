'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Particles from './components/ui/Particles'; // Adjust the path to your Particles component
import EventCard from './components/EventCard';

// Define the type for an event
type Event = {
  id: number;
  name: string;
  date: string;
  time: string;
  location: string;
  rsvpLink: string;
};

// Mock data for events
const events: Event[] = [
  {
    id: 1,
    name: "Tech Talk on AI",
    date: "2024-12-31",
    time: "18:00",
    location: "Room 101, Engineering Building",
    rsvpLink: "https://forms.gle/exampleRSVP1",
  },
  {
    id: 2,
    name: "Community Meetup",
    date: "2024-01-15",
    time: "14:00",
    location: "Community Hall",
    rsvpLink: "https://forms.gle/exampleRSVP2",
  },
  {
    id: 3,
    name: "Workshop: Web Development Basics",
    date: "2024-02-05",
    time: "10:00",
    location: "Online (Zoom)",
    rsvpLink: "https://forms.gle/exampleRSVP3",
  },
];

// Define the type of the function parameter
function getNextEvent(events: Event[]): Event | null {
  const now = new Date();
  return events.find(event => new Date(`${event.date}T${event.time}`) > now) || null;
}

export default function Home() {
  const [nextEvent, setNextEvent] = useState<Event | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>("");

  useEffect(() => {
    const next = getNextEvent(events);
    setNextEvent(next);

    const interval = setInterval(() => {
      if (next) {
        const eventTime = new Date(`${next.date}T${next.time}`);
        const now = new Date();
        const diff = eventTime.getTime() - now.getTime();

        if (diff > 0) {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
        } else {
          setTimeRemaining("Event is starting now!");
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-screen">
      {/* Add the Particles component as the background */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={200}
        color="#FFD700"
        size={0.5}
        staticity={100}
      />

      <div className="relative z-10 p-4">
        <h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>

        {nextEvent ? (
          <div className="mb-6 p-4 bg-blue-100 border border-blue-300 rounded">
            <h2 className="text-xl font-semibold">Next Event: {nextEvent.name}</h2>
            <p>Date: {nextEvent.date}</p>
            <p>Time: {nextEvent.time}</p>
            <p>Location: {nextEvent.location}</p>
            <p className="mt-2 text-blue-700">Time remaining: {timeRemaining}</p>
            <Link href={nextEvent.rsvpLink}>
              <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                RSVP Now
              </button>
            </Link>
          </div>
        ) : (
          <p>No upcoming events</p>
        )}

        <div>
          <h2 className="text-xl font-bold mb-4">All Events</h2>
          <div className="grid grid-cols-1 gap-4">
            {events.map(event => (
              <div
                key={event.id}
                className="p-4 border rounded shadow-md hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold">{event.name}</h3>
                <p>Date: {event.date}</p>
                <p>Time: {event.time}</p>
                <p>Location: {event.location}</p>
                <Link href={event.rsvpLink}>
                  <button className="mt-3 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                    RSVP
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
