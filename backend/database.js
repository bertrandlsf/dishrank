const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'dishrank.db'));

// Activer les foreign keys
db.pragma('foreign_keys = ON');

// Création des tables
db.exec(`
  CREATE TABLE IF NOT EXISTS restaurants (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    nom        TEXT    NOT NULL,
    adresse    TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS plats (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    nom           TEXT    NOT NULL,
    photo         TEXT    NOT NULL,
    restaurant_id INTEGER NOT NULL,
    created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
  );

  CREATE TABLE IF NOT EXISTS avis (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    note        INTEGER NOT NULL CHECK(note >= 1 AND note <= 5),
    commentaire TEXT    NOT NULL,
    plat_id     INTEGER NOT NULL,
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (plat_id) REFERENCES plats(id)
  );
`);

module.exports = db;