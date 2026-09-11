/**
 * Vercel Serverless Function — /api/contact
 *
 * Receives { name, email, message } from the Contact form,
 * validates the input, then sends a formatted email to the
 * site owner via Resend (https://resend.com).
 *
 * Environment variable required:
 *   RESEND_API_KEY   — your Resend API key (starts with "re_")
 *
 * The key is ONLY available server-side; it is never sent to the browser.
 */

export const config = { runtime: 'edge' }   // Vercel Edge Runtime — fast, global

const OWNER_EMAIL    = 'ommsahoo8847@gmail.com'
const FROM_ADDRESS   = 'Apex Automotive Contact <onboarding@resend.dev>'
const RESEND_API_URL = 'https://api.resend.com/emails'

// ─── Helpers ────────────────────────────────────────────────────────────────

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/\n/g, '<br>')
}

function buildHtml({ name, email, message, timestamp, pageUrl }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>New Contact Form Submission</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0c;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0c;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0"
               style="background:#121216;border-radius:12px;border:1px solid #26262e;overflow:hidden;max-width:600px;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#6366f1,#8b5cf6);padding:28px 32px;">
              <p style="margin:0;font-size:11px;font-family:'Courier New',monospace;
                         letter-spacing:0.1em;color:rgba(255,255,255,0.7);text-transform:uppercase;">
                Apex Automotive · Contact Form
              </p>
              <h1 style="margin:8px 0 0;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.02em;">
                📩 New Message from ${escapeHtml(name)}
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">

              <!-- Details table -->
              <table width="100%" cellpadding="0" cellspacing="0"
                     style="border-collapse:collapse;margin-bottom:24px;">

                <!-- Name -->
                <tr>
                  <td style="padding:14px 16px;border:1px solid #26262e;border-radius:6px 6px 0 0;
                              background:#1a1a22;width:140px;vertical-align:top;">
                    <p style="margin:0;font-size:10px;font-family:'Courier New',monospace;
                               letter-spacing:0.08em;color:#8e8e9f;text-transform:uppercase;">
                      Sender Name
                    </p>
                  </td>
                  <td style="padding:14px 16px;border:1px solid #26262e;border-top-right-radius:6px;
                              background:#0f0f14;vertical-align:top;">
                    <p style="margin:0;font-size:15px;font-weight:600;color:#e2e2e8;">
                      ${escapeHtml(name)}
                    </p>
                  </td>
                </tr>

                <!-- Email -->
                <tr>
                  <td style="padding:14px 16px;border:1px solid #26262e;border-top:none;
                              background:#1a1a22;vertical-align:top;">
                    <p style="margin:0;font-size:10px;font-family:'Courier New',monospace;
                               letter-spacing:0.08em;color:#8e8e9f;text-transform:uppercase;">
                      Email
                    </p>
                  </td>
                  <td style="padding:14px 16px;border:1px solid #26262e;border-top:none;
                              background:#0f0f14;vertical-align:top;">
                    <a href="mailto:${escapeHtml(email)}"
                       style="color:#6366f1;text-decoration:none;font-size:15px;">
                      ${escapeHtml(email)}
                    </a>
                  </td>
                </tr>

                <!-- Message -->
                <tr>
                  <td style="padding:14px 16px;border:1px solid #26262e;border-top:none;
                              background:#1a1a22;vertical-align:top;">
                    <p style="margin:0;font-size:10px;font-family:'Courier New',monospace;
                               letter-spacing:0.08em;color:#8e8e9f;text-transform:uppercase;">
                      Message
                    </p>
                  </td>
                  <td style="padding:14px 16px;border:1px solid #26262e;border-top:none;
                              background:#0f0f14;vertical-align:top;">
                    <p style="margin:0;font-size:15px;color:#e2e2e8;line-height:1.6;">
                      ${escapeHtml(message)}
                    </p>
                  </td>
                </tr>

                <!-- Submitted At -->
                <tr>
                  <td style="padding:14px 16px;border:1px solid #26262e;border-top:none;
                              border-radius:0 0 0 6px;background:#1a1a22;vertical-align:top;">
                    <p style="margin:0;font-size:10px;font-family:'Courier New',monospace;
                               letter-spacing:0.08em;color:#8e8e9f;text-transform:uppercase;">
                      Submitted At
                    </p>
                  </td>
                  <td style="padding:14px 16px;border:1px solid #26262e;border-top:none;
                              border-radius:0 0 6px 0;background:#0f0f14;vertical-align:top;">
                    <p style="margin:0;font-size:13px;font-family:'Courier New',monospace;color:#8e8e9f;">
                      ${escapeHtml(timestamp)}
                    </p>
                  </td>
                </tr>

              </table>

              <!-- Reply CTA -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="mailto:${escapeHtml(email)}"
                       style="display:inline-block;padding:14px 32px;
                              background:linear-gradient(135deg,#6366f1,#8b5cf6);
                              color:#ffffff;font-size:14px;font-weight:600;
                              text-decoration:none;border-radius:8px;
                              letter-spacing:-0.01em;">
                      Reply to ${escapeHtml(name)} ↗
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px;border-top:1px solid #26262e;">
              <p style="margin:0;font-size:11px;font-family:'Courier New',monospace;
                         color:#4a4a58;text-align:center;letter-spacing:0.05em;">
                APEX AUTOMOTIVE · CONTACT FORM · ${escapeHtml(pageUrl)}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

// ─── Handler ─────────────────────────────────────────────────────────────────

export default async function handler(req) {
  // Only allow POST
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Parse body
  let body
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const { name, email, message, timestamp, pageUrl } = body

  // ── Validation ──────────────────────────────────────────────────────────────
  const errors = []
  if (!name   || String(name).trim().length   < 2)   errors.push('Name must be at least 2 characters.')
  if (!email  || !isValidEmail(String(email).trim())) errors.push('A valid email address is required.')
  if (!message|| String(message).trim().length < 10)  errors.push('Message must be at least 10 characters.')

  if (errors.length) {
    return new Response(JSON.stringify({ error: errors.join(' ') }), {
      status: 422,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // ── API key guard ───────────────────────────────────────────────────────────
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY environment variable is not set.')
    return new Response(JSON.stringify({ error: 'Email service is not configured. Please contact the site owner.' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // ── Send via Resend ─────────────────────────────────────────────────────────
  const emailPayload = {
    from:     FROM_ADDRESS,
    to:       [OWNER_EMAIL],
    reply_to: String(email).trim(),
    subject:  `📩 New Message from ${String(name).trim()} — Apex Automotive`,
    html:     buildHtml({
      name:      String(name).trim(),
      email:     String(email).trim(),
      message:   String(message).trim(),
      timestamp: timestamp || new Date().toISOString(),
      pageUrl:   pageUrl   || 'apex-automotive',
    }),
  }

  try {
    const resendRes = await fetch(RESEND_API_URL, {
      method:  'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify(emailPayload),
    })

    const resendData = await resendRes.json()

    if (!resendRes.ok) {
      console.error('[contact] Resend error:', resendData)
      return new Response(JSON.stringify({ error: 'Failed to send email. Please try again later.' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ ok: true, id: resendData.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })

  } catch (err) {
    console.error('[contact] Network error reaching Resend:', err)
    return new Response(JSON.stringify({ error: 'Network error. Please try again.' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
