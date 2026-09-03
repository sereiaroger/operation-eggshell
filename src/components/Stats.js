export function renderStats() {
  const stats = [
    { value: '26', label: 'anos' },
    { value: '847', label: 'convites' },
    { value: '96,4%', label: 'chance de desculpa' },
    { value: '2,1%', label: 'presença em rolês' },
  ];

  const cards = stats
    .map(
      (s) => `
      <div class="stat-card">
        <div class="stat-card__value">${s.value}</div>
        <div class="stat-card__label">${s.label}</div>
      </div>
    `
    )
    .join('');

  return `
    <section class="section stats reveal" id="stats" aria-labelledby="stats-title">
      <div class="container">
        <h2 class="section-title" id="stats-title">📊 STATUS ATUAL</h2>
        <p class="section-subtitle">Depois de 26 anos de desenvolvimento contínuo...</p>
        <p class="stats__disclaimer">* Estatísticas 100% inventadas e aprovadas pelo comitê de zoeira.</p>
        <div class="stat-grid">${cards}</div>
      </div>
    </section>
  `;
}
