import Image from "next/image";

/** @type {import("@hookdeck/vercel").HookdeckConfig} */
import hookdeckConfig from "../../hookdeck.config";

import { HookdeckClient } from "@hookdeck/sdk";
import RequestsList from "./components/RequestsList";
import EventsList from "./components/EventsList";

const hookdeck = new HookdeckClient({
  token: process.env.HOOKDECK_API_KEY!,
});

export default async function Home() {
  const sources = await hookdeck.source.list();

  return (
    <main className="flex min-h-screen flex-col content-center items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl flex flex-col lg:flex-row mb-14 space-x-4 justify-center space-y-4 lg:space-y-0">
        <Image
          src="/hookdeck.svg"
          alt="Hookdeck Logo"
          className="dark:invert"
          width={187}
          height={30}
          priority
        />
        <Image
          src="/vercel.svg"
          alt="Vercel Logo"
          className="dark:invert"
          width={150}
          height={30}
          priority
        />
        <div className="text-3xl">Middleware</div>
      </div>

      <div className="grid lg:w-full lg:max-w-5xl lg:grid-cols-2 space-x-4 mb-10">
        <section>
          <h2 className="mb-3 text-xl font-semibold">
            Middleware Route Matches{" "}
            <span>({Object.keys(hookdeckConfig.match).length})</span>
          </h2>
          <ul>
            {hookdeckConfig.vercel_url && <li>{hookdeckConfig.vercel_url}</li>}
            <li>
              <ul>
                {Object.keys(hookdeckConfig.match).map((match) => {
                  return (
                    <li key={match}>
                      <code>{match}</code>
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>
        </section>
        <section>
          <h2 className="mb-3 text-xl font-semibold">
            Sources <span>({sources.count})</span>
          </h2>
          <ul>
            {sources.models?.map((source) => {
              return (
                <li key={source.id} className="flex flex-col">
                  <span className="font-bold">{source.name}</span>{" "}
                  <span>{source.id}</span> <code>{source.url}</code>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
      <div className="grid lg:w-full lg:max-w-5xl lg:grid-cols-2 space-x-4 mb-10">
        <RequestsList />
        <EventsList />
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-3 lg:text-left">
        <a
          href="https://github.com/hookdeck/hookdeck-vercel"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-lg font-semibold">
            Code{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Get the Hookdeck Vercel Middleware
          </p>
        </a>

        <a
          href="https://hookdeck.com/docs?ref=github-hookdeck-vercel-example"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-lg font-semibold">
            Hookdeck{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Read the Hookdeck documentation.
          </p>
        </a>

        <a
          href="https://vercel.com/docs/functions/edge-middleware?ref=github-hookdeck-vercel-example"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-lg font-semibold">
            Vercel{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Learn about Vercel Middleware.
          </p>
        </a>
      </div>
    </main>
  );
}
