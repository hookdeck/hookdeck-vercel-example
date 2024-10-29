export async function POST(request: Request) {
  const data = { received: true };

  console.log("received", await request.json());

  return Response.json(data);
}
