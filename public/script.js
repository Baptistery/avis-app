let selectedNote = 0;

const stars = document.querySelectorAll('.star');
const formContainer = document.getElementById('form-container');
const confirmation = document.getElementById('confirmation');

stars.forEach(star => {
  star.addEventListener('click', () => {
    selectedNote = parseInt(star.dataset.note);

    // Réinitialise les étoiles
    stars.forEach(s => s.classList.remove('selected'));
    star.classList.add('selected');

    // Masquer les deux sections
    formContainer.classList.remove('show');
    confirmation.classList.remove('show');

    if (selectedNote >= 4) {
      // Afficher le message Google
      confirmation.classList.add('show');
    } else {
      // Afficher le formulaire de feedback
      formContainer.classList.add('show');
    }
  });
});

function envoyerAvis() {
  const message = document.getElementById('message').value;
  if (!selectedNote || !message) {
    alert("Veuillez sélectionner une note et écrire un message.");
    return;
  }

  fetch('/avis', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ note: selectedNote, message })
  })
    .then(res => res.text())
    .then(data => {
      alert("Merci pour votre retour !");
      formContainer.classList.remove('show');
    })
    .catch(err => {
      console.error(err);
      alert("Une erreur est survenue.");
    });
}
