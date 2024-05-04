"use client";

import { Request } from "@hookdeck/sdk/api/types";
import { useEffect, useState } from "react";

const refreshInterval = process.env.REFRESH_INTERVAL
  ? Number(process.env.REFRESH_INTERVAL)
  : 5000;

export default function RequestsList() {
  const [requests, setRequests] = useState<Request[] | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchRequests = async () => {
    const response = await fetch("/api/requests");
    const requests: Request[] = await response.json();
    setLastUpdated(new Date());
    setRequests(requests);
  };

  useEffect(() => {
    const intervalId = setInterval(fetchRequests, refreshInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  if (requests === null) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <h2 className="text-xl font-semibold">
        Requests <span>({requests ? requests.length : 0})</span>
      </h2>
      <div className="text-sm mb-2">
        Last updated: {lastUpdated?.toLocaleTimeString()}
      </div>
      <ul>
        {requests.length === 0 && <li>No requests found</li>}
        {requests.map((request) => {
          return (
            <li
              key={request.id}
              className="text-wrap whitespace-pre-wrap overflow-hidden mb-4 bg-slate-900"
            >
              <code>{JSON.stringify(request, null, 2)}</code>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
