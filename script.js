// === CONFIG: cambiá esta fecha por la que quieras (ISO 8601 local) ===
// formato ejemplo: "2025-12-31T23:59:59"
const DEFAULT_TARGET_ISO = "2025-10-10T23:00:00";

const $ = id => document.getElementById(id);
const daysEl = $("days"), hoursEl = $("hours"), minutesEl = $("minutes"), secondsEl = $("seconds");
const targetInput = $("target"), setBtn = $("setBtn"), resetBtn = $("resetBtn"), defaultDateEl = $("defaultDate");

let target = new Date(DEFAULT_TARGET_ISO);
defaultDateEl.textContent = target.toLocaleString();

function updateCountdown() {
  const now = new Date();
  const diff = target - now;
  if (diff <= 0) {
    daysEl.textContent = "0";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    clearInterval(timerId);
    return;
  }
  const sec = Math.floor(diff / 1000);
  const days = Math.floor(sec / (3600*24));
  const hours = Math.floor((sec % (3600*24)) / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const seconds = sec % 60;

  daysEl.textContent = days.toString();
  hoursEl.textContent = String(hours).padStart(2,"0");
  minutesEl.textContent = String(minutes).padStart(2,"0");
  secondsEl.textContent = String(seconds).padStart(2,"0");
}

setBtn.addEventListener("click", () => {
  const val = targetInput.value;
  if (!val) {
    alert("Seleccioná una fecha/hora válida.");
    return;
  }
  // datetime-local -> "YYYY-MM-DDTHH:MM"
  target = new Date(val);
  defaultDateEl.textContent = target.toLocaleString();
  // reinicia
  updateCountdown();
});

resetBtn.addEventListener("click", () => {
  target = new Date(DEFAULT_TARGET_ISO);
  targetInput.value = "";
  defaultDateEl.textContent = target.toLocaleString();
  updateCountdown();
});

// inicia la actualización cada 1s
updateCountdown();
let timerId = setInterval(updateCountdown, 1000);

// Si querés fijar la fecha por URL (ej: ?date=2025-12-31T23:59:59), lo detectamos:
const params = new URLSearchParams(location.search);
if (params.has("date")) {
  const d = params.get("date");
  const parsed = new Date(d);
  if (!isNaN(parsed)) {
    target = parsed;
    defaultDateEl.textContent = target.toLocaleString();
    updateCountdown();
  }
}
