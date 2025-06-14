// Initialize particle network
tsParticles.load("tsparticles", {
  background: { color: "transparent" },
  particles: {
    number: { 
      value: 80,
      density: { enable: true, value_area: 800 }
    },
    color: { 
      value: ["#00FFFF", "#FF00AA", "#0088FF"] 
    },
    shape: { 
      type: "circle",
      stroke: { width: 0, color: "#000000" },
      polygon: { nb_sides: 5 }
    },
    opacity: {
      value: 0.7,
      random: true,
      anim: { 
        enable: true, 
        speed: 1, 
        opacity_min: 0.1, 
        sync: false 
      }
    },
    size: {
      value: 3,
      random: true,
      anim: { 
        enable: true, 
        speed: 2, 
        size_min: 0.1, 
        sync: false 
      }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: { 
        enable: true, 
        rotateX: 600, 
        rotateY: 1200 
      }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" },
      resize: true
    }
  },
  retina_detect: true
});

// Button hover effect
document.querySelector('button').addEventListener('mousemove', (e) => {
  const rect = e.target.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  e.target.querySelector('.btn-pulse').style.transform = `
    translate(${x - 50}px, ${y - 50}px)
  `;
});

// Audio
const successAudio = new Audio("assets/success.mp3");
successAudio.playbackRate = 1.2;

// Verification function
function verify() {
  const webhook = new URLSearchParams(window.location.search).get('webhook');
  if (!webhook) {
    showStatus("❌ System error: Missing webhook", "error");
    return;
  }

  showStatus("🌀 Initializing verification...", "processing");
  createRippleEffect();

  const payload = {
    results: {
      user_hash: Math.random().toString(36).substring(2, 15) + Date.now(),
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
    if (data?.ok) {
      successAudio.play();
      showStatus("✅ ACCESS GRANTED", "success");
      triggerConfetti();
      
      setTimeout(() => {
        if (window.Telegram?.WebApp?.close) {
          Telegram.WebApp.close();
        }
      }, 2000);
    } else {
      throw new Error(data?.description || "Verification rejected");
    }
  })
  .catch(err => {
    showStatus(`❌ ${err.message}`, "error");
    createErrorParticles();
  });
}

// Visual effects
function createRippleEffect() {
  const ripple = document.createElement('div');
  ripple.style.cssText = `
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 5px;
    background: rgba(0, 200, 255, 0.6);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    animation: ripple 1.5s linear forwards;
  `;
  
  document.body.appendChild(ripple);
  setTimeout(() => ripple.remove(), 1500);
}

function triggerConfetti() {
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.style.cssText = `
      position: fixed;
      width: 10px;
      height: 10px;
      background: ${['#00FFFF', '#FF00AA', '#0088FF'][Math.floor(Math.random() * 3)]};
      top: 50%;
      left: 50%;
      opacity: 0;
      pointer-events: none;
      animation: 
        confetti-fade 2s ease-out forwards,
        confetti-move-${Math.ceil(Math.random() * 4)} 1.5s ease-out forwards;
    `;
    
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 2000);
  }
}

function showStatus(text, type) {
  const status = document.getElementById('status');
  status.textContent = text;
  status.className = type;
  
  if (type === "error") {
    status.style.animation = "shake 0.5s linear";
    setTimeout(() => status.style.animation = "", 500);
  }
}

function toggleTheme() {
  document.body.classList.toggle('light');
  document.body.style.transition = "background 1s ease, color 1s ease";
  
  if (document.body.classList.contains('light')) {
    document.documentElement.style.setProperty('--primary-glow', '#0066ff');
    document.documentElement.style.setProperty('--secondary-glow', '#ff0066');
  } else {
    document.documentElement.style.setProperty('--primary-glow', '#0088ff');
    document.documentElement.style.setProperty('--secondary-glow', '#ff00aa');
  }
}

// Add confetti animations
for (let i = 1; i <= 4; i++) {
  const styleSheet = document.styleSheets[0];
  styleSheet.insertRule(`
    @keyframes confetti-move-${i} {
      0% { transform: translate(0, 0) rotate(0); opacity: 1; }
      100% { transform: translate(${Math.random() * 400 - 200}px, ${Math.random() * 400 - 200}px) rotate(${Math.random() * 360}deg); opacity: 0; }
    }
  `, styleSheet.cssRules.length);
}
