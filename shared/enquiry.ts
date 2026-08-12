export const ENQUIRY_RECIPIENTS = [
  "sales@melighting.com.au",
  "shiv@proairmarketing.com.au",
] as const;

export type EnquiryFields = {
  name: string;
  email: string;
  project: string;
  message: string;
  source: string;
};

export function buildEnquiryPayload(fields: EnquiryFields, file: File | null): FormData {
  const payload = new FormData();
  payload.append("name", fields.name);
  payload.append("email", fields.email);
  payload.append("project", fields.project || "Not specified");
  payload.append("source", fields.source);
  if (fields.message) payload.append("message", fields.message);
  payload.append("_subject", `ME Lighting enquiry${fields.project ? `: ${fields.project}` : ""}`);
  payload.append("_template", "table");
  payload.append("_captcha", "false");
  payload.append("_replyto", fields.email);
  if (file) payload.append("attachment", file, file.name);
  return payload;
}

export async function forwardEnquiryToInboxes(
  body: ArrayBuffer,
  contentType: string,
  origin?: string | null,
): Promise<boolean> {
  const referer = origin ? (origin.endsWith("/") ? origin : `${origin}/`) : "https://me-lighting.vercel.app/";
  const results = await Promise.all(
    ENQUIRY_RECIPIENTS.map(async (recipient) => {
      const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": contentType,
          Origin: origin || "https://me-lighting.vercel.app",
          Referer: referer,
        },
        body: body.slice(0),
      });
      const data = (await response.json().catch(() => ({}))) as { success?: boolean | string };
      return response.ok && String(data.success) !== "false";
    }),
  );

  return results.some(Boolean);
}
