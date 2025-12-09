const express = require('express');
const router = express.Router();

// Almacenamiento temporal de solicitudes (en producción usar BD)
let inquiries = [];

// POST - Crear nueva solicitud de cotización
router.post('/', (req, res) => {
    const { name, email, subject, projectType, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ 
            error: 'Campos requeridos: name, email, message' 
        });
    }

    const inquiry = {
        id: Math.floor(Math.random() * 100000),
        name,
        email,
        subject: subject || 'Sin asunto',
        projectType: projectType || 'custom',
        message,
        status: 'new',
        createdAt: new Date(),
        response: null
    };

    inquiries.push(inquiry);

    // Aquí se enviaría email de confirmación
    console.log('Nueva solicitud recibida:', inquiry);

    res.status(201).json({
        success: true,
        message: 'Solicitud enviada exitosamente',
        inquiryId: inquiry.id
    });
});

// GET - Obtener todas las solicitudes (admin)
router.get('/', (req, res) => {
    res.json(inquiries);
});

// GET - Obtener solicitud por ID
router.get('/:id', (req, res) => {
    const inquiry = inquiries.find(i => i.id === parseInt(req.params.id));
    
    if (!inquiry) {
        return res.status(404).json({ error: 'Solicitud no encontrada' });
    }

    res.json(inquiry);
});

// PUT - Actualizar estado de solicitud
router.put('/:id', (req, res) => {
    const inquiry = inquiries.find(i => i.id === parseInt(req.params.id));
    
    if (!inquiry) {
        return res.status(404).json({ error: 'Solicitud no encontrada' });
    }

    const { status, response } = req.body;
    
    if (status) inquiry.status = status;
    if (response) inquiry.response = response;
    inquiry.updatedAt = new Date();

    res.json({ success: true, inquiry });
});

module.exports = router;
