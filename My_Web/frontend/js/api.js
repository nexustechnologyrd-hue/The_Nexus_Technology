/**
 * Utilidades HTTP
 * Proporciona métodos limpios para hacer solicitudes al backend
 */

class API {
    constructor(baseUrl = 'http://localhost:5000') {
        this.baseUrl = baseUrl;
    }

    /**
     * Realiza una solicitud GET
     */
    async get(endpoint) {
        return await this.request('GET', endpoint);
    }

    /**
     * Realiza una solicitud POST
     */
    async post(endpoint, datos) {
        return await this.request('POST', endpoint, datos);
    }

    /**
     * Realiza una solicitud PUT
     */
    async put(endpoint, datos) {
        return await this.request('PUT', endpoint, datos);
    }

    /**
     * Realiza una solicitud DELETE
     */
    async delete(endpoint) {
        return await this.request('DELETE', endpoint);
    }

    /**
     * Método base para realizar solicitudes
     */
    async request(metodo, endpoint, datos = null) {
        const url = `${this.baseUrl}${endpoint}`;
        const opciones = {
            method: metodo,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        if (datos) {
            opciones.body = JSON.stringify(datos);
        }

        try {
            const response = await fetch(url, opciones);

            // Manejar respuestas no exitosas
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || `Error ${response.status}`);
            }

            // Si no hay contenido, retornar null
            if (response.status === 204) {
                return null;
            }

            // Intentar parsear como JSON
            try {
                return await response.json();
            } catch (e) {
                return response.text();
            }

        } catch (error) {
            console.error(`Error en ${metodo} ${endpoint}:`, error);
            throw error;
        }
    }
}

// Instancia global del cliente API
window.api = new API();
