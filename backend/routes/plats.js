const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const db = require('../database');

// Config Multer — stockage des photos
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// GET /api/plats?search=XXX
router.get('/', (req, res) => {
  const { search } = req.query;
  const plats = db.prepare(`
    SELECT p.id, p.nom, p.photo,
           r.id AS restaurantId, r.nom AS restaurantNom
    FROM plats p
    JOIN restaurants r ON r.id = p.restaurant_id
    WHERE p.nom LIKE ?
  `).all(`%${search || ''}%`);

  res.json(plats.map(p => ({
    id: p.id,
    nom: p.nom,
    photo: p.photo,
    restaurant: { id: p.restaurantId, nom: p.restaurantNom }
  })));
});

// GET /api/plats/:id
router.get('/:id', (req, res) => {
  const plat = db.prepare(`
    SELECT p.id, p.nom, p.photo,
           r.id AS restaurantId, r.nom AS restaurantNom
    FROM plats p
    JOIN restaurants r ON r.id = p.restaurant_id
    WHERE p.id = ?
  `).get(req.params.id);

  if (!plat) return res.status(404).json({ error: 'Plat introuvable' });

  const avis = db.prepare(`
    SELECT id, note, commentaire, created_at AS createdAt
    FROM avis WHERE plat_id = ?
    ORDER BY created_at DESC
  `).all(plat.id);

  const noteMoyenne = avis.length
    ? Math.round((avis.reduce((sum, a) => sum + a.note, 0) / avis.length) * 10) / 10
    : null;

  res.json({
    id: plat.id,
    nom: plat.nom,
    photo: plat.photo,
    restaurant: { id: plat.restaurantId, nom: plat.restaurantNom },
    noteMoyenne,
    avis
  });
});

// POST /api/plats
router.post('/', upload.single('photo'), (req, res) => {
  const { nom, restaurantNom } = req.body;

  if (!nom || !restaurantNom || !req.file) {
    return res.status(400).json({ error: 'nom, restaurantNom et photo sont requis' });
  }

  // findOrCreate restaurant
  let restaurant = db.prepare('SELECT * FROM restaurants WHERE nom = ?').get(restaurantNom);
  if (!restaurant) {
    const result = db.prepare('INSERT INTO restaurants (nom) VALUES (?)').run(restaurantNom);
    restaurant = { id: result.lastInsertRowid, nom: restaurantNom };
  }

  const photo = `/uploads/${req.file.filename}`;
  const result = db.prepare(
    'INSERT INTO plats (nom, photo, restaurant_id) VALUES (?, ?, ?)'
  ).run(nom, photo, restaurant.id);

  res.status(201).json({
    id: result.lastInsertRowid,
    nom,
    photo,
    restaurant: { id: restaurant.id, nom: restaurant.nom }
  });
});

module.exports = router;