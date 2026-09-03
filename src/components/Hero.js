import { initLifetimeCounter } from '../utils/counter.js';

export function renderHero() {
  return `
    <section class="section hero reveal" id="hero" aria-labelledby="hero-title">
      <div class="container">
        <h1 class="hero__title" id="hero-title">
          🎉 FELIZ ANIVERSÁRIO,<br>
          <span class="hero__name">NICOLAS!</span> 🎂
        </h1>
        <p class="hero__subtitle">26 anos desbloqueados.<br>E aparentemente ninguém conseguiu impedir.</p>

        <div class="lifetime-counter card" aria-live="polite" aria-atomic="true">
          <p class="lifetime-counter__label">⏱️ TEMPO DE EXISTÊNCIA OFICIAL</p>
          <p class="lifetime-counter__birth">Desde 01/09/2000 às 13h (horário de Brasília)</p>
          <p class="lifetime-counter__value" id="lifetime-counter">calculando...</p>
          <p class="lifetime-counter__note">* Contagem em tempo real. Impossível pausar.</p>
        </div>
      </div>
    </section>
  `;
}

export function initHero() {
  initLifetimeCounter();
}
