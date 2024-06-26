import { HookdeckClient } from "@hookdeck/sdk";

export const dynamic = "force-dynamic";

const hookdeck = new HookdeckClient({
  token: process.env.HOOKDECK_API_KEY!,
});

export async function GET() {
  try {
    const events = await hookdeck.event.list();

    return Response.json(events.models);
  } catch (error) {
    console.error("Error fetching events", error);
    return Response.error();
  }
}
