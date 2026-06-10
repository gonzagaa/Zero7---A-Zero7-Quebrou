/* =========================================================
   #tarja-oferta — animação 2 fases (GSAP) + countdown
   Vencimento: 15/06/2026 23:59:59 (horário local)
   ========================================================= */
(function () {
  // Mês é 0-indexed -> 5 = Junho
  var TARGET_DATE = new Date(2026, 5, 15, 23, 59, 59).getTime();

  function init() {
    var tarja = document.getElementById('tarja-oferta');
    var timerEl = document.getElementById('tarja-timer');
    var overlay = document.getElementById('tarja-overlay');
    if (!tarja || !timerEl) return;

    /* ---------- Countdown ---------- */
    var intervalId = null;

    function render() {
      var now = Date.now();
      var diff = TARGET_DATE - now;

      if (diff <= 0) {
        timerEl.textContent = '0d 0h 0m 0s';
        if (intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
        return;
      }

      var dayMs = 1000 * 60 * 60 * 24;
      var hourMs = 1000 * 60 * 60;
      var minMs = 1000 * 60;

      var d = Math.floor(diff / dayMs);
      diff -= d * dayMs;
      var h = Math.floor(diff / hourMs);
      diff -= h * hourMs;
      var m = Math.floor(diff / minMs);
      diff -= m * minMs;
      var s = Math.floor(diff / 1000);

      timerEl.textContent = d + 'd ' + h + 'h ' + m + 'm ' + s + 's';
    }

    render();
    intervalId = setInterval(render, 1000);

    /* ---------- Animação GSAP (2 fases) ---------- */
    if (typeof gsap === 'undefined') {
      // fallback: garante que a tarja apareça mesmo sem GSAP
      tarja.style.opacity = '1';
      tarja.style.transform = 'translate(-50%, -50%)';
      return;
    }

    // Estado inicial: centro da viewport, escala maior, invisível
    gsap.set(tarja, {
      xPercent: -50,
      yPercent: -50,
      scale: 1.15,
      opacity: 0
    });
    if (overlay) gsap.set(overlay, { opacity: 0 });

    var tl = gsap.timeline();

    // Fase 1 — selo central (entra e respira) + overlay fade in
    tl.to(tarja, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: 'power3.out'
    });

    if (overlay) {
      tl.to(overlay, {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out'
      }, '<');
    }

    // Pausa no estado central (segura o selo um pouco mais antes de subir)
    tl.to({}, { duration: 1.4 })
      // Fase 2 — viaja pro topo e vira faixa fina.
      // A classe .is-pinned é adicionada NO INÍCIO desta fase pra que
      // o flip de layout (centro→space-between) morfe junto com o movimento,
      // suavizado pelas transitions CSS no mobile.
      .add(function () {
        tarja.classList.add('is-pinned');
      }, '>')
      .to(tarja, {
        top: '12px',
        left: '12px',
        xPercent: 0,
        yPercent: 0,
        width: 'calc(100vw - 24px)',
        padding: '0.7rem 1.2rem',
        borderRadius: '12px',
        duration: 0.7,
        ease: 'power4.inOut'
      }, '<');

    // Overlay some junto com a viagem pro topo
    if (overlay) {
      tl.to(overlay, {
        opacity: 0,
        duration: 0.7,
        ease: 'power4.inOut'
      }, '<');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
