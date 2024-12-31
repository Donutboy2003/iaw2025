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

  // Find the next upcoming event
  useEffect(() => {
    const now = new Date();
    const upcomingEvent = events.find(
      (event) => new Date(`${event.date}T${event.startTime}`) > now
    );
    setNextEvent(upcomingEvent || null);

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
    <main className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      {/* Particles Background */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={200}
        color="#FFD700"
        size={0.4}
        staticity={100}
      />

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center text-center px-4 pt-16 pb-10 text-white space-y-6 sm:space-y-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-baskervville glow-text tracking-tight">
          Islam Awareness Week 2025
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 italic font-poppins max-w-2xl">
          Reawaken your heart.
        </p>
      </section>

      {/* Next Event / Countdown */}
      <section className="relative z-10 flex flex-col items-center text-center px-4 py-8 text-white space-y-4 sm:space-y-6">
        {nextEvent ? (
          <div className="w-full max-w-lg bg-black bg-opacity-70 rounded-lg shadow-md p-6 transition">
            <h3 className="text-xl sm:text-2xl font-baskervville mb-2">
              Next Event In:{" "}
              <span className="text-gold">{timeRemaining}</span>
            </h3>
            <h2 className="text-lg sm:text-xl font-baskervville mb-3 text-gold">
              {nextEvent.name}
            </h2>
            <div className="space-y-1 mb-4 text-sm sm:text-base text-white">
              <p>Date: {nextEvent.date}</p>
              <p>Start Time: {nextEvent.startTime}</p>
              <p>End Time: {nextEvent.endTime}</p>
              <p>Location: {nextEvent.location}</p>
            </div>
            <a
              href={nextEvent.rsvpLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-5 py-2 bg-gold text-black rounded-md font-medium hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              RSVP Now
            </a>
          </div>
        ) : (
          <div className="w-full max-w-lg bg-black bg-opacity-70 rounded-lg shadow-md p-6">
            <h3 className="text-xl sm:text-2xl font-baskervville mb-2">
              No upcoming events
            </h3>
            <p className="text-sm sm:text-base text-gray-300">
              Stay tuned for updates or check out our full itinerary below!
            </p>
          </div>
        )}
      </section>

      {/* TabCard / Pill Navigation & Content */}
      <section className="relative z-10 flex flex-col items-center text-center px-4 pb-16 text-white">
        <div className="w-full max-w-xl mx-auto">
          {/* You already have a TabCard that uses pill navigation inside */}
          <TabCard events={events} />
        </div>
      </section>
    </main>
  );
}
