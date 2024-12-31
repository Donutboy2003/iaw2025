'use client';

import { useState, useEffect } from "react";
import Particles from "./components/ui/Particles";
import TabCard from "./components/TabCard";

type Event = {
  id: number;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  rsvpLink: string;
};

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
    rsvpLink: "https://forms.gle/exampleRSVP4",
  },
  {
    id: 5,
    name: "Lecture by Tim Humble",
    date: "2025-01-15",
    startTime: "17:00",
    endTime: "19:00",
    location: "TBA",
    rsvpLink: "https://forms.gle/exampleRSVP5",
  },
  {
    id: 6,
    name: "Daw'ah Table & Hijab Booth",
    date: "2025-01-16",
    startTime: "11:00",
    endTime: "16:00",
    location: "CAB",
    rsvpLink: "https://forms.gle/exampleRSVP6",
  },
  {
    id: 7,
    name: "Lecture by Way of Life SQ",
    date: "2025-01-16",
    startTime: "17:00",
    endTime: "19:00",
    location: "TBA",
    rsvpLink: "https://forms.gle/exampleRSVP7",
  },
  {
    id: 8,
    name: "IAW Dinner with special guest Way of Life SQ",
    date: "2025-01-16",
    startTime: "17:00",
    endTime: "19:00",
    location: "TBA",
    rsvpLink: "https://forms.gle/exampleRSVP8",
  },
];

export default function Home() {
  const [nextEvent, setNextEvent] = useState<Event | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>("");

  useEffect(() => {
    const now = new Date();
    const upcomingEvent = events.find(
      (event) => new Date(`${event.date}T${event.startTime}`) > now
    );
    setNextEvent(upcomingEvent);

    if (upcomingEvent) {
      const interval = setInterval(() => {
        const eventTime = new Date(`${upcomingEvent.date}T${upcomingEvent.startTime}`);
        const diff = eventTime.getTime() - new Date().getTime();

        if (diff > 0) {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
        } else {
          setTimeRemaining("Event is starting now!");
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, []);

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <Particles
        className="absolute inset-0 z-0"
        quantity={300}
        color="#FFD700"
        size={0.5}
        staticity={100}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-4 py-12 text-white">
        <h1 className="text-6xl font-baskervville mb-4 glow-text tracking-tight">
          Islam Awareness Week 2025
        </h1>
        <h2 className="text-2xl md:text-3xl text-gray-300 mb-10 italic font-poppins">
          Reawaken your heart
        </h2>

        {nextEvent && (
          <div
            className="mb-12 w-full max-w-xl rounded-xl p-6 transition hover:shadow-xl"
            style={{
              background: "transparent",
              boxShadow: "8px 8px 16px #0c0c0c, -8px -8px 16px #282828",
            }}
          >
            <h3 className="text-xl font-baskervville mb-2">
              Next Event In: <span className="text-gold">{timeRemaining}</span>
            </h3>
            <h2 className="text-2xl font-baskervville mb-4 text-gold">
              {nextEvent.name}
            </h2>
            <div className="space-y-1 mb-4 text-white">
              <p>Date: {nextEvent.date}</p>
              <p>Start Time: {nextEvent.startTime}</p>
              <p>End Time: {nextEvent.endTime}</p>
              <p>Location: {nextEvent.location}</p>
            </div>
            <a
              href={nextEvent.rsvpLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-6 py-3 bg-gold text-black font-medium rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              style={{
                boxShadow:
                  "inset 3px 3px 6px rgba(0,0,0,0.4), inset -3px -3px 6px rgba(255,255,255,0.1)",
              }}
            >
              RSVP Now
            </a>
          </div>
        )}

        <TabCard events={events} />
      </div>
    </main>
  );
}
