export function renderMedicalReport() {
  return `
    <section class="section medical reveal" id="medical" aria-labelledby="medical-title">
      <div class="container">
        <h2 class="section-title" id="medical-title">🔬 LAUDO DE ANIVERSÁRIO</h2>
        <p class="section-subtitle">Resultado de exames altamente científicos.</p>
        <div class="medical__cta">
          <button class="btn btn-coral" id="btn-medical-open" type="button">VER LAUDO</button>
        </div>
      </div>
    </section>

    <div class="modal" id="medical-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" hidden>
      <div class="modal__backdrop" id="medical-backdrop"></div>
      <div class="modal__content card">
        <h2 class="modal__title" id="modal-title">LAUDO DE ANIVERSÁRIO — CONFIDENCIAL</h2>

        <dl class="modal__fields">
          <div class="modal__field">
            <dt>Paciente:</dt><dd>Nicolas</dd>
          </div>
          <div class="modal__field">
            <dt>Idade:</dt><dd>26 anos</dd>
          </div>
          <div class="modal__field">
            <dt>Status:</dt><dd>Em funcionamento</dd>
          </div>
          <div class="modal__field">
            <dt>Condição:</dt><dd class="modal__highlight">CRÔNICA</dd>
          </div>
          <div class="modal__field">
            <dt>Prognóstico:</dt><dd class="modal__highlight">IRREVERSÍVEL</dd>
          </div>
        </dl>

        <div class="modal__bar-group">
          <p class="modal__bar-label">Nível de perturbação:</p>
          <div class="modal__bar">█████████░ <span>91%</span></div>
        </div>

        <div class="modal__bar-group">
          <p class="modal__bar-label">Probabilidade de aceitar um convite:</p>
          <div class="modal__bar">██░░░░░░░░ <span>18%</span></div>
        </div>

        <div class="modal__bar-group">
          <p class="modal__bar-label">Probabilidade de dizer "vou ver":</p>
          <div class="modal__bar">██████████ <span>100%</span></div>
        </div>

        <p class="modal__diagnosis">DIAGNÓSTICO: MAIS VELHO.</p>
        <p class="modal__footer-text">O paciente deve ser encaminhado imediatamente para um bolo.</p>

        <button class="btn btn-primary modal__close-btn" id="btn-medical-close" type="button">
          NÃO ACEITO OS TERMOS
        </button>
      </div>
    </div>
  `;
}

export function initMedicalReport() {
  const openBtn = document.getElementById('btn-medical-open');
  const closeBtn = document.getElementById('btn-medical-close');
  const modal = document.getElementById('medical-modal');
  const backdrop = document.getElementById('medical-backdrop');

  if (!openBtn || !modal) return;

  const open = () => {
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    closeBtn?.focus();
  };

  const close = () => {
    modal.hidden = true;
    document.body.style.overflow = '';
    openBtn.focus();
  };

  openBtn.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  backdrop?.addEventListener('click', close);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) close();
  });
}
