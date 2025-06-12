function verify() {
  const webhook = new URLSearchParams(window.location.search).get('webhook');
  if (!webhook) {
    document.getElementById('status').textContent = "❌ Webhook URL is missing!";
    return;
  }

  const vpn = document.getElementById('vpnToggle').checked ? "yes" : "no";
  const user_hash = Math.random().toString(36).substring(2, 15);
  const payload = {
    results: {
      user_hash: user_hash,
      captcha: "ok",
      vpn: vpn
    }
  };

  document.getElementById('status').textContent = "🔄 Verifying...";

  fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
  .then(res => {
    if (res.ok) {
      document.getElementById('status').textContent = vpn === "yes"
        ? "🚨 VPN detected. Info sent to bot."
        : "✅ Verified! Info sent to bot.";
    } else {
      document.getElementById('status').textContent = "❌ Failed to contact bot.";
    }
  })
  .catch(err => {
    document.getElementById('status').textContent = "⚠️ Error: " + err;
  });
}
