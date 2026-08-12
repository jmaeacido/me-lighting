import { postToFormSubmit, type EnquiryFields, type EnquirySendResult } from "@shared/enquiry";

function readFileName(input: FormData): string {
  const entry = input.get("plans") || input.get("hero-plans");
  return entry instanceof File && entry.size > 0 ? entry.name : "";
}

async function postLocalApi(fields: EnquiryFields, fileName: string): Promise<EnquirySendResult | null> {
  try {
    const response = await fetch("/api/enquiry", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...fields, fileName }),
    });
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) return null;
    return (await response.json()) as EnquirySendResult;
  } catch {
    return null;
  }
}

export async function submitEnquiry(
  form: HTMLFormElement,
  source: string,
): Promise<{ needsActivation?: boolean }> {
  const input = new FormData(form);
  if (String(input.get("company") || "").trim()) return {};

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

  const fileName = readFileName(input);

  // Browser Origin is required by FormSubmit; send from the page first.
  const direct = await postToFormSubmit(fields, fileName);
  if (direct.ok) return { needsActivation: direct.needsActivation };

  const local = await postLocalApi(fields, fileName);
  if (local?.ok) return { needsActivation: local.needsActivation };

  throw new Error(direct.error || "Unable to send your enquiry. Please email sales@melighting.com.au.");
}
