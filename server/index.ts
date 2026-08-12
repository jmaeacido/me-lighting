import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { forwardEnquiryToInboxes } from "../shared/enquiry";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.post("/api/enquiry", (req, res) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk) => {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    });
    req.on("end", async () => {
      try {
        const buffer = Buffer.concat(chunks);
        const body = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
        const originHeader = req.headers.origin;
        const origin = Array.isArray(originHeader) ? originHeader[0] : originHeader;
        const ok = await forwardEnquiryToInboxes(
          body,
          req.headers["content-type"] || "multipart/form-data",
          origin,
        );
        res.status(ok ? 200 : 502).json({ ok });
      } catch (error) {
        res.status(500).json({ ok: false, error: String(error) });
      }
    });
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
