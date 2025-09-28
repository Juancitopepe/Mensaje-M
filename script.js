// Fecha objetivo: 9 de octubre 2025 a las 00:00
const target = new Date("2025-10-09T20:30:00");

const $ = id => document.getElementById(id);
const daysEl = $("days"), hoursEl = $("hours"), minutesEl = $("minutes"), secondsEl = $("seconds");

function updateCountdown() {
  const now = new Date();
  const diff = target - now;

  if (diff <= 0) {
    // Cambiar interfaz a blanca
    document.body.style.background = "#fff";
    document.body.style.color = "#000";
    document.getElementById("countdown-container").innerHTML = "<h1>¡Llegó el día!</h1>";
    clearInterval(timerId);
    return;
  }

  const sec = Math.floor(diff / 1000);
  const days = Math.floor(sec / (3600*24));
  const hours = Math.floor((sec % (3600*24)) / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const seconds = sec % 60;

  daysEl.textContent = String(days).padStart(2,"0");
  hoursEl.textContent = String(hours).padStart(2,"0");
  minutesEl.textContent = String(minutes).padStart(2,"0");
  secondsEl.textContent = String(seconds).padStart(2,"0");
}

updateCountdown();
const timerId = setInterval(updateCountdown, 1000);
