export function renderFinalSection() {
  return `
    <section class="section final reveal" id="final" aria-labelledby="final-title">
      <div class="container">
        <h2 class="final__title" id="final-title">
          🎉 FELIZ ANIVERSÁRIO,<br>NICOLAS! 🎉
        </h2>
        <p class="final__subtitle">Dos seus amigos que te chamam para os rolês que você nunca vai.</p>
        <p class="final__heart">❤️ 26 ANOS — QUE VENHAM OS PRÓXIMOS 26</p>
        <button class="btn btn-primary final__restart" id="btn-restart" type="button">
          COMEÇAR TUDO DE NOVO ↻
        </button>
      </div>
    </section>
  `;
}

export function initFinalSection(onRestart) {
  const btn = document.getElementById('btn-restart');
  btn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onRestart?.();
  });
}
