import { playGlitchSound } from '../utils/audio.js';

export function renderEasterEggs() {
  return `
    <footer class="footer" id="footer">
      <p class="footer__main">Produzido com carinho por pessoas sem responsabilidade.</p>
      <p class="footer__small">© 2026 — Nicolas 26 anos edition</p>
      <p class="footer__optional">Nenhuma galinha foi consultada durante a produção.</p>
      <button class="secret-btn" id="secret-btn" type="button">não clique aqui</button>
      <p class="secret-message" id="secret-message" hidden aria-live="polite"></p>
    </footer>

    <button class="scroll-top" id="scroll-top" type="button" aria-label="Voltar ao topo" hidden>
      ↑
    </button>
  `;
}

export function initEasterEggs() {
  const secretBtn = document.getElementById('secret-btn');
  const secretMsg = document.getElementById('secret-message');
  const scrollTop = document.getElementById('scroll-top');

  let secretTriggered = sessionStorage.getItem('secretTriggered') === 'true';

  secretBtn?.addEventListener('click', () => {
    if (secretTriggered) return;
    secretTriggered = true;
    sessionStorage.setItem('secretTriggered', 'true');

    document.body.classList.add('glitch-active');
    playGlitchSound();
    spawnEmojis();

    secretMsg.hidden = false;
    secretMsg.textContent = 'EU FALEI PRA NÃO CLICAR.';

    setTimeout(() => {
      document.body.classList.remove('glitch-active');
    }, 400);

    setTimeout(() => {
      secretMsg.textContent = '...mas feliz aniversário mesmo assim ❤️';
    }, 2000);
  });

  window.addEventListener('scroll', () => {
    if (!scrollTop) return;
    if (window.scrollY > 500) {
      scrollTop.hidden = false;
    } else {
      scrollTop.hidden = true;
    }
  });

  scrollTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function spawnEmojis() {
  const emojis = ['🐔', '🎂', '🧜', '🍃', '❓', '🎉'];
  for (let i = 0; i < 8; i++) {
    const el = document.createElement('span');
    el.className = 'floating-emoji';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = `${Math.random() * 80 + 10}%`;
    el.style.top = `${Math.random() * 60 + 20}%`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1500);
  }
}
