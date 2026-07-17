import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.CONTACT_PORT || 8787);
const REDMAIL_API_KEY = process.env.REDMAIL_API_KEY;
const REDMAIL_TO = process.env.REDMAIL_TO || "info@mrfalconbeauty.com";
const REDMAIL_FROM = process.env.REDMAIL_FROM || "noreply@mrfalconbeauty.com";
const REDMAIL_CC = process.env.REDMAIL_CC || "";
const REDMAIL_URL = "https://redmail.e42art.com//api/v1/send";

function send(res, status, body) {
  res.writeHead(status, { "content-type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(body));
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (c) => {
      data += c;
      if (data.length > 1e6) reject(new Error("payload too large"));
    });
    req.on("end", () => {
      try { resolve(data ? JSON.parse(data) : {}); }
      catch { reject(new Error("invalid json")); }
    });
    req.on("error", reject);
  });
}

function escapeHtml(s = "") {
  return s.replace(/[&<>"']/g, (m) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]
  ));
}

const server = createServer(async (req, res) => {
  // SPA-style fallback: serve static built files for non-API GET
  if (req.method === "GET" && !req.url.startsWith("/api/")) {
    try {
      const url = new URL(req.url, `http://${req.headers.host}`);
      let p = url.pathname === "/" ? "/index.html" : url.pathname;
      const file = join(__dirname, "..", "dist", p);
      const buf = await readFile(file);
      const ext = p.split(".").pop();
      const types = { html: "text/html", css: "text/css", js: "text/javascript", json: "application/json", svg: "image/svg+xml", xml: "application/xml" };
      res.writeHead(200, { "content-type": types[ext] || "application/octet-stream" });
      res.end(buf);
    } catch {
      send(res, 404, { ok: false, error: "not found" });
    }
    return;
  }

  if (req.method !== "POST" || req.url !== "/api/contact") {
    return send(res, 404, { ok: false, error: "not found" });
  }

  try {
    const body = await readJson(req);
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !message) {
      return send(res, 400, { ok: false, error: "Eksik alanlar." });
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return send(res, 400, { ok: false, error: "Geçersiz e-posta." });
    }

    const html = `
      <div style="font-family:Inter,Arial,sans-serif;color:#0b1220">
        <h2 style="font-family:Playfair Display,serif">Yeni İletişim Formu Mesajı</h2>
        <p><strong>Ad:</strong> ${escapeHtml(name)}</p>
        <p><strong>E-posta:</strong> ${escapeHtml(email)}</p>
        <p><strong>Telefon:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Mesaj:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      </div>`;

    const payload = {
      to: REDMAIL_TO,
      cc: REDMAIL_CC ? REDMAIL_CC.split(",").map((s) => s.trim()).filter(Boolean) : [],
      reply_to: email,
      subject: `İletişim Formu: ${name}`,
      body: html,
    };

    const r = await fetch(REDMAIL_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-API-KEY": REDMAIL_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    if (!r.ok) {
      const txt = await r.text().catch(() => "");
      return send(res, 502, { ok: false, error: "E-posta gönderilemedi.", detail: txt.slice(0, 500) });
    }
    return send(res, 200, { ok: true });
  } catch (e) {
    return send(res, 500, { ok: false, error: "Sunucu hatası." });
  }
});

server.listen(PORT, () => console.log(`contact server on :${PORT}`));
