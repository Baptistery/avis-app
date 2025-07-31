let selectedNote = 0;

const stars = document.querySelectorAll('.star');
const formContainer = document.getElementById('form-container');
const confirmation = document.getElementById('confirmation');

stars.forEach(star => {
  star.addEventListener('click', () => {
    selectedNote = parseInt(star.dataset.note);

    // reset all
    stars.forEach(s => s.classList.remove('selected'));
    for (let i = 0; i < selectedNote; i++) {
      stars[i].classList.add('selected');
    }

    // cacher les deux containers
    formContainer.classList.remove('show');
    confirmation.classList.remove('show');

    if (selectedNote >= 4) {
      confirmation.classList.add('show');
    } else {
      formContainer.classList.add('show');
    }
  });
});

function envoyerAvis() {
  const message = document.getElementById('message').value.trim();
  if (!selectedNote || !message) {
    alert("Veuillez sélectionner une note et écrire un message.");
    return;
  }

  fetch('/avis', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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