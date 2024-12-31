import React from "react";
import Tabs from "@/app/components/ui/tabs";

// Define the Event type
interface Event {
  id: number;
  name: string;
  date: string;
  time: string;
  location: string;
  rsvpLink: string;
}

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

const TabCard = () => {
  const tabs = [
    {
      id: "itinerary",
      label: "Itinerary",
      content: (
        <div>
          <h3 className="text-xl font-semibold mb-4">Upcoming Events</h3>
          <ul className="space-y-4">
            {events.map((event) => (
              <li
                key={event.id}
                className="p-4 border border-gray-200 rounded-lg shadow-md bg-white bg-opacity-30"
              >
                <h4 className="text-lg font-medium text-gray-800">
                  {event.name}
                </h4>
                <p className="text-gray-600">
                  <strong>Date:</strong> {event.date}
                </p>
                <p className="text-gray-600">
                  <strong>Time:</strong> {event.time}
                </p>
                <p className="text-gray-600">
                  <strong>Location:</strong> {event.location}
                </p>
                <a
                  href={event.rsvpLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  RSVP Here
                </a>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      id: "about",
      label: "About IAW",
      content: (
        <p>
          International Awareness Week (IAW) brings communities together through
          shared learning and cultural experiences.
        </p>
      ),
    },
  ];

  return (
    <div
      className="
        w-full max-w-xl mx-auto
        p-6 rounded-lg shadow-lg
        bg-white
        backdrop-filter backdrop-blur-md
      "
    >
      <Tabs tabs={tabs} />
    </div>
  );
};

export default TabCard;