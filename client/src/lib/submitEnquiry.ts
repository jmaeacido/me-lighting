import {
  ENQUIRY_RECIPIENTS,
  interpret,
  postToFormSubmit,
  type EnquiryFields,
  type EnquirySendResult,
} from "@shared/enquiry";

const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024;

function readFile(input: FormData): File | null {
  const entry = input.get("plans") || input.get("hero-plans");
  return entry instanceof File && entry.size > 0 ? entry : null;
}

function buildAttachmentPayload(fields: EnquiryFields, file: File | null): FormData {
  const payload = new FormData();
  payload.append("name", fields.name);
  payload.append("email", fields.email);
  payload.append("project", fields.project || "Not specified");
  payload.append("source", fields.source);
  payload.append("message", fields.message || "No message provided.");
  payload.append("_subject", `ME Lighting enquiry${fields.project ? `: ${fields.project}` : ""}`);
  payload.append("_template", "table");
  payload.append("_replyto", fields.email);
  if (file) payload.append("attachment", file, file.name);
  return payload;
}

async function postFormDataToFormSubmit(
  fields: EnquiryFields,
  file: File | null,
): Promise<EnquirySendResult> {
  const outcomes = await Promise.all(
    ENQUIRY_RECIPIENTS.map(async (recipient) => {
      const response = await fetch(`https://formsubmit.co/ajax/${recipient}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: buildAttachmentPayload(fields, file),
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

function submitNativeWithAttachment(fields: EnquiryFields, file: File) {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = `https://formsubmit.co/${ENQUIRY_RECIPIENTS[0]}`;
  form.enctype = "multipart/form-data";
  form.style.display = "none";

  const add = (name: string, value: string) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    form.appendChild(input);
  };

  add("name", fields.name);
  add("email", fields.email);
  add("project", fields.project || "Not specified");
  add("source", fields.source);
  add("message", fields.message || "No message provided.");
  add("_subject", `ME Lighting enquiry${fields.project ? `: ${fields.project}` : ""}`);
  add("_template", "table");
  add("_replyto", fields.email);
  add("_cc", ENQUIRY_RECIPIENTS[1]);
  add("_next", `${window.location.origin}/?sent=1#contact`);

  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.name = "attachment";
  const transfer = new DataTransfer();
  transfer.items.add(file);
  fileInput.files = transfer.files;
  form.appendChild(fileInput);

  document.body.appendChild(form);
  form.submit();
}

export async function submitEnquiry(
  form: HTMLFormElement,
  source: string,
): Promise<{ needsActivation?: boolean; redirected?: boolean }> {
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

  const file = readFile(input);
  if (file && file.size > MAX_ATTACHMENT_BYTES) {
    throw new Error("Please attach a PDF or image under 5MB.");
  }

  if (file) {
    submitNativeWithAttachment(fields, file);
    return { redirected: true };
  }

  const direct = await postFormDataToFormSubmit(fields, null);

  const local = await postToFormSubmit(fields);
  if (local.ok) return { needsActivation: local.needsActivation };

  throw new Error(direct.error || "Unable to send your enquiry. Please email sales@melighting.com.au.");
}
