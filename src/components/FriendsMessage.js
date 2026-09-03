export function renderFriendsMessage() {
  const friends = [
    { name: 'Felipe', color: '#E85F5F', textColor: '#194F69', rotate: '-3deg' },
    { name: 'Matheus', color: '#222222', textColor: '#FFFFFF', rotate: '2deg' },
    { name: 'Dani', color: '#F2B632', textColor: '#194F69', rotate: '-2deg' },
    { name: 'Stela', color: '#194F69', textColor: '#FFFFFF', rotate: '3deg' },
    { name: 'Paulina', color: '#66B447', textColor: '#194F69', rotate: '-4deg' },
    { name: 'Victor', color: '#888888', textColor: '#FFFFFF', rotate: '1deg' },
    { name: 'Iury', color: '#4CCCE2', textColor: '#194F69', rotate: '-1deg' },
    { name: 'Thiago', color: '#F2B632', textColor: '#194F69', rotate: '4deg' },
  ];

  const stickers = friends
    .map(
      (f) => `
      <span class="sticker" style="background: ${f.color}; color: ${f.textColor}; transform: rotate(${f.rotate})">
        ${f.name}
      </span>
    `
    )
    .join('');

  return `
    <section class="section friends reveal" id="friends" aria-labelledby="friends-title">
      <div class="container">
        <h2 class="section-title" id="friends-title">💌 AGORA FALANDO SÉRIO...</h2>
        <div class="friends__message card">
          <p>A gente pode zoar, fazer montagem, criar estatística inventada e produzir vídeo completamente questionável...</p>
          <p>mas tudo isso é porque você é importante para esse povo esquisito.</p>
          <p>Que seus 26 anos sejam cheios de coisas boas, saúde, felicidade, histórias absurdas e, principalmente, muitos momentos com quem você gosta.</p>
        </div>
        <div class="sticker-grid">${stickers}</div>
        <p class="friends__footer">...e a sua namorada que foi cúmplice nessa surpresa ❤️</p>
      </div>
    </section>
  `;
}
