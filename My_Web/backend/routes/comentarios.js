const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Almacenamiento temporal de comentarios (en producción usar BD)
let comentarios = [
    {
        id: 1,
        nombre: 'Carlos Mendoza',
        email: 'carlos@example.com',
        texto: 'Excelente servicio, muy profesionales y atentos. Recomendado 100%',
        calificacion: 5,
        fecha: new Date('2025-12-01').toISOString(),
        aprobado: true
    },
    {
        id: 2,
        nombre: 'Ana López',
        email: 'ana@example.com',
        texto: 'El proyecto quedó perfecto. Entrega a tiempo y de excelente calidad.',
        calificacion: 5,
        fecha: new Date('2025-11-28').toISOString(),
        aprobado: true
    },
    {
        id: 3,
        nombre: 'Roberto García',
        email: 'roberto@example.com',
        texto: 'Muy buena comunicación durante todo el proceso. Volveré a trabajar con ellos.',
        calificacion: 4,
        fecha: new Date('2025-11-25').toISOString(),
        aprobado: true
    }
];

/**
 * GET /api/comentarios
 * Obtener todos los comentarios aprobados
 */
router.get('/', (req, res) => {
    try {
        // Retornar solo comentarios aprobados, ordenados por fecha descendente
        const comentariosAprobados = comentarios
            .filter(c => c.aprobado)
            .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        
        res.json(comentariosAprobados);
    } catch (error) {
        console.error('Error al obtener comentarios:', error);
        res.status(500).json({ error: 'Error al obtener comentarios' });
    }
});

/**
 * POST /api/comentarios
 * Crear un nuevo comentario
 */
router.post('/', [
    body('nombre')
        .trim()
        .notEmpty()
        .withMessage('El nombre es requerido')
        .isLength({ min: 2, max: 100 })
        .withMessage('El nombre debe tener entre 2 y 100 caracteres'),
    
    body('email')
        .trim()
        .isEmail()
        .withMessage('Email inválido')
        .normalizeEmail(),
    
    body('texto')
        .trim()
        .notEmpty()
        .withMessage('El comentario es requerido')
        .isLength({ min: 10, max: 1000 })
        .withMessage('El comentario debe tener entre 10 y 1000 caracteres'),
    
    body('calificacion')
        .optional()
        .isIn(['1', '2', '3', '4', '5'])
        .withMessage('Calificación inválida')
], (req, res) => {
    try {
        // Validar errores
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                error: 'Validación fallida',
                detalles: errors.array()
            });
        }

        const { nombre, email, texto, calificacion } = req.body;

        // Crear nuevo comentario
        const nuevoComentario = {
            id: comentarios.length + 1,
            nombre,
            email,
            texto,
            calificacion: parseInt(calificacion) || 5,
            fecha: new Date().toISOString(),
            aprobado: true // En producción, requerir aprobación del admin
        };

        comentarios.push(nuevoComentario);

        // Aquí se podría enviar email de confirmación
        console.log('Nuevo comentario recibido:', nuevoComentario);

        res.status(201).json({
            success: true,
            message: 'Comentario publicado exitosamente',
            comentario: nuevoComentario
        });

    } catch (error) {
        console.error('Error al crear comentario:', error);
        res.status(500).json({ 
            error: 'Error al publicar comentario',
            detalles: error.message
        });
    }
});

/**
 * GET /api/comentarios/:id
 * Obtener un comentario específico
 */
router.get('/:id', (req, res) => {
    try {
        const comentario = comentarios.find(c => c.id === parseInt(req.params.id));
        
        if (!comentario) {
            return res.status(404).json({ error: 'Comentario no encontrado' });
        }

        res.json(comentario);
    } catch (error) {
        console.error('Error al obtener comentario:', error);
        res.status(500).json({ error: 'Error al obtener comentario' });
    }
});

/**
 * PUT /api/comentarios/:id
 * Actualizar un comentario (admin)
 */
router.put('/:id', [
    body('aprobado')
        .optional()
        .isBoolean()
        .withMessage('aprobado debe ser boolean')
], (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: 'Validación fallida' });
        }

        const comentario = comentarios.find(c => c.id === parseInt(req.params.id));
        
        if (!comentario) {
            return res.status(404).json({ error: 'Comentario no encontrado' });
        }

        const { aprobado } = req.body;
        if (aprobado !== undefined) {
            comentario.aprobado = aprobado;
        }

        res.json({ success: true, comentario });
    } catch (error) {
        console.error('Error al actualizar comentario:', error);
        res.status(500).json({ error: 'Error al actualizar comentario' });
    }
});

/**
 * DELETE /api/comentarios/:id
 * Eliminar un comentario (admin)
 */
router.delete('/:id', (req, res) => {
    try {
        const index = comentarios.findIndex(c => c.id === parseInt(req.params.id));
        
        if (index === -1) {
            return res.status(404).json({ error: 'Comentario no encontrado' });
        }

        const comentarioEliminado = comentarios.splice(index, 1);
        res.json({ success: true, message: 'Comentario eliminado', comentario: comentarioEliminado });
    } catch (error) {
        console.error('Error al eliminar comentario:', error);
        res.status(500).json({ error: 'Error al eliminar comentario' });
    }
});

module.exports = router;
