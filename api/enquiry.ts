import { forwardEnquiryToInboxes } from "../shared/enquiry";

export const config = { runtime: "edge" };

export default async function handler(request: Request) {
  if (request.method !== "POST") {
    return Response.json({ ok: false, error: "Method not allowed" }, { status: 405 });
  }

  const body = await request.arrayBuffer();
  const ok = await forwardEnquiryToInboxes(
    body,
    request.headers.get("content-type") || "multipart/form-data",
    request.headers.get("origin"),
  );

  return Response.json({ ok }, { status: ok ? 200 : 502 });
}
