// server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs-extra";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

// pointe sur le même nom que ton JSON
const DB_PATH = resolve(__dirname, "orders.json");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

async function ensureDb() {
  if (!(await fs.pathExists(DB_PATH))) {
    // crée un objet vide au démarrage
    await fs.writeJson(DB_PATH, {});
  }
}
ensureDb();

app.post("/print", async (req, res) => {
  try {
    const { ticketCode, items, orderType } = req.body;
    if (!ticketCode || !Array.isArray(items)) {
      return res.status(400).json({ error: "Données manquantes" });
    }
    const db = await fs.readJson(DB_PATH);
    db[ticketCode] = { ticketCode, orderType, items, createdAt: new Date().toISOString() };
    await fs.writeJson(DB_PATH, db, { spaces: 2 });
    res.json({ success: true, ticketCode });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.get("/orders/:ticketCode", async (req, res) => {
  try {
    const db = await fs.readJson(DB_PATH);
    const order = db[req.params.ticketCode];
    if (!order) return res.status(404).json({ error: "Commande introuvable" });
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend démarré sur http://localhost:${PORT}`);
});
