console.log("JS chargé !");

let selectedNote = 0;

const stars = document.querySelectorAll('.star');
const formContainer = document.getElementById('form-container');
const confirmation = document.getElementById('confirmation');

stars.forEach((btn, index) => {
  btn.dataset.note = index + 1; // assure que data-note est bien défini

  btn.addEventListener('click', () => {
    selectedNote = index + 1;

    // Affichage conditionnel des containers
    if (selectedNote <= 3) {
      formContainer.classList.add('show');
      confirmation.classList.remove('show');
    } else {
      formContainer.classList.remove('show');
      confirmation.classList.add('show');
    }

    // Mise à jour des étoiles sélectionnées
    stars.forEach((star, i) => {
      star.classList.toggle('selected', i < selectedNote);
    });
  });
});

function envoyerAvis() {
  const message = document.getElementById('message').value.trim();
  if (!message) return alert("Merci de laisser un message.");

  fetch('/avis', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ note: selectedNote, message })
  })
  .then(res => res.text())
  .then(() => {
    alert("Avis envoyé !");
    formContainer.innerHTML = "<p>Merci pour votre avis 🙏</p>";
  })
  .catch(() => alert("Erreur lors de l'envoi."));
}
