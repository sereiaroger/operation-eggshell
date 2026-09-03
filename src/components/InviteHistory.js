export function renderInviteHistory() {
  const invites = [
    { id: '001', name: 'Churrasco', status: '❌ RECUSADO' },
    { id: '002', name: 'Board game', status: '❌ "VOU VER"' },
    { id: '003', name: 'Jantar', status: '❓ DESAPARECIDO' },
    { id: '004', name: 'Rolê aleatório às 23h', status: '❌ "TÔ CANSADO"' },
    { id: '005', name: 'Aniversário de alguém', status: '❌ "DEPOIS EU VEJO"' },
    { id: '006', name: 'Rolê na casa do tio do Felipe', status: '❌ RECUSADO' },
  ];

  const cards = invites
    .map(
      (inv) => `
      <li class="invite-card">
        <span class="invite-card__id">ROLÊ #${inv.id}</span>
        <p class="invite-card__name">${inv.name}</p>
        <p class="invite-card__status">STATUS: ${inv.status}</p>
      </li>
    `
    )
    .join('');

  return `
    <section class="section invites reveal" id="invites" aria-labelledby="invites-title">
      <div class="container">
        <h2 class="section-title" id="invites-title">🎟️ HISTÓRICO OFICIAL DE CONVITES</h2>
        <p class="section-subtitle">26 anos de promessas e eventos perdidos.</p>
        <ul class="invite-list">${cards}</ul>

        <div class="attendance reveal" id="attendance">
          <h3 class="attendance__title">TAXA HISTÓRICA DE COMPARECIMENTO</h3>
          <div class="progress-bar" id="attendance-bar" style="--progress: 21%">
            <div class="progress-bar__fill"></div>
          </div>
          <p class="attendance__text">Acima da média. Mas não muito.</p>
        </div>
      </div>
    </section>
  `;
}

export function initAttendanceBar() {
  const bar = document.getElementById('attendance-bar');
  if (!bar) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          bar.classList.add('is-visible');
          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(bar);
}
