import { currentUser } from "@clerk/nextjs";
import Ably from "ably/promises";
import { NextApiRequest } from "next";

export async function GET(request: NextApiRequest) {
  const user = await currentUser();
  const client = new Ably.Realtime(process.env.ABLY_SUBSCRIBE_API_KEY);
  const tokenRequestData = await client.auth.createTokenRequest({
    clientId: user?.id,
  });
  return Response.json(tokenRequestData);
}
