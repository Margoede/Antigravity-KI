/* =============================================
   COOKIE BANNER – Gödecke Auto & Zweirad × CFMOTO · DSGVO/TTDSG
   - Opt-in only (Analyse/Marketing default OFF)
   - "Nur notwendige" gleichwertig zu "Alle akzeptieren"
   - Wiederöffnen über Footer-Link a[href="#cookies"]
   ============================================= */

(function () {
  'use strict';

  var STORAGE_KEY = 'cfmoto_cookie_consent';

  function createBanner() {
    var bannerHTML = ''
      + '<div class="cookie-overlay" id="cookie-overlay"></div>'
      + '<div class="cookie-banner" id="cookie-banner" role="dialog" aria-modal="true" aria-labelledby="cookie-title-id">'
      + '  <div class="cookie-inner">'
      + '    <div class="cookie-header">'
      + '      <span class="cookie-icon" aria-hidden="true">&#x1f36a;</span>'
      + '      <h3 class="cookie-title" id="cookie-title-id">Cookie-Einstellungen</h3>'
      + '    </div>'
      + '    <p class="cookie-text">'
      + '      Wir verwenden Cookies, um dir die bestmögliche Erfahrung auf unserer Website zu bieten. '
      + '      Notwendige Cookies sind für die Grundfunktionen erforderlich. '
      + '      Optionale Cookies (z.B. Analyse, Marketing oder eingebettete Medien) werden ausschließlich nach deiner ausdrücklichen Einwilligung gesetzt. '
      + '      Du kannst deine Einwilligung jederzeit über den Link „Cookies" im Footer widerrufen oder anpassen. '
      + '      Weitere Informationen findest du in unserer <a href="datenschutz.html">Datenschutzerklärung</a>.'
      + '    </p>'
      + '    <button type="button" class="cookie-details-toggle" id="cookie-details-toggle" aria-expanded="false" aria-controls="cookie-details">Erweiterte Einstellungen ▾</button>'
      + '    <div class="cookie-details" id="cookie-details">'
      + '      <label class="cookie-category">'
      + '        <input type="checkbox" class="cookie-checkbox" checked disabled aria-label="Notwendige Cookies (erforderlich)">'
      + '        <div class="cookie-cat-info">'
      + '          <div class="cookie-cat-name">Notwendige Cookies</div>'
      + '          <div class="cookie-cat-desc">Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht deaktiviert werden. Hierin werden z.B. deine Cookie-Einstellungen gespeichert.</div>'
      + '        </div>'
      + '        <span class="cookie-cat-required">Erforderlich</span>'
      + '      </label>'
      + '      <label class="cookie-category">'
      + '        <input type="checkbox" class="cookie-checkbox" id="cookie-analytics">'
      + '        <div class="cookie-cat-info">'
      + '          <div class="cookie-cat-name">Analyse &amp; Statistik</div>'
      + '          <div class="cookie-cat-desc">Helfen uns zu verstehen, wie Besucher die Website nutzen. Daten werden anonymisiert erhoben und erst nach deiner Einwilligung gesetzt.</div>'
      + '        </div>'
      + '      </label>'
      + '      <label class="cookie-category">'
      + '        <input type="checkbox" class="cookie-checkbox" id="cookie-marketing">'
      + '        <div class="cookie-cat-info">'
      + '          <div class="cookie-cat-name">Marketing &amp; Externe Medien</div>'
      + '          <div class="cookie-cat-desc">Werden für personalisierte Werbeinhalte und externe Medien (z.B. eingebettete Videos) verwendet. Werden erst nach deiner Einwilligung aktiviert.</div>'
      + '        </div>'
      + '      </label>'
      + '    </div>'
      + '    <div class="cookie-actions">'
      + '      <button type="button" class="cookie-btn cookie-btn-accept" id="cookie-accept">Alle akzeptieren</button>'
      + '      <button type="button" class="cookie-btn cookie-btn-reject" id="cookie-reject">Nur notwendige</button>'
      + '      <button type="button" class="cookie-btn cookie-btn-save" id="cookie-save">Auswahl speichern</button>'
      + '    </div>'
      + '  </div>'
      + '</div>';

    var container = document.createElement('div');
    container.innerHTML = bannerHTML;
    while (container.firstChild) {
      document.body.appendChild(container.firstChild);
    }

    var banner = document.getElementById('cookie-banner');
    var overlay = document.getElementById('cookie-overlay');
    var toggle = document.getElementById('cookie-details-toggle');
    var details = document.getElementById('cookie-details');
    var acceptBtn = document.getElementById('cookie-accept');
    var saveBtn = document.getElementById('cookie-save');
    var rejectBtn = document.getElementById('cookie-reject');
    var analytics = document.getElementById('cookie-analytics');
    var marketing = document.getElementById('cookie-marketing');

    toggle.addEventListener('click', function () {
      var nowOpen = !details.classList.contains('open');
      details.classList.toggle('open', nowOpen);
      toggle.setAttribute('aria-expanded', String(nowOpen));
      toggle.textContent = nowOpen
        ? 'Erweiterte Einstellungen ▴'
        : 'Erweiterte Einstellungen ▾';
    });

    function saveConsent(type, analyticsOk, marketingOk) {
      var data = {
        type: type,
        necessary: true,
        analytics: analyticsOk,
        marketing: marketingOk,
        timestamp: new Date().toISOString(),
        version: 1
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (err) {
        // localStorage gesperrt — Banner schließt trotzdem
      }
      banner.classList.add('hidden');
      overlay.classList.add('hidden');
      setTimeout(function () {
        if (banner.parentNode) banner.remove();
        if (overlay.parentNode) overlay.remove();
      }, 400);
    }

    acceptBtn.addEventListener('click', function () {
      saveConsent('all', true, true);
    });

    rejectBtn.addEventListener('click', function () {
      saveConsent('necessary', false, false);
    });

    saveBtn.addEventListener('click', function () {
      saveConsent('custom', !!analytics.checked, !!marketing.checked);
    });

    // Fokus auf das Banner setzen
    setTimeout(function () {
      acceptBtn.focus();
    }, 50);
  }

  // Beim ersten Besuch automatisch anzeigen
  if (!localStorage.getItem(STORAGE_KEY)) {
    createBanner();
  }

  // Footer-Link "Cookies" → Banner erneut öffnen
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href="#cookies"]');
    if (link) {
      e.preventDefault();
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (err) { /* ignore */ }
      var old = document.getElementById('cookie-banner');
      var oldOverlay = document.getElementById('cookie-overlay');
      if (old) old.remove();
      if (oldOverlay) oldOverlay.remove();
      createBanner();
    }
  });
})();
