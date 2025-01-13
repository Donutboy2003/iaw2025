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

// NEW: Accept 'rsvpEnabledEventIds' as an additional prop
interface TabCardProps {
  events: Event[];
  rsvpEnabledEventIds: number[];
}

// Group events by date
function groupEventsByDate(events: Event[]): Record<string, Event[]> {
  return events.reduce<Record<string, Event[]>>((acc, event) => {
    (acc[event.date] = acc[event.date] || []).push(event);
    return acc;
  }, {});
}

// EventFlipCard that checks the 'rsvpEnabledEventIds' prop
const EventFlipCard: React.FC<{ event: Event; rsvpEnabledEventIds: number[] }> = ({
  event,
  rsvpEnabledEventIds,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="
        relative 
        w-full 
        h-64 
        overflow-hidden 
        perspective-1000 
        bg-gray-800 bg-opacity-30 
        text-white 
        rounded-md 
        mb-4
      "
    >
      {/* Golden Strip on the Left with glow */}
      <div
        className="
          absolute 
          left-0 
          top-0 
          w-1 
          h-full 
          bg-gold 
          rounded-l-md
          shadow-[0_0_10px_rgba(255,215,0,0.6)]
          pointer-events-none
          z-10
        "
      />

      <div
        className={`
          preserve-3d 
          absolute 
          inset-0 
          transition-transform 
          duration-500 
          ${isFlipped ? "rotate-y-180" : ""}
        `}
      >
        {/* Front Side */}
        <div className="absolute inset-0 backface-hidden bg-gray-900 bg-opacity-80 rounded-md p-4 flex flex-col justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gold mb-1">{event.name}</h4>
            
            <p className="text-base sm:text-lg text-gray-300 mb-2">
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
                focus:outline-none 
                focus:ring-1 
                focus:ring-gold
              "
            >
              Learn More
            </button>

            {/* If this event's ID is in rsvpEnabledEventIds, show the RSVP button */}
            {rsvpEnabledEventIds.includes(event.id) && (
              <a
                href={event.rsvpLink}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  px-3 py-1 text-xs sm:text-sm
                  bg-gold text-black 
                  rounded
                  hover:bg-yellow-500
                  focus:outline-none 
                  focus:ring-1 
                  focus:ring-gold
                "
              >
                RSVP
              </a>
            )}
          </div>
        </div>

        {/* Back Side */}
        <div
          className="
            absolute 
            inset-0 
            backface-hidden
            bg-gray-900 
            bg-opacity-90
            rounded-md 
            p-4
            rotate-y-180
            flex flex-col 
            justify-between
          "
        >
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
                mt-2 
                px-3 
                py-1 
                text-xs 
                sm:text-sm
                bg-gray-700 
                text-white
                rounded
                hover:bg-gray-600
                focus:outline-none 
                focus:ring-1 
                focus:ring-gold
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

const TabCard: React.FC<TabCardProps> = ({ events, rsvpEnabledEventIds }) => {
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

  // Sub-pill navigation for all dates
  const renderDatePills = () => (
    <div className="flex flex-wrap gap-2 mb-4 overflow-x-auto">
      {allDates.map((date) => (
        <button
          key={date}
          onClick={() => handleDateClick(date)}
          className="
            px-3 
            py-1 
            text-sm 
            sm:text-base
            rounded-full
            bg-gray-700 
            text-white
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
          {/* Map each event to a big flippable card, passing down rsvpEnabledEventIds */}
          {groupedEvents[date].map((ev) => (
            <EventFlipCard
              key={ev.id}
              event={ev}
              rsvpEnabledEventIds={rsvpEnabledEventIds}
            />
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
          Islam is a complete and practical way of life, which literally means &apos;Submission&apos; to One True God, known as Allah in Arabic. He is the Creator and Sustainer of the universe with no partners or equals. Islam is not a new religion, but the final message in a long line of prophets sent by God, (including Adam, Noah, Abraham, Moses, Jesus and finally Muhammad), preaching monotheism and righteousness.
          <br />
          <br />
          Islam is built upon 6 articles that govern one&apos;s internal faith (belief in Allah, His angels, His messengers, the Day of Judgement, and divine decree), as well as 5 pillars of external worship (Testimony of Faith, Daily Prayers, Paying Alms-tax, Fasting Ramadan, and Pilgrimage to Mecca).
          <br />
          <br />
          This is the essence of Islam. When practiced, Islam fulfils the spiritual, physical, psychological, and social needs of all people.
          <br />
          <br />
          <q>
            &quot;Whoever does righteousness, male or female, and is a believer - We will surely cause him to live a good life, and We will surely give them their rewards according to the best of what they used to do&quot; - Quran 16:97
          </q> 

          <br />
          <br />
          Visit <a href="https://masjidquba.ca/about-islam/" className="text-blue-500 underline">Masjid Quba&apos;s website</a> for an in-depth dive in several core aspects of Islam, and use the 
          <a href="https://msauofa.ca/dawah" className="text-blue-500 underline"> Dawah Contact Form</a> to contact the MSA with your questions about Islam.
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
          <b>Muhammad Tim Humble:</b> Muhammad Tim Humble became Muslim at the age of 14. He was accepted to study at the Islamic University of Madeenah in 2004, and graduated from the Faculty of Hadeeth and Islamic Studies in 2011. He has been involved in teaching and da&apos;wah work for several years, and currently resides in Newcastle-upon-Tyne.
          <br /><br />
          <b>Way of Life SQ:</b> Way of Life SQ is a teacher and Pakistani-American citizen who spreads the message of Islam through social media.
          <br /><br />
          <b>Navaid Aziz:</b> Navaid Aziz is a Canadian Muslim public figure with a diverse academic and social background. He was raised in Montreal, Quebec where he completed a diplome d’etudes collegiales in Social Sciences from Champlain College. He then proceeded to the Islamic University of Madinah, where he completed an Associate’s Degree in the Arabic Language and a Bachelors in Islamic Law in 2008. In 2019 Navaid attained a certificate in Public Relations and Communications Management from Mount Royal University.


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
