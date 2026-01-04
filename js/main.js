// Hent elementer
const form = document.querySelector("#webform");
const summaryArticle = document.querySelector("#form-summary article");
const debugOutput = document.querySelector("#debug-output");

// Kør kun hvis formen findes
if (form) {
  /* ===========================
     SUBMIT – HÅNDTER INDSEND
     =========================== */
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // stop side-refresh

    // Saml alle formdata i et objekt
    const data = new FormData(form);
    const values = Object.fromEntries(data.entries());

    // Log i konsollen (hvis du åbner console)
    console.log("Indsendt formular:", values);

    /* ===========================
       OPDATER SUMMARY-BOKSEN
       =========================== */
    if (summaryArticle) {
      summaryArticle.innerHTML = `
        <h3>Seneste indberetning</h3>
        <p><strong>Navn:</strong> ${values["contact-name"] || "—"}</p>
        <p><strong>E-mail:</strong> ${values["contact-email"] || "—"}</p>
        <p><strong>Telefon:</strong> ${values["contact-phone"] || "—"}</p>
        <p><strong>Sted:</strong> ${values["incident-location"] || "—"}</p>
        <p><strong>Dato:</strong> ${values["incident-date"] || "—"}</p>
        <p><strong>I sikkerhed nu?:</strong> ${values["safe-now"] || "—"}</p>
        <p><strong>Antal Mørkegængere:</strong> ${
          values["number-of-walkers"] || "—"
        }</p>
        <p><strong>Afstand (meter):</strong> ${values["distance"] || "—"}</p>
        <p><strong>Varighed (minutter):</strong> ${
          values["duration"] || "—"
        }</p>
        <p><strong>Beskrivelse:</strong><br>${values["description"] || "—"}</p>
      `;
    }

    /* ===========================
       DEBUG-VISNING (rå data)
       =========================== */
    if (debugOutput) {
      debugOutput.innerHTML = `
        <h3>Rå data (debug)</h3>
        <pre>${JSON.stringify(values, null, 2)}</pre>
      `;
    }
  });

  /* ===========================
     INVALID – FJERN BROWSER-POPUP
     =========================== */
  function cancelPopup(event) {
    event.preventDefault(); // stop standard fejl-popup
    const firstInvalid = form.querySelector(":invalid");
    if (firstInvalid) {
      firstInvalid.focus();
    }
  }

  // Brug capturing = true som i undervisningen
  form.addEventListener("invalid", cancelPopup, true);
}
