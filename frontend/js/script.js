// Scroll suave a secciones
function scrollTo(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Mostrar detalles de productos
function showDetails(productType) {
    const details = {
        landing: {
            title: 'Landing Pages',
            description: 'Páginas de aterrizaje optimizadas para convertir visitantes en clientes.'
        },
        ecommerce: {
            title: 'E-commerce',
            description: 'Tienda online completa con todas las características de carrito y pago.'
        },
        portfolio: {
            title: 'Portafolio Web',
            description: 'Muestra tu trabajo de forma profesional y atrae nuevos clientes.'
        },
        social: {
            title: 'Red Social',
            description: 'Plataforma de comunidad con sistema de usuarios y mensajería.'
        },
        pm: {
            title: 'Gestión de Proyectos',
            description: 'Herramienta colaborativa para gestionar equipos y tareas.'
        },
        dashboard: {
            title: 'Dashboard Analytics',
            description: 'Panel de control con análisis en tiempo real de tu negocio.'
        }
    };

    if (details[productType]) {
        alert(`${details[productType].title}\n\n${details[productType].description}`);
    }
}

// Filtro de catálogo
function filterCatalog(category) {
    const items = document.querySelectorAll('.catalog-item');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    items.forEach(item => {
        if (category === 'todos' || item.dataset.category === category) {
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
            }, 10);
        } else {
            item.style.display = 'none';
        }
    });
}

// Seleccionar plan de cotización
function selectPlan(plan) {
    const selectElement = document.getElementById('plan');
    if (selectElement) {
        selectElement.value = plan;
        selectElement.scrollIntoView({ behavior: 'smooth' });
    }
}

// Envío de formulario de contacto
document.addEventListener('DOMContentLoaded', function() {
    // Manejo de formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            
            // Simulación de envío al backend
            console.log('Envío de contacto:', Object.fromEntries(formData));
            
            alert('¡Gracias por tu mensaje! Nos pondremos en contacto pronto.');
            contactForm.reset();
        });
    }

    // Manejo de formulario de cotización
    const cotizarForm = document.getElementById('cotizarForm');
    if (cotizarForm) {
        cotizarForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(cotizarForm);
            const data = Object.fromEntries(formData);
            
            // Simulación de envío al backend
            console.log('Solicitud de cotización:', data);
            
            alert('¡Gracias por tu solicitud de cotización!\n\nNos pondremos en contacto en las próximas 24 horas.');
            cotizarForm.reset();
        });
    }

    // Menú hamburguesa
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }
});

// Smooth scroll en links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Validación de email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Formateo de teléfono
function formatearTelefono(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 0) {
        if (value.length <= 3) {
            input.value = value;
        } else if (value.length <= 6) {
            input.value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        } else {
            input.value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
        }
    }
}

// Agregar clase activa al navbar en scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});
