import { buildEnquiryPayload, ENQUIRY_RECIPIENTS, type EnquiryFields } from "@shared/enquiry";

function readFile(input: FormData): File | null {
  const entry = input.get("plans") || input.get("hero-plans");
  return entry instanceof File && entry.size > 0 ? entry : null;
}

async function postEnquiry(url: string, payload: FormData): Promise<boolean> {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: payload,
      headers: { Accept: "application/json" },
    });
    const contentType = response.headers.get("content-type") || "";
    if (!response.ok || !contentType.includes("application/json")) return false;
    const data = (await response.json()) as { ok?: boolean; success?: boolean | string };
    return data.ok === true || String(data.success) === "true";
  } catch {
    return false;
  }
}

async function sendWithFormSubmit(fields: EnquiryFields, file: File | null) {
  const results = await Promise.all(
    ENQUIRY_RECIPIENTS.map(async (recipient) => {
      const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: buildEnquiryPayload(fields, file),
      });
      const data = (await response.json().catch(() => ({}))) as { success?: boolean | string };
      return response.ok && String(data.success) !== "false";
    }),
  );

  if (!results.some(Boolean)) {
    throw new Error("Unable to send your enquiry. Please email sales@melighting.com.au.");
  }
}

export async function submitEnquiry(form: HTMLFormElement, source: string) {
  const input = new FormData(form);
  if (String(input.get("company") || "").trim()) return;

  const fields: EnquiryFields = {
    name: String(input.get("name") || input.get("hero-name") || "").trim(),
    email: String(input.get("email") || input.get("hero-email") || "").trim(),
    project: String(input.get("project") || input.get("hero-project") || "").trim(),
    message: String(input.get("message") || "").trim(),
    source,
  };

  if (!fields.name || !fields.email) {
    throw new Error("Please provide your name and email.");
  }

  const file = readFile(input);

  if (await postEnquiry("/api/enquiry", buildEnquiryPayload(fields, file))) return;
  if (await postEnquiry("/send-enquiry.php", buildEnquiryPayload(fields, file))) return;
  await sendWithFormSubmit(fields, file);
}
