// ===============================
// 🌸 Lógica principal de la PWA
// ===============================

AOS.init();

// ===============================
// 🔧 Registrar Service Worker
// ===============================
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js")
      .then(reg => console.log("✅ Service Worker registrado:", reg))
      .catch(err => console.error("❌ Error registrando SW:", err));
  });
}

// ===============================
// 📅 Fechas importantes
// ===============================
function getLocalDate(dateStr) {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

const startDate = getLocalDate("2024-05-24");

const milestones = [
  { name: "Primer año", date: "2025-11-02", description: "Cumplimos nuestro primer año juntos, lleno de momentos especiales 🥰" },
  { name: "Año y Mes", date: "2025-12-02", description: "Es tan increíble tenerte a mi lado y sentirme amado por ti siempre 💕" },
  { name: "Año y 2 Meses", date: "2026-01-02", description: "Tu voz, tu risa y tu amor son mis cosas favoritas 🥹" },
  { name: "Año y 3 Meses", date: "2026-02-02", description: "1 añito y 3 mesesitos de esta historia hermosa ✨📖" },
  { name: "Año y 4 Meses", date: "2026-03-02", description: "Contigo, hasta el tiempo se siente mágico 💫" },
  { name: "Año y 5 Meses", date: "2026-04-02", description: "1 año y cinco meses aprendiendo lo que significa amar 💞" },
  { name: "Año y medio", date: "2026-05-02", description: "." },
  { name: "Año y 7 Meses", date: "2026-06-02", description: "." },
  { name: "Año y 8 Meses", date: "2026-07-02", description: "." },
  { name: "Año y 9 Meses", date: "2026-08-02", description: "Nueve mesesitos de amor verdadero 💞" },
  { name: "Cumples añitos hoy", date: "2026-08-10", description: "¡Hoy cumples añitos mi amorcito! 🥺💞" },
  { name: "Año y 10 Meses", date: "2026-09-02", description: "Gracias por estar conmigo tanto tiempo ❤️" },
  { name: "Año y 11 Meses", date: "2026-10-02", description: "Ya casi cumplimos otro añito ✨❤️" },
  { name: "2 Años", date: "2026-11-02", description: "¡Celebramos 2 añitos y aún falta muchísimo más! 💖✨" }
];

// ===============================
// 📆 Cálculos de días y próximos hitos
// ===============================
function getDaysSinceStart() {
  return Math.floor((new Date() - startDate) / (1000 * 60 * 60 * 24));
}

function updateMainCounter() {
  const el = document.getElementById("main-count");
  if (el) el.textContent = getDaysSinceStart();
}

function renderMilestones() {
  const list = document.getElementById("milestones-list");
  if (!list) return;

  const now = new Date();
  let lastPast = null;
  let nextFuture = null;

  milestones.forEach(m => {
    const mDate = getLocalDate(m.date);
    if (mDate <= now) lastPast = m;
    else if (!nextFuture) nextFuture = m;
  });

  list.innerHTML = "";

  // Mostrar último hito pasado
  if (lastPast) {
    const diffDays = Math.floor((now - getLocalDate(lastPast.date)) / (1000 * 60 * 60 * 24));
    const diffText = diffDays === 0 ? "¡Hoy!" : `Hace ${diffDays} días`;

    const li = document.createElement("li");
    li.textContent = `${lastPast.name} — ${diffText}`;
    li.onclick = () => openMilestoneModal(lastPast, diffText);
    list.appendChild(li);
  }

  // Mostrar próximo hito con cuenta regresiva
  if (nextFuture) {
    const countdownEl = document.getElementById("next-countdown");

    const updateCountdown = () => {
      const diff = getLocalDate(nextFuture.date) - new Date();
      if (diff <= 0) {
        countdownEl.textContent = `¡Hoy es ${nextFuture.name}! 🎉`;
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      countdownEl.textContent = `${nextFuture.name} — faltan ${d}d ${h}h ${m}m ${s}s (${nextFuture.date})`;
    };

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }
}

// ===============================
// 🌙 Tema oscuro
// ===============================
function toggleDarkMode() {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
  updateThemeButton();
}

function updateThemeButton() {
  const icon = document.querySelector("#theme-toggle .icon");
  const label = document.querySelector("#theme-toggle .label");
  if (!icon || !label) return;
  const dark = document.body.classList.contains("dark");
  icon.textContent = dark ? "☀️" : "🌙";
  label.textContent = dark ? "Modo claro" : "Modo oscuro";
}

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") document.body.classList.add("dark");
  updateThemeButton();
  document.getElementById("theme-toggle")?.addEventListener("click", toggleDarkMode);
});

// ===============================
// 📤 Compartir
// ===============================
function shareCounter() {
  const text = `¡Llevamos ${getDaysSinceStart()} días juntos! 💖`;
  if (navigator.share) {
    navigator.share({ title: "Nuestro contador de amor", text, url: window.location.href })
      .catch(console.error);
  } else {
    alert("Copia este texto:\n" + text);
  }
}

// ===============================
// 🔊 Música
// ===============================
const sonido = new Audio("cora.mp3");
document.addEventListener("click", () => sonido.play(), { once: true });

// ===============================
// 🚀 Inicialización
// ===============================
window.addEventListener("load", () => {
  updateMainCounter();
  renderMilestones();
});
