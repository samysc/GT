const express = require('express');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const bodyParser = require('body-parser');
const app = express();
const PORT = 4000;

app.use(bodyParser.json());

// Crée le dossier tickets s'il n'existe pas
const ticketsDir = path.join(__dirname, 'tickets');
if (!fs.existsSync(ticketsDir)) {
  fs.mkdirSync(ticketsDir);
}

// Endpoint pour recevoir une commande et imprimer
app.post('/print', (req, res) => {
  const { ticketCode, items, orderType } = req.body;
  if (!ticketCode || !items || !Array.isArray(items)) {
    return res.status(400).json({ error: 'Requête invalide' });
  }

  const content = `Golden Tacos\n${new Date().toLocaleString()}\n\nType: ${orderType}\nTicket: ${ticketCode}\n\n${items.map(i => `- ${i}`).join('\n')}\n\nMerci pour votre commande !`;

  const filePath = path.join(ticketsDir, `${ticketCode}.txt`);
  fs.writeFileSync(filePath, content);

  // Lancement de l'impression via PowerShell (Windows)
  const printCommand = `powershell.exe Start-Process -FilePath \\"${filePath}\\" -Verb Print`;
  exec(printCommand, (err) => {
    if (err) {
      console.error('Erreur impression :', err);
      return res.status(500).json({ error: 'Échec impression' });
    }
    res.json({ success: true, message: 'Ticket imprimé' });
  });
});

app.listen(PORT, () => {
  console.log(`Serveur d'impression démarré sur http://localhost:${PORT}`);
});
