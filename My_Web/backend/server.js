const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de API
app.use('/api/services', require('./routes/services'));
app.use('/api/inquiries', require('./routes/inquiries'));
app.use('/api/portfolio', require('./routes/portfolio'));
app.use('/api/comentarios', require('./routes/comentarios'));

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'Backend running', timestamp: new Date() });
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió mal', message: err.message });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

module.exports = app;
