'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Particles from './components/ui/Particles'; // Adjust the path to your Particles component

// Define the type for an event
type Event = {
  id: number;
  name: string;
  date: string;
  startTime: string; // Updated from `time` to `startTime`
  endTime: string; // New field for event end time
  location: string;
  rsvpLink: string;
};

// Mock data for events
const events: Event[] = [
  {
    id: 1,
    name: "Daw'ah Table & Free Waffles",
    date: "2025-01-13",
    startTime: "11:00",
    endTime: "16:00",
    location: "CAB",
    rsvpLink: "https://forms.gle/exampleRSVP1",
  },
  {
    id: 2,
    name: "Lecture by Navaid Aziz",
    date: "2025-01-13",
    startTime: "17:00",
    endTime: "19:00",
    location: "TBA",
    rsvpLink: "https://forms.gle/exampleRSVP2",
  },
  {
    id: 3,
    name: "Daw'ah Table & Hijab Booth",
    date: "2025-01-14",
    startTime: "11:00",
    endTime: "16:00",
    location: "CAB",
    rsvpLink: "https://forms.gle/exampleRSVP3",
  },
  {
    id: 4,
    name: "Daw'ah Table & Virtual Reality",
    date: "2025-01-15",
    startTime: "11:00",
    endTime: "16:00",
    location: "SUB",
    rsvpLink: "https://forms.gle/exampleRSVP1",
  },
  {
    id: 5,
    name: "Lecture by Tim Humble",
    date: "2025-01-13",
    startTime: "17:00",
    endTime: "19:00",
    location: "TBA",
    rsvpLink: "https://forms.gle/exampleRSVP2",
  },
  {
    id: 6,
    name: "Daw'ah Table & Hijab Booth",
    date: "2025-01-16",
    startTime: "11:00",
    endTime: "16:00",
    location: "CAB",
    rsvpLink: "https://forms.gle/exampleRSVP1",
  },
  {
    id: 7,
    name: "Lecture by Way of Life SQ",
    date: "2025-01-16",
    startTime: "17:00",
    endTime: "19:00",
    location: "TBA",
    rsvpLink: "https://forms.gle/exampleRSVP2",
  },
  {
    id: 8,
    name: "IAW Dinner with special guest Way of Life SQ",
    date: "2025-01-16",
    startTime: "17:00",
    endTime: "19:00",
    location: "TBA",
    rsvpLink: "https://forms.gle/exampleRSVP2",
  },
];

// Function to determine the next event based on the start time
function getNextEvent(events: Event[]): Event | null {
  const now = new Date();
  return events.find(
    event => new Date(`${event.date}T${event.startTime}`) > now
  ) || null;
}

export default function Home() {
  const [nextEvent, setNextEvent] = useState<Event | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>("");

  useEffect(() => {
    const next = getNextEvent(events);
    setNextEvent(next);

    const interval = setInterval(() => {
      if (next) {
        const eventTime = new Date(`${next.date}T${next.startTime}`);
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
    <main className="relative min-h-screen bg-black">
      <Particles
        className="absolute inset-0 z-0"
        quantity={300}
        color="#FFD700"
        size={0.5}
        staticity={100}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-4 py-8 text-white">
        {/* Main Heading */}
        <h1 className="text-6xl font-extrabold mb-4 glow-text">Islam Awareness Week 2025</h1>
        <h2 className="text-3xl text-gray-300 mb-6">Reawaken your heart</h2>

        {/* Countdown */}
        {nextEvent && (
          <div className="mb-10">
            <h3 className="text-3xl font-semibold mb-2">Next Event In:</h3>
            <p className="text-5xl font-bold">{timeRemaining}</p>
          </div>
        )}

        {/* Next Event */}
        {nextEvent ? (
          <div className="mb-12 w-full max-w-xl bg-gray-900 p-6 rounded-lg shadow-md border border-yellow-500">
            <h2 className="text-2xl font-semibold mb-2">{nextEvent.name}</h2>
            <p className="text-lg text-yellow-300">Date: {nextEvent.date}</p>
            <p className="text-lg text-yellow-300">Start Time: {nextEvent.startTime}</p>
            <p className="text-lg text-yellow-300">End Time: {nextEvent.endTime}</p>
            <p className="text-lg text-yellow-300">Location: {nextEvent.location}</p>
            <Link href={nextEvent.rsvpLink}>
              <button className="mt-4 px-6 py-3 bg-yellow-500 text-black rounded hover:bg-yellow-600">
                RSVP Now
              </button>
            </Link>
          </div>
        ) : (
          <p className="text-xl">No upcoming events</p>
        )}

        {/* List of All Events */}
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">All Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map(event => (
              <div
                key={event.id}
                className="p-4 bg-gray-900 border border-yellow-500 rounded shadow-md hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold">{event.name}</h3>
                <p className="text-yellow-300">Date: {event.date}</p>
                <p className="text-yellow-300">Start Time: {event.startTime}</p>
                <p className="text-yellow-300">End Time: {event.endTime}</p>
                <p className="text-yellow-300">Location: {event.location}</p>
                <Link href={event.rsvpLink}>
                  <button className="mt-3 px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600">
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
