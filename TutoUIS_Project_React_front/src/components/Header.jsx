import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header() {
  const location = useLocation();
  const isLoggedIn = false; 
  const usuario = ""; 

  const handleLogout = () => {
    
    console.log("Cerrando sesión...");
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg shadow-lg animate__animated animate__fadeInDown" style={{ background: 'linear-gradient(90deg, #e9f7ef 60%, #b7e4c7 100%)' }}>
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold text-success d-flex align-items-center" to="/" style={{ fontSize: '2rem', letterSpacing: '2px' }}>
            TutoUIS
          </Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarText"
            aria-controls="navbarText" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link 
                  className={`nav-link d-flex align-items-center animate__animated animate__fadeInLeft menu-btn ${location.pathname === '/' ? 'active-reserva' : ''}`}
                  to="/"
                >
                  <i className="bi bi-house-door me-1 fs-5"></i> 
                  <span className="d-none d-md-inline">Inicio</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className={`nav-link d-flex align-items-center animate__animated animate__fadeInLeft menu-btn ${location.pathname === '/login' ? 'active-reserva' : ''}`}
                  to="/login"
                >
                  <i className="bi bi-question-circle me-1 fs-5"></i> 
                  <span className="d-none d-md-inline">Información</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className={`nav-link d-flex align-items-center animate__animated animate__fadeInLeft menu-btn ${location.pathname === '/users' ? 'active-reserva' : ''}`}
                  to="/users"
                >
                  <i className="bi bi-people me-1 fs-5"></i>
                  <span className="d-none d-md-inline">Usuarios</span>
                </Link>
              </li>
            </ul>
            
            {/* Menú de usuario logueado */}
            {isLoggedIn && (
              <div className="d-flex align-items-center gap-2">
                {/* Información del usuario */}
                <span className="text-success fw-semibold">{usuario}</span>
                
                {/* Botón de logout */}
                <button 
                  className="btn btn-outline-danger btn-sm animate__animated animate__fadeInRight"
                  onClick={handleLogout}
                  title="Cerrar Sesión" 
                  data-bs-toggle="tooltip" 
                  data-bs-placement="bottom"
                >
                  <i className="bi bi-box-arrow-right"></i>
                </button>
              </div>
            )}

            {/* Botón de login (solo si no está logueado) */}
            {!isLoggedIn && (
              <div>
                <Link to="/login" className="btn btn-success btn-sm animate__animated animate__fadeInRight fw-semibold">
                  <i className="bi bi-person-fill me-2"></i>Iniciar Sesión
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
