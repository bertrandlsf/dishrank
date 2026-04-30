const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const platsRouter = require('./routes/plats');
const avisRouter = require('./routes/avis');
app.use('/api/plats', platsRouter);
app.use('/api/avis', avisRouter);

// Démarrage
app.listen(PORT, () => {
  console.log(`DishRank backend running on http://localhost:${PORT}`);
});