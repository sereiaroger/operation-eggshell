/** Nicolas nasceu em 01/09/2000 às 13h (horário de Brasília) */
const BIRTH_DATE = new Date('2000-09-01T13:00:00-03:00');

function plural(value, singular, pluralForm) {
  return value === 1 ? singular : pluralForm;
}

export function getLifetimeParts(from = new Date()) {
  let remainingMs = from.getTime() - BIRTH_DATE.getTime();
  if (remainingMs < 0) remainingMs = 0;

  const second = 1000;
  const minute = 60 * second;
  const hour = 60 * minute;
  const day = 24 * hour;
  const year = 365.2425 * day;

  const years = Math.floor(remainingMs / year);
  remainingMs -= years * year;

  const days = Math.floor(remainingMs / day);
  remainingMs -= days * day;

  const hours = Math.floor(remainingMs / hour);
  remainingMs -= hours * hour;

  const minutes = Math.floor(remainingMs / minute);
  remainingMs -= minutes * minute;

  const seconds = Math.floor(remainingMs / second);

  return { years, days, hours, minutes, seconds };
}

export function formatLifetimeParts(parts) {
  const segments = [
    `${parts.years} ${plural(parts.years, 'ano', 'anos')}`,
    `${parts.days} ${plural(parts.days, 'dia', 'dias')}`,
    `${parts.hours} ${plural(parts.hours, 'hora', 'horas')}`,
    `${parts.minutes} min`,
    `${parts.seconds} seg`,
  ];

  return segments.join(' · ');
}

export function initLifetimeCounter() {
  const display = document.getElementById('lifetime-counter');
  if (!display) return;

  const tick = () => {
    display.textContent = formatLifetimeParts(getLifetimeParts());
  };

  tick();
  window.setInterval(tick, 1000);
}

export function animateCounter(element, target, duration = 1000) {
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.floor(start + (target - start) * progress);
    element.textContent = value;
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}
