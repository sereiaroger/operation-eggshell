export function renderAchievements() {
  const achievements = [
    { icon: '🎂', title: 'SOBREVIVEU AOS 26', desc: 'Chegou até aqui sem patch de emergência.' },
    { icon: '📱', title: 'IGNOROU 847 CONVITES', desc: 'Persistência admirável.' },
    { icon: '🗣️', title: 'PROMETEU "VOU DESSA VEZ"', desc: 'Uma habilidade lendária.' },
    { icon: '🍃', title: 'VEGAN MODE', desc: '???' },
    { icon: '👥', title: 'CONTINUA AMIGO DESSE POVO ESQUISITO', desc: 'Achievement raro.' },
    { icon: '🔒', title: '???', desc: 'Ainda bloqueada.', locked: true },
  ];

  const cards = achievements
    .map(
      (a, i) => `
      <div class="achievement-card ${a.locked ? 'achievement-card--locked' : ''}" 
           ${a.locked ? `id="secret-achievement" data-index="${i}"` : ''}>
        <span class="achievement-card__icon">${a.icon}</span>
        <span class="achievement-card__title">${a.title}</span>
        <span class="achievement-card__desc">${a.desc}</span>
      </div>
    `
    )
    .join('');

  return `
    <section class="section achievements reveal" id="achievements" aria-labelledby="achievements-title">
      <div class="container">
        <h2 class="section-title" id="achievements-title">🏆 CONQUISTAS DESBLOQUEADAS</h2>
        <p class="section-subtitle">Nem todo mundo chegaria até aqui.</p>
        <div class="achievement-grid">${cards}</div>
        <p class="achievement-toast" id="achievement-toast" hidden aria-live="polite"></p>
      </div>
    </section>
  `;
}

export function initAchievements(onUnlock) {
  const secret = document.getElementById('secret-achievement');
  const toast = document.getElementById('achievement-toast');
  if (!secret || !toast) return;

  let clicks = parseInt(sessionStorage.getItem('achievementClicks') || '0', 10);
  let unlocked = sessionStorage.getItem('achievementUnlocked') === 'true';

  if (unlocked) {
    unlockAchievement(secret, toast);
    return;
  }

  secret.addEventListener('click', () => {
    clicks++;
    sessionStorage.setItem('achievementClicks', String(clicks));

    if (clicks >= 5) {
      unlocked = true;
      sessionStorage.setItem('achievementUnlocked', 'true');
      unlockAchievement(secret, toast);
      onUnlock?.();
      return;
    }

    let message = '';
    if (clicks === 1) {
      message = '🔒 CONQUISTA BLOQUEADA — Você ainda não fez o necessário.';
    } else if (clicks === 3) {
      message = 'VOCÊ É INSISTENTE, HEIN?';
    }

    if (message) {
      toast.textContent = message;
      toast.hidden = false;
      setTimeout(() => {
        toast.hidden = true;
      }, 2500);
    }
  });
}

function unlockAchievement(card, toast) {
  card.classList.remove('achievement-card--locked');
  card.classList.add('achievement-card--unlocked');
  card.querySelector('.achievement-card__icon').textContent = '🏆';
  card.querySelector('.achievement-card__title').textContent = 'VOCÊ REALMENTE CLICOU NISSO';
  card.querySelector('.achievement-card__desc').textContent =
    'Parabéns. Você desbloqueou absolutamente nada.';
  toast.textContent = '🏆 Achievement desbloqueada (ou não).';
  toast.hidden = false;
  setTimeout(() => {
    toast.hidden = true;
  }, 3000);
}
