import { renderIntro, initIntro } from './components/Intro.js';
import { renderHero, initHero } from './components/Hero.js';
import { renderPoster, initPoster } from './components/Poster.js';
import { renderStats } from './components/Stats.js';
import { renderDocumentary, initDocumentary } from './components/Documentary.js';
import { renderMedicalReport, initMedicalReport } from './components/MedicalReport.js';
import { renderInviteHistory, initAttendanceBar } from './components/InviteHistory.js';
import { renderAchievements, initAchievements } from './components/Achievements.js';
import { renderFriendsMessage } from './components/FriendsMessage.js';
import { renderFinalSection, initFinalSection } from './components/FinalSection.js';
import { renderEasterEggs, initEasterEggs } from './components/EasterEggs.js';
import { initScrollReveal } from './utils/animations.js';
import { launchConfetti } from './utils/confetti.js';

export const state = {
  introCompleted: false,
  medicalReportOpen: false,
  secretClickCount: 0,
  secretUnlocked: false,
  videoPlayed: false,
  achievementClicks: 0,
};

export function initApp() {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    ${renderIntro()}
    <main class="main-content" id="main-content">
      ${renderHero()}
      ${renderPoster()}
      ${renderStats()}
      ${renderDocumentary()}
      ${renderMedicalReport()}
      ${renderInviteHistory()}
      ${renderAchievements()}
      ${renderFriendsMessage()}
      ${renderFinalSection()}
      ${renderEasterEggs()}
    </main>
  `;

  initIntro(handleEnter);
  initHero();
  initPoster();
  initDocumentary(() => {
    state.videoPlayed = true;
  });
  initMedicalReport();
  initAttendanceBar();
  initAchievements(() => launchConfetti(50));
  initFinalSection(() => launchConfetti(40));
  initEasterEggs();

  if (sessionStorage.getItem('introCompleted') === 'true') {
    skipIntro();
  }
}

function handleEnter() {
  state.introCompleted = true;
  sessionStorage.setItem('introCompleted', 'true');
  document.body.classList.add('intro-completed');
  document.title = 'Feliz Aniversário, Nicolas! 🎂';
  window.scrollTo({ top: 0, behavior: 'auto' });
  launchConfetti(35);
  setTimeout(() => initScrollReveal(), 100);
}

function skipIntro() {
  state.introCompleted = true;
  document.body.classList.add('intro-completed');
  document.title = 'Feliz Aniversário, Nicolas! 🎂';
  initScrollReveal();
}
