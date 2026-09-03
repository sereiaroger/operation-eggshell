const BASE = import.meta.env.BASE_URL;

export function renderPoster() {
  return `
    <section class="section poster reveal" id="poster" aria-labelledby="poster-title">
      <div class="container">
        <p class="section-title" id="poster-title">📜 DOCUMENTO OFICIAL DO ANIVERSÁRIO</p>
        <p class="section-subtitle">Produzido com carinho, Photoshop e nenhuma supervisão.</p>
        <div class="poster__frame card">
          <button class="poster__trigger" id="poster-trigger" type="button" aria-label="Ampliar cartaz de aniversário">
            <img
              src="${BASE}images/aniversario-nicolas.jpg"
              alt="Cartaz de aniversário de Nicolas aos 26 anos, com ilustrações e fotos humorísticas"
              class="poster__image"
              width="1414"
              height="2000"
            />
          </button>
          <p class="poster__caption">"essa obra fala por si só"</p>
        </div>
      </div>
    </section>

    <div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Cartaz ampliado" hidden>
      <button class="lightbox__close" id="lightbox-close" type="button" aria-label="Fechar">×</button>
      <img
        src="${BASE}images/aniversario-nicolas.jpg"
        alt="Cartaz de aniversário de Nicolas ampliado"
        class="lightbox__image"
      />
    </div>
  `;
}

export function initPoster() {
  const trigger = document.getElementById('poster-trigger');
  const lightbox = document.getElementById('lightbox');
  const closeBtn = document.getElementById('lightbox-close');

  if (!trigger || !lightbox || !closeBtn) return;

  const open = () => {
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  };

  const close = () => {
    lightbox.hidden = true;
    document.body.style.overflow = '';
    trigger.focus();
  };

  trigger.addEventListener('click', open);
  closeBtn.addEventListener('click', close);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.hidden) close();
  });
}
