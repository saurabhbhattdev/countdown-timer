const heading = document.getElementById("heading");
const eventInput = document.getElementById("event-name-input");
const dateInput = document.getElementById("datetime-picker");
const message = document.getElementById("message");
const eventDisplay = document.getElementById("event-name-display");
const themeToggle = document.getElementById("theme-toggle");
let interval;

// Typewriter effect on heading
let title = "🔥 Countdown Timer ";
let i = 0;
function typeWriter() {
  if (i < title.length) {
    heading.innerHTML += title.charAt(i);
    i++;
    setTimeout(typeWriter, 80);
  }
}
typeWriter();

// Countdown logic
document.getElementById("start-btn").addEventListener("click", () => {
  const eventName = eventInput.value.trim() || "Your Event";
  const targetDate = new Date(dateInput.value).getTime();
  if (!targetDate || isNaN(targetDate)) {
    alert("⚠️ Please select a valid date.");
    return;
  }

  clearInterval(interval);
  eventDisplay.textContent = `⏱️ Countdown to: ${eventName}`;
  message.textContent = "";

  interval = setInterval(() => {
    const now = new Date().getTime();
    const gap = targetDate - now;

    if (gap <= 0) {
      clearInterval(interval);
      updateTimer(0, 0, 0, 0);
      message.textContent = "🎉 Countdown Complete!";
      message.classList.add("blinking");
      return;
    }

    const d = Math.floor(gap / (1000 * 60 * 60 * 24));
    const h = Math.floor((gap / (1000 * 60 * 60)) % 24);
    const m = Math.floor((gap / (1000 * 60)) % 60);
    const s = Math.floor((gap / 1000) % 60);

    updateTimer(d, h, m, s);
  }, 1000);
});

// Update time on screen
function updateTimer(d, h, m, s) {
  document.getElementById("days").innerText = String(d).padStart(2, "0");
  document.getElementById("hours").innerText = String(h).padStart(2, "0");
  document.getElementById("minutes").innerText = String(m).padStart(2, "0");
  document.getElementById("seconds").innerText = String(s).padStart(2, "0");
}

// Reset everything
document.getElementById("reset-btn").addEventListener("click", () => {
  clearInterval(interval);
  dateInput.value = "";
  eventInput.value = "";
  eventDisplay.innerText = "";
  message.innerText = "";
  message.classList.remove("blinking");
  updateTimer(0, 0, 0, 0);
});

// Theme toggle with variants
const themes = ["cream", "frosted"];
let themeIndex = 0;

themeToggle.addEventListener("click", () => {
  document.body.classList.remove("cream", "frosted");
  themeIndex = (themeIndex + 1) % themes.length;
  document.body.classList.add("light-mode", themes[themeIndex]);
});

