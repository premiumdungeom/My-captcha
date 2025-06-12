// Inject particles.js
const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/tsparticles@2.11.1/tsparticles.bundle.min.js';
script.onload = () => {
  tsParticles.load("tsparticles", {
    background: { color: "#1f1c2c" },
    particles: {
      number: { value: 40 },
      size: { value: 3 },
      move: { enable: true, speed: 1 },
      opacity: { value: 0.6 },
      shape: { type: "circle" },
      color: { value: "#ffffff" },
      links: { enable: true, color: "#ffffff", distance: 100 }
    }
  });
};
document.head.appendChild(script);

const successAudio = new Audio("assets/success.mp3");

function verify() {
  const webhook = new URLSearchParams(window.location.search).get('webhook');
  if (!webhook) {
    document.getElementById('status').textContent = "❌ Webhook URL is missing!";
    return;
  }

  const user_hash = Math.random().toString(36).substring(2, 15);
  const payload = {
    results: {
      user_hash: user_hash,
      captcha: "ok",
      vpn: "no"
    }
  };

  document.getElementById('status').textContent = "🔄 Verifying...";

  fetch(`/api/forward?webhook=${encodeURIComponent(webhook)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
  .then(res => {
    if (res.ok) {
      successAudio.play();
      document.getElementById('status').textContent = "✅ Verified! Info sent to bot.";
    } else {
      document.getElementById('status').textContent = "❌ Bot responded with error.";
    }
  })
  .catch(err => {
    document.getElementById('status').textContent = "⚠️ Error: " + err;
  });
}

function toggleTheme() {
  document.body.classList.toggle('light');
}
