import { postToFormSubmit, type EnquiryFields } from "../shared/enquiry";

export const config = { runtime: "edge" };

export default async function handler(request: Request) {
  if (request.method !== "POST") {
    return Response.json({ ok: false, error: "Method not allowed" }, { status: 405 });
  }

  let fields: EnquiryFields & { fileName?: string };
  try {
    fields = (await request.json()) as EnquiryFields & { fileName?: string };
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const result = await postToFormSubmit(
    fields,
    fields.fileName || "",
    request.headers.get("origin") || "https://me-lighting.vercel.app",
  );

  return Response.json(result, { status: result.ok ? 200 : 502 });
}
