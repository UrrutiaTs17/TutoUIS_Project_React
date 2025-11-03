import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

function Login() {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [errorLogin, setErrorLogin] = useState(null);
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated, isAdmin } = useAuth();

  // Si ya está autenticado, redirigir al dashboard correspondiente
  useEffect(() => {
    if (isAuthenticated()) {
      if (isAdmin()) {
        navigate('/admin-dashboard', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const togglePassword = () => {
    setMostrarContrasena(!mostrarContrasena);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setErrorLogin(null);

    // Validar campos vacíos
    if (!usuario || !contrasena) {
      setErrorLogin('Por favor ingrese código de estudiante y contraseña');
      setCargando(false);
      return;
    }

    try {
      const result = await login(usuario, contrasena);
      
      if (result.success) {
        console.log('✅ Login exitoso:', result.user);
        
        // Redirigir según el rol del usuario
        if (result.user.rol && result.user.rol.nombre) {
          const rolNombre = result.user.rol.nombre.toLowerCase();
          
          if (rolNombre === 'administrador' || rolNombre === 'admin') {
            navigate('/admin-dashboard');
          } else {
            navigate('/dashboard');
          }
        } else {
          // Si no tiene rol definido, ir al dashboard normal
          navigate('/dashboard');
        }
      } else {
        setErrorLogin(result.error || 'Error al iniciar sesión');
        setCargando(false);
      }
    } catch (error) {
      console.error('❌ Error en login:', error);
      setErrorLogin('Error inesperado al iniciar sesión');
      setCargando(false);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100" style={{ background: 'linear-gradient(135deg, #e9f7ef 60%, #f8f9fa 100%)' }}>
      <div className="flex-grow-1 d-flex justify-content-center align-items-center p-3">
        <div className="card shadow-lg" style={{ maxWidth: '420px', width: '100%', borderRadius: '16px', border: 'none' }}>
          {/* Header con Logo */}
          <div className="text-center p-4" style={{ borderBottom: '2px solid #e9f7ef' }}>
            <img src="/TutoUIS_Logo.png" alt="Logo TutoUIS" className="mb-3" style={{ maxWidth: '120px', height: 'auto' }} />
            <h1 className="text-success fw-bold mb-1" style={{ fontSize: '1.8rem' }}>TutoUIS</h1>
            <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>Sistema de Reserva de Tutorías</p>
          </div>

          {/* Formulario de Login */}
          <div className="p-4">
            <h5 className="text-dark fw-bold mb-3">Iniciar Sesión</h5>

            {/* Mensaje de error */}
            {errorLogin && (
              <div className="alert alert-danger alert-dismissible fade show d-flex align-items-start mb-3" 
                   role="alert" 
                   style={{ borderRadius: '10px', borderLeft: '4px solid #dc3545', backgroundColor: '#ffe6e6', boxShadow: '0 2px 8px rgba(220, 53, 69, 0.2)' }}>
                <i className="bi bi-exclamation-triangle-fill me-3 text-danger" style={{ fontSize: '1.5rem', flexShrink: 0 }}></i>
                <div style={{ fontSize: '0.95rem', lineHeight: '1.5', color: '#721c24', flexGrow: 1 }}>
                  <strong style={{ display: 'block', marginBottom: '4px' }}>⚠️ Error de Autenticación</strong>
                  {errorLogin}
                </div>
                <button type="button" className="btn-close" onClick={() => setErrorLogin(null)} aria-label="Close" style={{ padding: '0.5rem' }}></button>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Campo Código de Estudiante */}
              <div className="mb-3">
                <label htmlFor="codigo" className="form-label fw-semibold text-dark" style={{ fontSize: '0.95rem' }}>
                  <i className="bi bi-person-badge me-2 text-success"></i>Código de Estudiante
                </label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="codigo"
                  placeholder="Ej: 2180254"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  required
                  disabled={cargando}
                  style={{ borderRadius: '8px', border: '1px solid #d0d0d0', padding: '10px 12px' }}
                />
              </div>

              {/* Campo Contraseña */}
              <div className="mb-4 position-relative">
                <label htmlFor="contrasena" className="form-label fw-semibold text-dark" style={{ fontSize: '0.95rem' }}>
                  <i className="bi bi-key me-2 text-success"></i>Contraseña
                </label>
                <input
                  type={mostrarContrasena ? 'text' : 'password'}
                  className="form-control"
                  id="contrasena"
                  placeholder="Ingrese su contraseña"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  required
                  disabled={cargando}
                  style={{ borderRadius: '8px', border: '1px solid #d0d0d0', padding: '10px 12px' }}
                />

                <button
                  type="button"
                  className="btn position-absolute top-50 end-0 translate-middle-y me-3 border-0 bg-transparent"
                  onClick={togglePassword}
                  disabled={cargando}
                  style={{ marginTop: '8px' }}
                >
                  <i className={`bi ${mostrarContrasena ? 'bi-eye-slash text-success' : 'bi-eye text-muted'}`} style={{ fontSize: '1.1rem' }}></i>
                </button>
              </div>

              {/* Botón Acceder */}
              <div className="d-grid mb-3">
                <button 
                  type="submit" 
                  className="btn btn-success fw-bold"
                  disabled={cargando || !usuario || !contrasena}
                  style={{ padding: '12px', borderRadius: '8px', fontSize: '1rem' }}
                >
                  {cargando && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>}
                  {cargando ? 'Iniciando sesión...' : 'Acceder'}
                </button>
              </div>

              {/* Enlace Olvidé Contraseña */}
              <div className="text-center mb-3">
              </div>
            </form>

            <hr style={{ margin: '1rem 0' }} />

            {/* Panel de Instrucciones */}
            <div className="alert alert-light border border-success" style={{ borderRadius: '8px', backgroundColor: '#f0fdf4' }}>
              <div className="d-flex align-items-center mb-2">
                <i className="bi bi-info-circle-fill text-success me-2" style={{ fontSize: '1.2rem' }}></i>
                <strong className="text-success">Instrucciones de Acceso</strong>
              </div>
              <ul className="mb-0" style={{ fontSize: '0.85rem', color: '#333' }}>
                <li className="mb-1">
                  <strong className="text-success">Código:</strong> Utilice su código de estudiante de la UIS
                </li>
                <li className="mb-1">
                  <strong className="text-success">Contraseña:</strong> La misma del Módulo de Estudiantes
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
