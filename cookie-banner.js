/* =============================================
   COOKIE BANNER – DSGVO-KONFORM
   ============================================= */

(function() {
  'use strict';

  // Banner erstellen (entweder beim ersten Besuch oder bei erneutem Öffnen)
  function createBanner() {

  // Banner HTML erstellen
  var bannerHTML = ''
    + '<div class="cookie-overlay" id="cookie-overlay"></div>'
    + '<div class="cookie-banner" id="cookie-banner">'
    + '  <div class="cookie-inner">'
    + '    <div class="cookie-header">'
    + '      <span class="cookie-icon">&#x1f36a;</span>'
    + '      <h3 class="cookie-title">Cookie-Einstellungen</h3>'
    + '    </div>'
    + '    <p class="cookie-text">'
    + '      Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten. '
    + '      Notwendige Cookies sind für die Grundfunktionen erforderlich. '
    + '      Optionale Cookies helfen uns, die Website zu verbessern und relevante Inhalte anzuzeigen. '
    + '      Weitere Informationen finden Sie in unserer <a href="datenschutz.html">Datenschutzerklärung</a>.'
    + '    </p>'
    + '    <button class="cookie-details-toggle" id="cookie-details-toggle">Erweiterte Einstellungen ▾</button>'
    + '    <div class="cookie-details" id="cookie-details">'
    + '      <div class="cookie-category">'
    + '        <input type="checkbox" class="cookie-checkbox" checked disabled>'
    + '        <div class="cookie-cat-info">'
    + '          <div class="cookie-cat-name">Notwendige Cookies</div>'
    + '          <div class="cookie-cat-desc">Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht deaktiviert werden. Sie speichern z.B. Ihre Cookie-Einstellungen.</div>'
    + '        </div>'
    + '        <span class="cookie-cat-required">Erforderlich</span>'
    + '      </div>'
    + '      <div class="cookie-category">'
    + '        <input type="checkbox" class="cookie-checkbox" id="cookie-analytics" checked>'
    + '        <div class="cookie-cat-info">'
    + '          <div class="cookie-cat-name">Analyse & Statistik</div>'
    + '          <div class="cookie-cat-desc">Diese Cookies helfen uns zu verstehen, wie Besucher unsere Website nutzen. Die Daten werden anonymisiert erhoben.</div>'
    + '        </div>'
    + '      </div>'
    + '      <div class="cookie-category">'
    + '        <input type="checkbox" class="cookie-checkbox" id="cookie-marketing" checked>'
    + '        <div class="cookie-cat-info">'
    + '          <div class="cookie-cat-name">Marketing & Externe Medien</div>'
    + '          <div class="cookie-cat-desc">Diese Cookies werden verwendet, um Ihnen relevante Werbeinhalte anzuzeigen und externe Medien (z.B. Videos) einzubetten.</div>'
    + '        </div>'
    + '      </div>'
    + '    </div>'
    + '    <div class="cookie-actions">'
    + '      <button class="cookie-btn cookie-btn-accept" id="cookie-accept">Alle akzeptieren</button>'
    + '      <button class="cookie-btn cookie-btn-save" id="cookie-save">Auswahl speichern</button>'
    + '      <button class="cookie-btn cookie-btn-reject" id="cookie-reject">Nur notwendige</button>'
    + '    </div>'
    + '  </div>'
    + '</div>';

  // Banner in DOM einfügen
  var container = document.createElement('div');
  container.innerHTML = bannerHTML;
  while (container.firstChild) {
    document.body.appendChild(container.firstChild);
  }

  // Elemente referenzieren
  var banner    = document.getElementById('cookie-banner');
  var overlay   = document.getElementById('cookie-overlay');
  var toggle    = document.getElementById('cookie-details-toggle');
  var details   = document.getElementById('cookie-details');
  var acceptBtn = document.getElementById('cookie-accept');
  var saveBtn   = document.getElementById('cookie-save');
  var rejectBtn = document.getElementById('cookie-reject');
  var analytics = document.getElementById('cookie-analytics');
  var marketing = document.getElementById('cookie-marketing');

  // Details ein-/ausklappen
  toggle.addEventListener('click', function() {
    details.classList.toggle('open');
    toggle.textContent = details.classList.contains('open')
      ? 'Erweiterte Einstellungen ▴'
      : 'Erweiterte Einstellungen ▾';
  });

  // Consent speichern und Banner schließen
  function saveConsent(type, analyticsOk, marketingOk) {
    var data = {
      type: type,
      necessary: true,
      analytics: analyticsOk,
      marketing: marketingOk,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookie_consent', JSON.stringify(data));
    banner.classList.add('hidden');
    overlay.classList.add('hidden');
    setTimeout(function() {
      banner.remove();
      overlay.remove();
    }, 400);
  }

  // Alle akzeptieren
  acceptBtn.addEventListener('click', function() {
    saveConsent('all', true, true);
  });

  // Auswahl speichern
  saveBtn.addEventListener('click', function() {
    saveConsent('custom', analytics.checked, marketing.checked);
  });

  // Nur notwendige
  rejectBtn.addEventListener('click', function() {
    saveConsent('necessary', false, false);
  });

  }

  // Beim ersten Besuch automatisch anzeigen
  if (!localStorage.getItem('cookie_consent')) {
    createBanner();
  }

  // Footer-Link "Cookies" → Banner erneut öffnen
  document.addEventListener('click', function(e) {
    var link = e.target.closest('a[href="#cookies"]');
    if (link) {
      e.preventDefault();
      // Alten Consent entfernen damit Banner neu erstellt wird
      localStorage.removeItem('cookie_consent');
      // Falls Banner schon im DOM ist, entfernen
      var old = document.getElementById('cookie-banner');
      var oldOverlay = document.getElementById('cookie-overlay');
      if (old) old.remove();
      if (oldOverlay) oldOverlay.remove();
      createBanner();
    }
  });

})();
