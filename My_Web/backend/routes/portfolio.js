const express = require('express');
const router = express.Router();

// GET - Obtener portafolio de proyectos
router.get('/', (req, res) => {
    const portfolio = [
        {
            id: 1,
            title: 'Tienda Online TechStore',
            description: 'E-commerce de electrónica con carrito inteligente',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            image: 'techstore.jpg',
            link: 'https://techstore.example.com',
            year: 2023
        },
        {
            id: 2,
            title: 'App de Gestión de Tareas',
            description: 'Aplicación colaborativa para equipos de trabajo',
            technologies: ['Vue.js', 'Express', 'PostgreSQL'],
            image: 'taskapp.jpg',
            link: 'https://taskapp.example.com',
            year: 2023
        },
        {
            id: 3,
            title: 'Red Social de Viajeros',
            description: 'Plataforma para compartir experiencias de viaje',
            technologies: ['Next.js', 'FastAPI', 'PostgreSQL', 'Redis'],
            image: 'travelnetwork.jpg',
            link: 'https://travelnetwork.example.com',
            year: 2024
        },
        {
            id: 4,
            title: 'Dashboard Analytics Premium',
            description: 'Panel de control con visualización de datos en tiempo real',
            technologies: ['React', 'Node.js', 'MongoDB', 'Chart.js'],
            image: 'dashboard.jpg',
            link: 'https://dashboard.example.com',
            year: 2024
        }
    ];

    res.json(portfolio);
});

// GET - Obtener proyecto por ID
router.get('/:id', (req, res) => {
    const projectId = parseInt(req.params.id);
    res.json({ 
        id: projectId, 
        message: 'Proyecto encontrado',
        fullDetails: true 
    });
});

module.exports = router;
