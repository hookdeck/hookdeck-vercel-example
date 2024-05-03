"use client";

import { RequestPaginatedResult, Request } from "@hookdeck/sdk/api/types";
import { useEffect, useState } from "react";

export default function EventsList() {
  const [events, setevents] = useState<Request[] | null>(null);

  useEffect(() => {
    const fetchevents = async () => {
      const response = await fetch("/api/events");
      const events: Request[] = await response.json();
      setevents(events);
    };

    fetchevents();
  }, []);

  if (events === null) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <h2 className="mb-3 text-xl font-semibold">
        Events <span>({events ? events.length : 0})</span>
      </h2>
      <ul>
        {events.length === 0 && <li>No events found</li>}
        {events.map((request) => {
          return (
            <li
              key={request.id}
              className="text-wrap whitespace-pre-wrap overflow-hidden mb-4"
            >
              <code>{JSON.stringify(request, null, 2)}</code>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
