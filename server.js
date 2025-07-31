const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/feedback', (req, res) => {
  const feedback = req.body.message;
  const timestamp = new Date().toISOString();
  const entry = { date: timestamp, feedback };

  const filePath = path.join(__dirname, 'avis.json');
  let data = [];

  if (fs.existsSync(filePath)) {
    data = JSON.parse(fs.readFileSync(filePath));
  }

  data.push(entry);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
