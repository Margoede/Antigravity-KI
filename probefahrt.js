/* =============================================
   PROBEFAHRT – Formular-Logik & E-Mail-Versand
   ============================================= */

(function() {
  'use strict';

  // ---- Modelle je Kategorie ----
  var modelle = {
    motorrad: [
      '125NK',
      '450MT',
      '450CL-C',
      '675NK',
      '675SR-R',
      '700MT',
      '800NK',
      '800MT Explore',
      '800MT-X',
      '1000MT-X'
    ],
    atv: [
      'CFORCE 450',
      'CFORCE 520',
      'CFORCE 625 Touring',
      'CFORCE 625 Overland',
      'CFORCE 850 Standard',
      'CFORCE 850 Touring',
      'CFORCE 1000 Touring',
      'CFORCE 1000 Touring Pro G3',
      'CFORCE 1000 Overland',
      'CFORCE 1000 Mud Version'
    ],
    buggy: [
      'UFORCE 600+',
      'UFORCE 600 Vollkabine',
      'UFORCE U6 EV',
      'U10 PRO Highland',
      'U10 XL PRO Highland'
    ]
  };

  var kategorieSelect = document.getElementById('pf-kategorie');
  var modellSelect    = document.getElementById('pf-modell');
  var form            = document.getElementById('contact-form');
  var statusEl        = document.getElementById('form-status');

  // ---- Kategorie → Modell-Dropdown aktualisieren ----
  kategorieSelect.addEventListener('change', function() {
    var kat = this.value;
    var opts = modelle[kat] || [];

    modellSelect.innerHTML = '<option value="" disabled selected>Modell wählen…</option>';
    opts.forEach(function(m) {
      var opt = document.createElement('option');
      opt.value = m;
      opt.textContent = m;
      modellSelect.appendChild(opt);
    });
  });

  // ---- Formular absenden ----
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Validierung
    if (!form.checkValidity()) {
      showStatus('Bitte füllen Sie alle Pflichtfelder (*) aus.', 'error');
      return;
    }

    var submitBtn = form.querySelector('.pf-submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Wird gesendet…';

    // Formulardaten sammeln
    var data = {
      vorname:      document.getElementById('pf-vorname').value.trim(),
      nachname:     document.getElementById('pf-nachname').value.trim(),
      email:        document.getElementById('pf-email').value.trim(),
      telefon:      document.getElementById('pf-telefon').value.trim(),
      kategorie:    kategorieSelect.value,
      modell:       modellSelect.value,
      wunschtermin: document.getElementById('pf-wunschtermin').value,
      nachricht:    document.getElementById('pf-nachricht').value.trim()
    };

    // E-Mail-Body zusammenbauen
    var subject = 'Probefahrt-Anfrage: ' + data.modell + ' – ' + data.vorname + ' ' + data.nachname;
    var body = 'PROBEFAHRT-ANFRAGE\n'
      + '========================\n\n'
      + 'Name: ' + data.vorname + ' ' + data.nachname + '\n'
      + 'E-Mail: ' + data.email + '\n'
      + 'Telefon: ' + (data.telefon || '–') + '\n\n'
      + 'Kategorie: ' + data.kategorie + '\n'
      + 'Modell: ' + data.modell + '\n'
      + 'Wunschtermin: ' + (data.wunschtermin || 'Flexibel') + '\n\n'
      + 'Nachricht:\n' + (data.nachricht || '–') + '\n';

    // mailto-Link öffnen
    var mailtoLink = 'mailto:moto@auz-goedecke.de'
      + '?subject=' + encodeURIComponent(subject)
      + '&body='    + encodeURIComponent(body);

    window.location.href = mailtoLink;

    // Erfolg anzeigen
    setTimeout(function() {
      showStatus('Vielen Dank! Ihr E-Mail-Programm sollte sich geöffnet haben. Bitte senden Sie die E-Mail ab. Falls nicht, schreiben Sie uns direkt an moto@auz-goedecke.de', 'success');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Probefahrt anfragen';
      form.reset();
      modellSelect.innerHTML = '<option value="" disabled selected>Bitte zuerst Kategorie wählen…</option>';
    }, 500);
  });

  function showStatus(message, type) {
    statusEl.textContent = message;
    statusEl.className = 'pf-form-status ' + type;
  }

})();
