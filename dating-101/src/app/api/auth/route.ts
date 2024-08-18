import { authorize } from "@/app/actions/action";

export async function POST(req: Request) {
  authorize();

  return new Response(null, {
    status: 204,
  });
}
