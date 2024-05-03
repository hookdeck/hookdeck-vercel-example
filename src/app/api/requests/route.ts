import { HookdeckClient } from "@hookdeck/sdk";

const hookdeck = new HookdeckClient({
  token: process.env.HOOKDECK_API_KEY!,
});

export async function GET() {
  const requests = await hookdeck.request.list();

  return Response.json(requests.models);
}
