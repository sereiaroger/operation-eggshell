const BASE = import.meta.env.BASE_URL;

export function renderDocumentary() {
  return `
    <section class="section documentary reveal" id="documentary" aria-labelledby="doc-title">
      <div class="container">
        <span class="badge documentary__badge">🎬 DOCUMENTÁRIO OFICIAL</span>
        <h2 class="section-title" id="doc-title">A origem de Nicolas</h2>
        <p class="section-subtitle">Uma produção cinematográfica inexplicável.</p>

        <div class="documentary__player" id="video-player">
          <video
            id="documentary-video"
            class="documentary__video"
            src="${BASE}videos/aniversario.mp4"
            poster="${BASE}images/poster-video.jpg"
            playsinline
            preload="metadata"
          ></video>

          <div class="documentary__overlay" id="video-overlay">
            <button class="documentary__play-btn" id="video-play" type="button" aria-label="Reproduzir documentário">
              <span class="documentary__play-icon">▶</span>
            </button>
            <p class="documentary__overlay-text">APERTAR PARA<br>TESTEMUNHAR</p>
          </div>

          <div class="documentary__progress" id="video-progress" hidden>
            <div class="documentary__progress-fill" id="video-progress-fill"></div>
          </div>
        </div>

        <div class="documentary__after" id="video-after" hidden>
          <p class="documentary__after-text">✅ Você acaba de testemunhar algo que jamais deveria ter sido produzido.</p>
          <button class="btn btn-secondary" id="video-replay" type="button">ASSISTIR NOVAMENTE ↻</button>
        </div>
      </div>
    </section>
  `;
}

export function initDocumentary(onVideoPlayed) {
  const video = document.getElementById('documentary-video');
  const overlay = document.getElementById('video-overlay');
  const playBtn = document.getElementById('video-play');
  const progress = document.getElementById('video-progress');
  const progressFill = document.getElementById('video-progress-fill');
  const after = document.getElementById('video-after');
  const replayBtn = document.getElementById('video-replay');
  const player = document.getElementById('video-player');

  if (!video || !overlay || !playBtn) return;

  const play = () => {
    video.play();
    overlay.hidden = true;
    progress.hidden = false;
  };

  const reset = () => {
    video.currentTime = 0;
    overlay.hidden = false;
    progress.hidden = true;
    after.hidden = true;
    player.hidden = false;
  };

  playBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    play();
  });

  player.addEventListener('click', () => {
    if (!overlay.hidden) return;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });

  video.addEventListener('timeupdate', () => {
    if (video.duration) {
      const pct = (video.currentTime / video.duration) * 100;
      progressFill.style.width = `${pct}%`;
    }
  });

  video.addEventListener('ended', () => {
    after.hidden = false;
    player.hidden = true;
    onVideoPlayed?.();
  });

  replayBtn?.addEventListener('click', reset);
}
