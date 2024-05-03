"use client";

import { Request } from "@hookdeck/sdk/api/types";
import { useEffect, useState } from "react";

const refreshInterval = process.env.REFRESH_INTERVAL
  ? Number(process.env.REFRESH_INTERVAL)
  : 5000;

export default function EventsList() {
  const [events, setevents] = useState<Request[] | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchEvents = async () => {
    const response = await fetch("/api/events");
    const events: Request[] = await response.json();
    setLastUpdated(new Date());
    setevents(events);
  };

  useEffect(() => {
    const intervalId = setInterval(fetchEvents, refreshInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  if (events === null) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <h2 className="text-xl font-semibold">
        Events <span>({events ? events.length : 0})</span>
      </h2>
      <div className="text-sm mb-2">
        Last updated: {lastUpdated?.toLocaleTimeString()}
      </div>
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
