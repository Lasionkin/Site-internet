/* Progressive enhancement: the portfolio remains usable without JavaScript. */
(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#navigation');
  menu.hidden = false;
  const closeMenu = () => { menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); };
  menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open); });
  nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); menu.focus(); } });
  const media = document.querySelector('#vision-film');
  const cinema = document.querySelector('.cinema');
  const sticky = document.querySelector('.cinema-sticky');
  const controls = document.querySelector('.film-controls');
  const play = document.querySelector('#film-toggle');
  const freeze = document.querySelector('#motion-toggle');
  const label = document.querySelector('#motion-description');
  const progress = document.querySelector('#film-progress');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const saveData = navigator.connection?.saveData === true;
  let frozen = reducedMotion.matches || saveData, manual = false, loaded = false, scheduled = false, target = 0, failed = false;
  function load() { if (loaded || failed) return; loaded = true; const source = media.querySelector('source'); source.src = source.dataset.src; media.preload = 'auto'; media.load(); }
  function seek() { if (!manual && !frozen && !media.seeking && Number.isFinite(media.duration) && Math.abs(media.currentTime - target) > .025) { try { media.currentTime = target; } catch { /* The poster remains available. */ } } }
  function update() {
    scheduled = false;
    const fraction = Math.max(0, Math.min(1, -cinema.getBoundingClientRect().top / Math.max(1, cinema.offsetHeight - sticky.offsetHeight)));
    if (!manual) progress.style.transform = `scaleX(${fraction})`;
    if (Number.isFinite(media.duration)) target = fraction * Math.max(0, media.duration - .05);
    seek();
  }
  function schedule() { if (!scheduled) { scheduled = true; requestAnimationFrame(update); } }
  function applyMode() {
    cinema.classList.toggle('scroll-ready', !frozen && !failed);
    freeze.setAttribute('aria-pressed', String(frozen));
    freeze.textContent = frozen ? 'Activer le mouvement' : 'Figer l’image';
    label.textContent = frozen ? 'Une vision. Une mission.' : 'Faites défiler pour animer l’image';
    if (!frozen) load(); schedule();
  }
  function stopManual() { media.pause(); manual = false; play.textContent = 'Lire l’animation ▷'; schedule(); }
  controls.hidden = false;
  play.addEventListener('click', async () => {
    if (manual) { stopManual(); return; }
    load(); manual = true;
    if (media.ended || media.currentTime >= media.duration - .1) media.currentTime = 0;
    try { await media.play(); play.textContent = 'Pause Ⅱ'; } catch { manual = false; play.textContent = 'Réessayer la lecture ▷'; }
  });
  freeze.addEventListener('click', () => { stopManual(); frozen = !frozen; applyMode(); });
  media.addEventListener('loadeddata', () => { media.classList.add('ready'); schedule(); });
  media.addEventListener('seeked', seek);
  media.addEventListener('ended', stopManual);
  media.addEventListener('timeupdate', () => { if (manual && media.duration) progress.style.transform = `scaleX(${media.currentTime / media.duration})`; });
  const onError = () => { failed = true; frozen = true; stopManual(); media.classList.remove('ready'); controls.hidden = true; applyMode(); };
  media.addEventListener('error', onError); media.querySelector('source').addEventListener('error', onError);
  reducedMotion.addEventListener('change', () => { stopManual(); frozen = reducedMotion.matches || saveData; applyMode(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden && manual) stopManual(); });
  window.addEventListener('scroll', schedule, { passive: true }); window.addEventListener('resize', schedule, { passive: true }); applyMode();
})();
