import { HookdeckClient } from "@hookdeck/sdk";

export const dynamic = "force-dynamic";

const hookdeck = new HookdeckClient({
  token: process.env.HOOKDECK_API_KEY!,
});

export async function GET() {
  try {
    const requests = await hookdeck.request.list();

    return Response.json(requests.models);
  } catch (error) {
    console.error("Error fetching requests", error);
    return Response.error();
  }
}
