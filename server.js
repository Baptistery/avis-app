const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Configuration
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('public')); // pour les fichiers CSS, JS, images
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Vue avec EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Route principale
app.get('/', (req, res) => {
  res.render('index'); // index.ejs ou index.html selon ton moteur de vue
});

// Traitement des avis
app.post('/avis', (req, res) => {
  const { note, message } = req.body;

  if (!note || !message) {
    return res.status(400).send("Champs manquants");
  }

  const avis = {
    note,
    message,
    date: new Date().toISOString()
  };

  // Enregistre dans un fichier local
  const avisFilePath = path.join(__dirname, 'avis.json');
  let data = [];

  try {
    if (fs.existsSync(avisFilePath)) {
      const existing = fs.readFileSync(avisFilePath);
      data = JSON.parse(existing);
    }
  } catch (e) {
    console.error("Erreur lecture fichier avis:", e);
  }

  data.push(avis);

  fs.writeFile(avisFilePath, JSON.stringify(data, null, 2), err => {
    if (err) {
      console.error("Erreur écriture fichier avis:", err);
      return res.status(500).send("Erreur serveur");
    }
    res.send("Avis enregistré");
  });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
