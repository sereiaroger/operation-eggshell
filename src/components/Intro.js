export function renderIntro() {
  return `
    <div class="intro-screen" id="intro-screen">
      <div class="intro-screen__content">
        <span class="badge intro-screen__badge">⚠️ DOCUMENTO CONFIDENCIAL</span>
        <h1 class="intro-screen__title">NICOLAS, VOCÊ FOI SELECIONADO.</h1>
        <p class="intro-screen__subtitle">Uma mensagem extremamente importante foi preparada para você.</p>
        <p class="intro-screen__micro">*A qualidade do conteúdo não foi garantida.</p>
        <button class="btn btn-primary intro-screen__btn" id="btn-enter" type="button">
          ENTRAR →
        </button>
      </div>
    </div>
  `;
}

export function initIntro(onEnter) {
  const btn = document.getElementById('btn-enter');
  if (!btn) return;

  btn.addEventListener('click', () => {
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => {
      onEnter();
    }, 150);
  });
}
