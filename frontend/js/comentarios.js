/**
 * Módulo de Comentarios
 * Maneja la lógica de carga, envío y visualización de comentarios
 */

class GestorComentarios {
    constructor() {
        this.apiUrl = 'http://localhost:5000/api/comentarios';
        this.formulario = document.getElementById('comentarioForm');
        this.contenedor = document.getElementById('comentarios-container');
        this.init();
    }

    /**
     * Inicializa el módulo
     */
    init() {
        this.cargarComentarios();
        if (this.formulario) {
            this.formulario.addEventListener('submit', (e) => this.enviarComentario(e));
        }
    }

    /**
     * Carga comentarios desde el backend
     */
    async cargarComentarios() {
        try {
            this.mostrarCargando();
            const comentarios = await window.api.get('/api/comentarios');
            
            if (Array.isArray(comentarios) && comentarios.length > 0) {
                this.renderizarComentarios(comentarios);
            } else {
                this.mostrarSinComentarios();
            }
        } catch (error) {
            console.error('Error al cargar comentarios:', error);
            this.mostrarError('Error al cargar comentarios');
        }
    }

    /**
     * Envía un nuevo comentario al backend
     */
    async enviarComentario(e) {
        e.preventDefault();

        const datos = {
            nombre: document.getElementById('nombre-comentario').value,
            email: document.getElementById('email-comentario').value,
            texto: document.getElementById('texto-comentario').value,
            calificacion: document.getElementById('calificacion').value || 5,
            fecha: new Date().toISOString()
        };

        try {
            const response = await window.api.post('/api/comentarios', datos);

            if (response.success) {
                this.mostrarExito('¡Comentario publicado exitosamente!');
                this.formulario.reset();
                setTimeout(() => this.cargarComentarios(), 500);
            } else {
                this.mostrarError('Error al publicar comentario');
            }
        } catch (error) {
            console.error('Error:', error);
            this.mostrarError('Error al conectar con el servidor');
        }
    }

    /**
     * Renderiza los comentarios en el DOM
     */
    renderizarComentarios(comentarios) {
        this.contenedor.innerHTML = '';
        
        comentarios.forEach(comentario => {
            const card = this.crearTarjetaComentario(comentario);
            this.contenedor.appendChild(card);
        });
    }

    /**
     * Crea una tarjeta de comentario
     */
    crearTarjetaComentario(comentario) {
        const card = document.createElement('div');
        card.className = 'comentario-card';
        
        const fecha = new Date(comentario.fecha);
        const fechaFormato = fecha.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const estrellas = this.generarEstrellas(comentario.calificacion);

        card.innerHTML = `
            <div class="comentario-header">
                <div class="comentario-info">
                    <h4>${this.escaparHTML(comentario.nombre)}</h4>
                    <p class="comentario-email">${this.escaparHTML(comentario.email)}</p>
                </div>
                <div class="comentario-rating">
                    ${estrellas}
                </div>
            </div>
            <p class="comentario-fecha">${fechaFormato}</p>
            <p class="comentario-texto">${this.escaparHTML(comentario.texto)}</p>
        `;

        return card;
    }

    /**
     * Genera las estrellas de calificación
     */
    generarEstrellas(calificacion) {
        const calif = parseInt(calificacion) || 5;
        let estrellas = '';
        
        for (let i = 1; i <= 5; i++) {
            if (i <= calif) {
                estrellas += '<span class="star">★</span>';
            } else {
                estrellas += '<span class="star">☆</span>';
            }
        }
        
        return estrellas;
    }

    /**
     * Escapa caracteres HTML para evitar XSS
     */
    escaparHTML(texto) {
        const div = document.createElement('div');
        div.textContent = texto;
        return div.innerHTML;
    }

    /**
     * Muestra estado de cargando
     */
    mostrarCargando() {
        this.contenedor.innerHTML = `
            <div class="cargando">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Cargando comentarios...</p>
            </div>
        `;
    }

    /**
     * Muestra mensaje de sin comentarios
     */
    mostrarSinComentarios() {
        this.contenedor.innerHTML = `
            <div class="sin-comentarios">
                <p>No hay comentarios aún. ¡Sé el primero en comentar!</p>
            </div>
        `;
    }

    /**
     * Muestra mensaje de error
     */
    mostrarError(mensaje) {
        this.contenedor.innerHTML = `
            <div class="sin-comentarios" style="background-color: #fee2e2; color: #991b1b;">
                <i class="fas fa-exclamation-circle" style="display: block; font-size: 2rem; margin-bottom: 0.5rem;"></i>
                <p>${mensaje}</p>
            </div>
        `;
    }

    /**
     * Muestra mensaje de éxito
     */
    mostrarExito(mensaje) {
        const alert = document.createElement('div');
        alert.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 5px;
            z-index: 1000;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            animation: slideIn 0.3s ease-out;
        `;
        alert.textContent = mensaje;
        document.body.appendChild(alert);

        setTimeout(() => {
            alert.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => alert.remove(), 300);
        }, 3000);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new GestorComentarios();
});

// Agregar animaciones CSS dinámicas
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
