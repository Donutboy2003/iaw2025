import React from "react";
import Tabs from "@/app/components/ui/tabs";

interface Event {
  id: number;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  rsvpLink: string;
}

interface TabCardProps {
  events: Event[];
}

const TabCard: React.FC<TabCardProps> = ({ events }) => {
  const tabs = [
    {
      id: "what-is-iaw",
      label: "What is IAW?",
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-baskervville glow-text">What is IAW?</h2>
          <p className="font-poppins">
            Islam Awareness Week (IAW) is a week dedicated to ...
          </p>
        </div>
      ),
    },
    {
      id: "itinerary",
      label: "Itinerary",
      content: (
        <div>
          <h2 className="text-2xl font-baskervville glow-text mb-4">All Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="relative p-6 rounded-xl transition hover:shadow-xl"
                style={{
                  background: "transparent",
                  boxShadow: "8px 8px 16px #0c0c0c, -8px -8px 16px #282828",
                }}
              >
                <h3 className="text-lg font-baskervville text-gold mb-2">
                  {event.name}
                </h3>
                <p className="text-white">Date: {event.date}</p>
                <p className="text-white">Start Time: {event.startTime}</p>
                <p className="text-white">End Time: {event.endTime}</p>
                <p className="text-white">Location: {event.location}</p>
                <a
                  href={event.rsvpLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block px-4 py-2 bg-gold text-black rounded hover:bg-yellow-600 transition font-poppins"
                  style={{
                    boxShadow:
                      "inset 3px 3px 6px rgba(0,0,0,0.4), inset -3px -3px 6px rgba(255,255,255,0.1)",
                  }}
                >
                  RSVP
                </a>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "learn-about-islam",
      label: "Learn About Islam",
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-baskervville glow-text">Learn About Islam</h2>
          <p className="font-poppins">
            Islam is one of the world's major religions ....
          </p>
        </div>
      ),
    },
    {
      id: "about-speakers",
      label: "About Speakers",
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-baskervville glow-text">About Speakers</h2>
          <p className="font-poppins">
            Our guest speakers are ....
          </p>
        </div>
      ),
    },
    {
      id: "sponsors",
      label: "Sponsors",
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-baskervville glow-text">Sponsors</h2>
          <p className="font-poppins">
            We are grateful to our sponsors for making IAW 2025 possible.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full max-w-4xl p-6 text-left bg-transparent">
      <Tabs tabs={tabs} />
    </div>
  );
};

export default TabCard;
