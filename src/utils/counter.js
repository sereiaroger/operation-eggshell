/** Fuso: America/Sao_Paulo (horário de Brasília) */
const TIME_ZONE = 'America/Sao_Paulo';
const BIRTH = { year: 2000, month: 9, day: 1, hour: 13, minute: 0, second: 0 };

function pad(value) {
  return String(value).padStart(2, '0');
}

function getBrasiliaParts(date) {
  const formatted = new Intl.DateTimeFormat('en-US', {
    timeZone: TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);

  const parts = Object.fromEntries(
    formatted.filter((part) => part.type !== 'literal').map((part) => [part.type, Number(part.value)])
  );

  return {
    year: parts.year,
    month: parts.month,
    day: parts.day,
    hour: parts.hour,
    minute: parts.minute,
    second: parts.second,
  };
}

function brasiliaToDate({ year, month, day, hour, minute, second }) {
  return new Date(
    `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}:${pad(second)}-03:00`
  );
}

function hasPassedAnniversary(now) {
  if (now.month !== BIRTH.month) return now.month > BIRTH.month;
  if (now.day !== BIRTH.day) return now.day > BIRTH.day;
  if (now.hour !== BIRTH.hour) return now.hour > BIRTH.hour;
  if (now.minute !== BIRTH.minute) return now.minute > BIRTH.minute;
  return now.second >= BIRTH.second;
}

function plural(value, singular, pluralForm) {
  return value === 1 ? singular : pluralForm;
}

export function getLifetimeParts(from = new Date()) {
  const now = getBrasiliaParts(from);
  let years = now.year - BIRTH.year;
  if (!hasPassedAnniversary(now)) years -= 1;
  if (years < 0) years = 0;

  const lastBirthday = brasiliaToDate({
    year: BIRTH.year + years,
    month: BIRTH.month,
    day: BIRTH.day,
    hour: BIRTH.hour,
    minute: BIRTH.minute,
    second: BIRTH.second,
  });

  let remainingMs = from.getTime() - lastBirthday.getTime();
  if (remainingMs < 0) remainingMs = 0;

  const second = 1000;
  const minute = 60 * second;
  const hour = 60 * minute;
  const day = 24 * hour;

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
