"use client";

import { RequestPaginatedResult, Request } from "@hookdeck/sdk/api/types";
import { useEffect, useState } from "react";

export default function RequestsList() {
  const [requests, setRequests] = useState<Request[] | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      const response = await fetch("/api/requests");
      const requests: Request[] = await response.json();
      setRequests(requests);
    };

    fetchRequests();
  }, []);

  if (requests === null) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <h2 className="mb-3 text-xl font-semibold">
        Requests <span>({requests ? requests.length : 0})</span>
      </h2>
      <ul>
        {requests.length === 0 && <li>No requests found</li>}
        {requests.map((request) => {
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
