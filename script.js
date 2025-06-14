// Initialize particles
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

const successAudio = new Audio("assets/success.mp3");

function verify() {
  const webhook = new URLSearchParams(window.location.search).get('webhook');
  if (!webhook) {
    document.getElementById('status').textContent = "❌ Verification system error!";
    return;
  }

  document.getElementById('status').textContent = "🔄 Verifying...";

  const payload = {
    results: {
      user_hash: Math.random().toString(36).substring(2, 15),
      captcha: "ok",
      vpn: "no"
    }
  };

  fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
  .then(response => response.json())
  .then(data => {
    if (data && data.ok) {
      successAudio.play();
      document.getElementById('status').textContent = "✅ Verification complete!";
      
      // Close Telegram WebApp if running inside Telegram
      if (window.Telegram && window.Telegram.WebApp) {
        setTimeout(() => Telegram.WebApp.close(), 1500);
      }
    } else {
      throw new Error(data?.description || "Verification rejected");
    }
  })
  .catch(error => {
    document.getElementById('status').textContent = `❌ Error: ${error.message}`;
  });
}

function toggleTheme() {
  document.body.classList.toggle('light');
}
