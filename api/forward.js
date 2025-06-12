export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const webhook = req.query.webhook;
  if (!webhook) {
    return res.status(400).json({ error: 'Missing webhook parameter' });
  }

  try {
    const response = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    if (response.ok) {
      return res.status(200).json({ status: 'success' });
    } else {
      return res.status(response.status).json({ error: 'Webhook error' });
    }
  } catch (e) {
    return res.status(500).json({ error: 'Internal error', details: e.message });
  }
}
