"use client";

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
    location: "ECHA L1-190",
    rsvpLink: "https://forms.gle/zJzDen1UDavuArZu5",
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
    location: "TBA",
    rsvpLink: "https://forms.gle/exampleRSVP4",
  },
  {
    id: 5,
    name: "Lecture by Tim Humble",
    date: "2025-01-15",
    startTime: "17:00",
    endTime: "19:00",
    location: "ECHA L1-190",
    rsvpLink: "https://forms.gle/zJzDen1UDavuArZu5",
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
    location: "ECHA L1-490",
    rsvpLink: "https://forms.gle/zJzDen1UDavuArZu5",
  },
  {
    id: 8,
    name: "IAW Dinner with special guest Way of Life SQ",
    date: "2025-01-17",
    startTime: "17:00",
    endTime: "20:00",
    location: "Telus Atrium",
    rsvpLink: "https://buytickets.at/msauofa/1521527",
  },
  {
    id: 9,
    name: "Brothers session with Way of Life SQ",
    date: "2025-01-18",
    startTime: "13:00",
    endTime: "15:00",
    location: "ECHA 2-430",
    rsvpLink: "https://forms.gle/zJzDen1UDavuArZu5",
  },
  {
    id: 10,
    name: "Sisters' Table of Barakah Halaqa",
    date: "2025-01-18",
    startTime: "13:00",
    endTime: "15:00",
    location: "TBA",
    rsvpLink: "https://forms.gle/zJzDen1UDavuArZu5",
  },
];
const rsvpEnabledEventIds: number[] = [2,5,7,8,9,10];

export default function Home() {
  const [nextEvent, setNextEvent] = useState<Event | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // 1. Find the next upcoming event
    const now = new Date();
    const upcomingEvent = events.find(
      (event) => new Date(`${event.date}T${event.startTime}`) > now
    );
    setNextEvent(upcomingEvent || null);

    // 2. Countdown Logic
    let interval: NodeJS.Timeout | null = null;
    if (upcomingEvent) {
      interval = setInterval(() => {
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
    }

    // 3. Show/hide "Back to Top" button on scroll
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      if (interval) clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      {/* Particles Background */}
      <Particles
        className="fixed inset-0 z-0 pointer-events-none"
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
          <div className="relative w-full max-w-lg bg-black bg-opacity-70 rounded-lg shadow-md p-6 transition">
            {/* Golden border with subtle heartbeat glow animation */}
            <div
              className="
                absolute
                inset-0
                pointer-events-none
                rounded-lg
                border-2 border-gold
                z-10
                animate-borderHeartbeat
              "
            />

            <h3 className="text-xl sm:text-2xl font-baskervville mb-2">
              Next Event In: <span className="text-gold">{timeRemaining}</span>
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

            {/* RSVP Button if nextEvent.id is in rsvpEnabledEventIds */}
            {rsvpEnabledEventIds.includes(nextEvent.id) && (
              <a
                href={nextEvent.rsvpLink}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-block 
                  px-5 py-2 
                  bg-gold 
                  text-black 
                  rounded-md 
                  font-medium 
                  hover:bg-yellow-600 
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-yellow-400
                "
              >
                RSVP
              </a>
            )}
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
        <div className="w-full max-w-xl mx-auto mb-6">
          <a
            href="https://forms.gle/zJzDen1UDavuArZu5"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-block 
              px-6 
              py-2 
              bg-gold 
              text-black 
              rounded-md 
              font-medium 
              hover:bg-yellow-600 
              focus:outline-none 
              focus:ring-2 
              focus:ring-yellow-400
              transition
              shadow-md
            "
          >
            RSVP
          </a>
        </div>

        <div className="w-full max-w-xl mx-auto mb-6">
          <a
            href="https://buytickets.at/msauofa/1521527"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-block 
              px-6 
              py-2 
              bg-gold 
              text-black 
              rounded-md 
              font-medium 
              hover:bg-yellow-600 
              focus:outline-none 
              focus:ring-2 
              focus:ring-yellow-400
              transition
              shadow-md
            "
          >
            IAW Dinner Ticket
          </a>
        </div>

        
        
        <div className="w-full max-w-xl mx-auto">
          <TabCard events={events} rsvpEnabledEventIds={rsvpEnabledEventIds} />
        </div>
      </section>

      {/* "Back to Top" Round Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="
            fixed 
            bottom-6 
            right-6
            w-10 
            h-10
            bg-gray-800 
            bg-opacity-60
            text-gold
            rounded-full
            flex 
            items-center 
            justify-center
            hover:bg-gray-700
            transition-opacity 
            duration-300
            opacity-75
            hover:opacity-100
            focus:outline-none 
            focus:ring-2 
            focus:ring-gold
            z-50
            pointer-events-auto
          "
          aria-label="Scroll to top"
        >
          {/* Up Arrow Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
    </main>
  );
}
