import axios from 'axios';

const API_URL = 'http://localhost:8080/api/usuarios';

export const authService = {
  /**
   * 
   * @param {string} codigo - Código de estudiante
   * @param {string} contrasena - Contraseña de usuario
   * @returns {Promise} - Datos del usuario autenticado
   */
  async login(codigo, contrasena) {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        codigo,
        contrasena
      });
      
      if (response.data) {
        // Guardar usuario en localStorage
        localStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
      }
      
      throw new Error('No se recibió respuesta del servidor');
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.error || 'Credenciales inválidas');
      } else if (error.request) {
        throw new Error('No se pudo conectar con el servidor. Verifique que el backend esté ejecutándose.');
      } else {n
        throw new Error(error.message || 'Error al iniciar sesión');
      }
    }
  },

  /**
   * Cierra la sesión del usuario
   */
  logout() {
    localStorage.removeItem('user');
  },

  /**
   * 
   * @returns {Object|null} - Datos del usuario o null si no está autenticado
   */
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        console.error('Error parsing user data:', error);
        return null;
      }
    }
    return null;
  },

  /**
   * Verifica si hay un usuario autenticado
   * @returns {boolean}
   */
  isAuthenticated() {
    return this.getCurrentUser() !== null;
  },

  /**
   * Obtiene el rol del usuario actual
   * @returns {string|null} - Nombre del rol o null
   */
  getUserRole() {
    const user = this.getCurrentUser();
    if (user && user.rol && user.rol.nombre) {
      return user.rol.nombre;
    }
    return null;
  },

  /**
   * Verifica si el usuario es administrador
   * @returns {boolean}
   */
  isAdmin() {
    const role = this.getUserRole();
    return role === 'Administrador' || role === 'ADMIN';
  }
};

export default authService;
