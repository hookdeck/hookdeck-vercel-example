import { HookdeckClient } from "@hookdeck/sdk";

const hookdeck = new HookdeckClient({
  token: process.env.HOOKDECK_API_KEY!,
});

export async function GET() {
  const events = await hookdeck.event.list();

  return Response.json(events.models);
}
