import Link from 'next/link';

export default function EventCard({
  name,
  date,
  time,
  location,
  rsvpLink,
}: {
  name: string;
  date: string;
  time: string;
  location: string;
  rsvpLink: string;
}) {
  return (
    <div className="p-4 border rounded shadow-md hover:shadow-lg transition">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p>Date: {date}</p>
      <p>Time: {time}</p>
      <p>Location: {location}</p>
      <Link href={rsvpLink}>
        <button className="mt-3 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          RSVP
        </button>
      </Link>
    </div>
  );
}
