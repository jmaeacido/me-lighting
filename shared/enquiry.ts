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

export type EnquirySendResult = {
  ok: boolean;
  needsActivation?: boolean;
  error?: string;
};

function buildJsonPayload(fields: EnquiryFields) {
  return {
    name: fields.name,
    email: fields.email,
    project: fields.project || "Not specified",
    source: fields.source,
    message: fields.message || "No message provided.",
    _subject: `ME Lighting enquiry${fields.project ? `: ${fields.project}` : ""}`,
    _template: "table",
    _replyto: fields.email,
  };
}

export function interpret(data: { success?: boolean | string; message?: string }): "ok" | "activation" | "fail" {
  if (String(data.success) === "true") return "ok";
  if (/activat/i.test(data.message || "")) return "activation";
  return "fail";
}

export async function postToFormSubmit(
  fields: EnquiryFields,
  origin?: string | null,
): Promise<EnquirySendResult> {
  const payload = JSON.stringify(buildJsonPayload(fields));
  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  if (origin) {
    headers.Origin = origin;
    headers.Referer = origin.endsWith("/") ? origin : `${origin}/`;
  }

  const outcomes = await Promise.all(
    ENQUIRY_RECIPIENTS.map(async (recipient) => {
      const response = await fetch(`https://formsubmit.co/ajax/${recipient}`, {
        method: "POST",
        headers,
        body: payload,
      });
      const data = (await response.json().catch(() => ({}))) as {
        success?: boolean | string;
        message?: string;
      };
      return interpret(data);
    }),
  );

  if (outcomes.includes("ok")) return { ok: true };
  if (outcomes.includes("activation")) return { ok: true, needsActivation: true };
  return {
    ok: false,
    error: "Unable to send your enquiry. Please email sales@melighting.com.au.",
  };
}
