# Nexus Technology - Plataforma de Servicios de Desarrollo Web

Una plataforma web completa para promocionar y gestionar servicios de desarrollo web, con frontend moderno y backend robusto.

## 🚀 Características

- **Diseño moderno** con colores anaranjado-amarillo y azul-aqua
- **Página de inicio atractiva** con hero section y llamadas a acción
- **Catálogo de servicios** con 6 tecnologías principales
- **Planes de precios accesibles** para emprendedores y pymes
- **Formulario de contacto y cotización** integrado
- **API REST completa** para gestionar servicios y solicitudes
- **Diseño responsive** con CSS modular

## 📁 Estructura del Proyecto

```
/
├── frontend/                    # Aplicación Frontend
│   ├── index.html              # Página principal HTML
│   ├── css/
│   │   └── styles.css          # Estilos CSS responsive
│   └── js/
│       └── script.js           # Lógica frontend
│
├── backend/                     # API Backend (Node.js + Express)
│   ├── server.js               # Servidor principal
│   ├── package.json            # Dependencias
│   ├── .env.example            # Variables de entorno
│   ├── routes/
│   │   ├── services.js         # Rutas de servicios
│   │   ├── inquiries.js        # Rutas de solicitudes
│   │   └── portfolio.js        # Rutas de portafolio
│   ├── models/                 # Modelos de BD (próxima fase)
│   └── controllers/            # Controladores (próxima fase)
│
├── img/                         # Activos estáticos
│   ├── logo.png
│   └── nombre.png
│
├── .github/
│   └── copilot-instructions.md # Instrucciones para agentes IA
│
└── .gitignore                  # Archivos ignorados en git
```

## 🛠 Instalación

### Requisitos previos
- Node.js v16+ y npm
- Git

### Frontend

1. El frontend es estático, simplemente abre `frontend/index.html` en tu navegador

2. O sirve los archivos con un servidor local:
   ```bash
   cd frontend
   python -m http.server 3000
   ```

### Backend

1. Instala dependencias:
   ```bash
   cd backend
   npm install
   ```

2. Crea el archivo `.env` basado en `.env.example`:
   ```bash
   cp .env.example .env
   ```

3. Configura las variables de entorno en `.env`

4. Inicia el servidor:
   ```bash
   npm start          # Producción
   # o
   npm run dev        # Desarrollo con nodemon
   ```

El servidor estará disponible en `http://localhost:5000`

## 📡 Endpoints API

### Servicios
- `GET /api/services` - Obtener todos los servicios
- `GET /api/services/:id` - Obtener servicio específico
- `POST /api/services` - Crear nuevo servicio (admin)

### Solicitudes/Inquiries
- `POST /api/inquiries` - Crear solicitud de cotización
- `GET /api/inquiries` - Obtener todas las solicitudes (admin)
- `GET /api/inquiries/:id` - Obtener solicitud específica
- `PUT /api/inquiries/:id` - Actualizar estado de solicitud

### Portafolio
- `GET /api/portfolio` - Obtener todos los proyectos
- `GET /api/portfolio/:id` - Obtener proyecto específico

### Comentarios
- `GET /api/comentarios` - Obtener todos los comentarios aprobados
- `POST /api/comentarios` - Crear nuevo comentario
- `GET /api/comentarios/:id` - Obtener comentario específico
- `PUT /api/comentarios/:id` - Actualizar comentario (admin)
- `DELETE /api/comentarios/:id` - Eliminar comentario (admin)

### Health Check
- `GET /api/health` - Verificar estado del servidor

## 🎨 Secciones de la Página

1. **Navbar** - Navegación sticky con logo y botones
2. **Hero** - Banner principal con CTA
3. **Productos** - Grid de 6 servicios principales
4. **Catálogo** - Listado de tecnologías (Frontend, Backend, BD)
5. **Precios** - 3 planes diferenciados
6. **Contacto** - Formulario y datos de contacto
7. **Comentarios** - Sistema de comentarios con calificación (página principal)
8. **Footer** - Enlaces sociales y copyright

## 🏗️ Arquitectura Frontend

### Estructura de Archivos JS
- **`api.js`** - Cliente HTTP centralizado para comunicación con backend
- **`script.js`** - Funciones generales y utilidades
- **`comentarios.js`** - Módulo de comentarios (clase `GestorComentarios`)

### Patrones de Código
- **Clases ES6**: Uso de clases para modularidad y reutilización
- **Async/Await**: Manejo limpio de promesas
- **Escapado de HTML**: Prevención de XSS en comentarios
- **Validación**: En frontend y backend

## 🔄 Flujo de Datos

```
Usuario rellena formulario en Frontend
       ↓
JavaScript envía POST a /api/inquiries
       ↓
Backend recibe y guarda solicitud
       ↓
Email de confirmación (futuro)
       ↓
Admin puede ver en /api/inquiries (admin panel - futuro)
```

## 📋 Próximas Fases

- [ ] Integración con MongoDB para persistencia de datos
- [ ] Sistema de autenticación (JWT)
- [ ] Panel de administración
- [ ] Integración con Stripe/PayPal para pagos
- [ ] Sistema de email automático (Nodemailer/SendGrid)
- [ ] Testing automatizado (Jest)
- [ ] Deployment en producción
- [ ] Framework full-stack (React + Next.js o Vue + Nuxt)

## 🔐 Seguridad

- Variables de entorno en `.env` (nunca committear)
- CORS habilitado para origen frontend
- Validación de entrada en rutas
- Protección contra CSRF (próxima fase)

## 📝 Notas de Desarrollo

- Backend corre en puerto 5000
- Frontend corre en puerto 3000 (si se usa servidor local)
- Las solicitudes se guardan en memoria (sin BD aún)
- Todos los datos son de prueba/demostración

## 📧 Contacto

Para consultas sobre este proyecto, contacta a través del formulario en la página.

## 📄 Licencia

ISC
