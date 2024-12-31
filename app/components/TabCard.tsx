import React, { useRef, useState } from "react";
import Tabs from "@/app/components/ui/tabs";

interface Event {
  id: number;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  rsvpLink: string;
  description?: string;
}

interface TabCardProps {
  events: Event[];
}

// Group events by date
function groupEventsByDate(events: Event[]): Record<string, Event[]> {
  return events.reduce<Record<string, Event[]>>((acc, event) => {
    (acc[event.date] = acc[event.date] || []).push(event);
    return acc;
  }, {});
}

// A separate component for the flippable event card
const EventFlipCard: React.FC<{ event: Event }> = ({ event }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="
        relative w-full h-64
        overflow-hidden
        perspective-1000
        bg-gray-800 bg-opacity-30
        text-white
        rounded-md
        mb-4
      "
    >
      <div
        className={`preserve-3d absolute inset-0 transition-transform duration-500 ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front Side */}
        <div className="absolute inset-0 backface-hidden bg-gray-900 bg-opacity-80 rounded-md p-4 flex flex-col justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gold mb-1">
              {event.name}
            </h4>
            <p className="text-sm text-gray-300 mb-2">
              {event.startTime} - {event.endTime} | {event.location}
            </p>
          </div>
          <div className="mt-2 flex justify-between items-center">
            <button
              onClick={() => setIsFlipped(true)}
              className="
                px-3 py-1 text-xs sm:text-sm
                bg-gray-700 text-white
                rounded
                hover:bg-gray-600
                focus:outline-none focus:ring-1 focus:ring-gold
              "
            >
              Learn More
            </button>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(event.id) ? (
              <button
                className="
                  px-3 py-1 text-xs sm:text-sm
                  bg-gray-500 text-gray-300 
                  rounded
                  cursor-not-allowed
                  focus:outline-none
                "
                disabled
              >
                RSVP Disabled
              </button>
            ) : (
              <a
                href={event.rsvpLink}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  px-3 py-1 text-xs sm:text-sm
                  bg-gold text-black 
                  rounded
                  hover:bg-yellow-500
                  focus:outline-none focus:ring-1 focus:ring-gold
                "
              >
                RSVP
              </a>
            )}
          </div>
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 backface-hidden bg-gray-900 bg-opacity-90 rounded-md p-4 rotate-y-180 flex flex-col justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gold mb-2">
              About this event
            </h4>
            <p className="text-sm">
              {event.description ? event.description : "No additional info."}
            </p>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setIsFlipped(false)}
              className="
                mt-2 px-3 py-1 text-xs sm:text-sm
                bg-gray-700 text-white
                rounded
                hover:bg-gray-600
                focus:outline-none focus:ring-1 focus:ring-gold
              "
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


const TabCard: React.FC<TabCardProps> = ({ events }) => {
  const groupedEvents = groupEventsByDate(events);
  const allDates = Object.keys(groupedEvents).sort();

  // Refs for each date section to scroll on pill click
  const dateRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Scroll to the chosen date section
  const handleDateClick = (date: string) => {
    dateRefs.current[date]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Sub-pill navigation for all date
  const renderDatePills = () => (
    <div className="flex flex-wrap gap-2 mb-4 overflow-x-auto">
      {allDates.map((date) => (
        <button
          key={date}
          onClick={() => handleDateClick(date)}
          className="
            px-3 py-1 text-sm sm:text-base
            rounded-full
            bg-gray-700 text-white
            hover:bg-gray-600
            transition
            whitespace-nowrap
          "
        >
          {date}
        </button>
      ))}
    </div>
  );

  // Render date sections
  const renderDatesAndEvents = () => (
    <div className="space-y-8 overflow-auto">
      {allDates.map((date) => (
        <div
          key={date}
          ref={(el) => {
            dateRefs.current[date] = el;
          }}
          className="pb-4 border-b border-gray-700"
        >
          <h3 className="text-base sm:text-lg font-semibold text-gold mb-3">
            {date}
          </h3>
          {/* Map each event to a big flippable card */}
          {groupedEvents[date].map((ev) => (
            <EventFlipCard key={ev.id} event={ev} />
          ))}
        </div>
      ))}
    </div>
  );

  // Itinerary tab content
  const itineraryContent = (
    <div className="space-y-6">
      <h2 className="text-lg sm:text-xl font-baskervville text-gold">
        Pick a Date
      </h2>
      {renderDatePills()}
      <p className="text-sm text-gray-400">
        Click a date to scroll down to those events
      </p>
      {renderDatesAndEvents()}
    </div>
  );

  // The tab array
  const tabs = [
    {
      id: "what-is-iaw",
      label: "What is IAW?",
      content: (
        <div className="space-y-3">
          <h2 className="text-lg sm:text-xl font-baskervville text-gold">
            What is IAW?
          </h2>
          <p className="font-poppins text-sm sm:text-base text-gray-300">
            Islam Awareness Week (IAW) is one of the MSA&apos;s largest and most impactful initiatives. IAW is a week-long event dedicated to conveying the true message of Islam and its relevance to humanity in today&apos;s contemporary context, engaging both non-Muslims and Muslims alike.
          </p>
          <p className="font-poppins text-sm sm:text-base text-gray-300">
            In 2024, by the grace of Allah SWT, we organized the biggest Islam Awareness Week in recent years! The event featured influential and engaging speakers from around the world, including The Sunnah Guy, Khaled Beydoun, Shaun King, and Shaykh Navaid Aziz. Activities included da&apos;wah booths, try-on hijab booths, public Quran recitations, lectures, speaker panels, a dinner, and more.
          </p>
          <p className="font-poppins text-sm sm:text-base text-gray-300">
            For 2025, we aim to build on this momentum and once again invite hundreds of students, faculty, staff, and people from all walks of life to learn about Islam&apos;s universal and timeless message. With exciting speakers and events in the works, IAW promises to be an unforgettable experience for everyone involved.
          </p>
          <p className="font-poppins text-sm sm:text-base text-gray-300">
            This week-long event not only provides a platform for education and dialogue but also fosters a deeper understanding of Islam&apos;s relevance in today&apos;s world. Stay tuned for more details on the upcoming IAW!
          </p>
        </div>
      ),
    },
    {
      id: "itinerary",
      label: "Itinerary",
      content: itineraryContent,
    },
    {
      id: "learn-about-islam",
      label: "Learn About Islam",
      content: (
        <div className="space-y-3">
          <h2 className="text-lg sm:text-xl font-baskervville text-gold">
            Learn About Islam
          </h2>
          <p className="font-poppins text-sm sm:text-base text-gray-300">
            Coming soon...
          </p>
        </div>
      ),
    },
    {
      id: "about-speakers",
      label: "About Speakers",
      content: (
        <div className="space-y-3">
          <h2 className="text-lg sm:text-xl font-baskervville text-gold">
            About Speakers
          </h2>
          <p className="font-poppins text-sm sm:text-base text-gray-300">
            Coming soon
          </p>
        </div>
      ),
    },
    {
      id: "sponsors",
      label: "Sponsors",
      content: (
        <div className="space-y-3">
          <h2 className="text-lg sm:text-xl font-baskervville text-gold">
            Sponsors
          </h2>
          <p className="font-poppins text-sm sm:text-base text-gray-300">
            Coming soon...
          </p>
          <p className="font-poppins text-sm sm:text-base text-gray-300">
            Please email us at msa@ualberta.ca if you&apos;d like to sponsor IAW 2025
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <Tabs tabs={tabs} />
    </div>
  );
};

export default TabCard;
