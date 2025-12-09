const express = require('express');
const router = express.Router();

// GET - Obtener todos los servicios
router.get('/', (req, res) => {
    const services = [
        {
            id: 1,
            name: 'Landing Pages',
            description: 'Páginas de aterrizaje optimizadas para conversiones',
            price: 500,
            category: 'frontend',
            features: ['Diseño responsive', 'SEO optimizado', 'Rápida carga']
        },
        {
            id: 2,
            name: 'E-commerce',
            description: 'Tiendas online completas con carrito de compras',
            price: 2500,
            category: 'fullstack',
            features: ['Carrito de compras', 'Pasarelas de pago', 'Sistema de inventario']
        },
        {
            id: 3,
            name: 'Portafolio Web',
            description: 'Sitios portafolio profesionales',
            price: 1000,
            category: 'frontend',
            features: ['Galería de proyectos', 'Blog integrado', 'Formularios de contacto']
        },
        {
            id: 4,
            name: 'Red Social',
            description: 'Plataformas de comunidad',
            price: 3000,
            category: 'fullstack',
            features: ['Sistema de usuarios', 'Mensajería en tiempo real', 'Notificaciones']
        },
        {
            id: 5,
            name: 'Gestión de Proyectos',
            description: 'Aplicaciones colaborativas',
            price: 2000,
            category: 'fullstack',
            features: ['Tablero Kanban', 'Calendario integrado', 'Asignación de tareas']
        },
        {
            id: 6,
            name: 'Dashboard Analytics',
            description: 'Paneles de control con análisis',
            price: 1500,
            category: 'fullstack',
            features: ['Gráficos interactivos', 'Reportes automáticos', 'Exportación de datos']
        }
    ];
    res.json(services);
});

// GET - Obtener servicio por ID
router.get('/:id', (req, res) => {
    const serviceId = parseInt(req.params.id);
    // Simular búsqueda en BD
    res.json({ id: serviceId, message: 'Servicio encontrado' });
});

// POST - Crear nuevo servicio (admin)
router.post('/', (req, res) => {
    const { name, description, price, category } = req.body;
    
    if (!name || !description || !price) {
        return res.status(400).json({ error: 'Campos requeridos: name, description, price' });
    }

    const newService = {
        id: Math.floor(Math.random() * 1000),
        name,
        description,
        price,
        category: category || 'fullstack',
        createdAt: new Date()
    };

    res.status(201).json(newService);
});

module.exports = router;
