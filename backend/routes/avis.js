const express = require('express');
const router = express.Router();
const db = require('../database');

// POST /api/avis
router.post('/', (req, res) => {
  const { platId, note, commentaire } = req.body;

  if (!platId || !note || !commentaire) {
    return res.status(400).json({ error: 'platId, note et commentaire sont requis' });
  }

  if (note < 1 || note > 5) {
    return res.status(400).json({ error: 'La note doit être entre 1 et 5' });
  }

  const plat = db.prepare('SELECT id FROM plats WHERE id = ?').get(platId);
  if (!plat) return res.status(404).json({ error: 'Plat introuvable' });

  const result = db.prepare(
    'INSERT INTO avis (note, commentaire, plat_id) VALUES (?, ?, ?)'
  ).run(note, commentaire, platId);

  const avis = db.prepare(`
    SELECT id, note, commentaire, created_at AS createdAt
    FROM avis WHERE id = ?
  `).get(result.lastInsertRowid);

  res.status(201).json(avis);
});

module.exports = router;