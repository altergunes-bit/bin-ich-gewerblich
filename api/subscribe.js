// api/subscribe.js — Vercel Serverless Function (Double-Opt-in via Brevo)
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const email = (body.email || '').trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email' });
    }

    const r = await fetch('https://api.brevo.com/v3/contacts/doubleOptinConfirmation', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        email,
        includeListIds: [Number(process.env.BREVO_LIST_ID)],
        templateId: Number(process.env.BREVO_DOI_TEMPLATE_ID),
        redirectionUrl: 'https://bin-ich-gewerblich.vercel.app/?confirmed=1',
      }),
    });

    if (r.ok) {
      return res.status(200).json({ ok: true });
    }
    const errText = await r.text();
    console.error('Brevo DOI error', r.status, errText);
    return res.status(502).json({ error: 'Brevo error' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Server error' });
  }
}