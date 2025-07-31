function submitRating(score) {
  if (score >= 4) {
    window.location.href = "https://g.page/votre-entreprise/review";
  } else {
    document.getElementById('feedbackForm').style.display = 'block';
  }
}

function sendFeedback() {
  const text = document.getElementById('feedbackText').value;
  fetch('/feedback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: text })
  })
  .then(() => {
    alert("Merci pour votre retour, nous allons le traiter rapidement.");
    location.reload();
  });
}
