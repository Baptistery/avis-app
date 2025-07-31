let selectedNote = 0;

const stars = document.querySelectorAll('.star');
const formContainer = document.getElementById('form-container');
const confirmation = document.getElementById('confirmation');

stars.forEach(star => {
  star.addEventListener('click', () => {
    selectedNote = parseInt(star.dataset.note);

    // reset all
    stars.forEach(s => s.classList.remove('selected'));
    star.classList.add('selected');

    if (selectedNote >= 4) {
      formContainer.style.display = 'none';
      confirmation.style.display = 'block';
    } else {
      formContainer.style.display = 'block';
      confirmation.style.display = 'none';
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
      formContainer.style.display = 'none';
    })
    .catch(err => {
      console.error(err);
      alert("Une erreur est survenue.");
    });
}