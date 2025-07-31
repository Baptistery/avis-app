console.log("JS chargé !");

let selectedNote = 0;

document.querySelectorAll('.star').forEach(btn => {
  btn.addEventListener('click', () => {
    selectedNote = parseInt(btn.dataset.note);

    if (selectedNote <= 3) {
      document.getElementById('form-container').style.display = 'block';
      document.getElementById('confirmation').style.display = 'none';
    } else {
      document.getElementById('form-container').style.display = 'none';
      document.getElementById('confirmation').style.display = 'block';
    }

    // Effet visuel de sélection
    document.querySelectorAll('.star').forEach(star => star.classList.remove('selected'));
    for (let i = 0; i < selectedNote; i++) {
      document.querySelectorAll('.star')[i].classList.add('selected');
    }
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
      document.getElementById('form-container').innerHTML = "<p>Merci pour votre avis 🙏</p>";
    })
    .catch(() => alert("Erreur lors de l'envoi."));
}