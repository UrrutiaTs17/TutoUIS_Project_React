import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [currentPageTitle, setCurrentPageTitle] = useState('Dashboard');

  // Datos del usuario
  const userName = user ? `${user.nombre || ''} ${user.apellido || ''}`.trim() : 'Usuario';
  const userEmail = user?.correo || 'correo@example.com';
  const userInitials = userName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
 
  const [stats, setStats] = useState({
    activeReservationsCount: 3,
    upcomingReservationsCount: 5,
    completedReservationsCount: 12,
    favoriteRoomsCount: 2,
    todayReservations: 1
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSetActiveSection = (section) => {
    setActiveSection(section);
    setIsSidebarOpen(false); 
    

    const titles = {
      'inicio': 'Dashboard',
      'nueva-reserva': 'Nueva Reserva',
      'mis-reservas': 'Mis Reservas',
      'historial': 'Historial',
      'perfil': 'Mi Perfil',
      'configuracion': 'Configuración'
    };
    setCurrentPageTitle(titles[section] || 'Dashboard');
  };

  const handleLogout = () => {
    if (window.confirm('¿Está seguro que desea cerrar sesión?')) {
      logout();
      navigate('/login');
    }
  };

  return (
    <div className={`dashboard-layout ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src="/TutoUIS_Logo.png" alt="Logo TutoUIS" className="logo-sidebar" />
        </div>

        <div className="user-profile">
          <div className="avatar">{userInitials}</div>
          <h6 className="user-name">{userName}</h6>
          <small className="user-email">{userEmail}</small>
        </div>

        <nav className="nav-menu">
          <a 
            className={`nav-item ${activeSection === 'inicio' ? 'active' : ''}`}
            onClick={() => handleSetActiveSection('inicio')}
          >
            <i className="bi bi-house-door"></i>
            <span>Inicio</span>
          </a>
          <a 
            className={`nav-item ${activeSection === 'nueva-reserva' ? 'active' : ''}`}
            onClick={() => handleSetActiveSection('nueva-reserva')}
          >
            <i className="bi bi-calendar-plus"></i>
            <span>Nueva Reserva</span>
          </a>
          <a 
            className={`nav-item ${activeSection === 'mis-reservas' ? 'active' : ''}`}
            onClick={() => handleSetActiveSection('mis-reservas')}
          >
            <i className="bi bi-list-ul"></i>
            <span>Mis Reservas</span>
          </a>
          <a 
            className={`nav-item ${activeSection === 'historial' ? 'active' : ''}`}
            onClick={() => handleSetActiveSection('historial')}
          >
            <i className="bi bi-clock-history"></i>
            <span>Historial</span>
          </a>
          <a 
            className={`nav-item ${activeSection === 'perfil' ? 'active' : ''}`}
            onClick={() => handleSetActiveSection('perfil')}
          >
            <i className="bi bi-person"></i>
            <span>Mi Perfil</span>
          </a>
          <a 
            className={`nav-item ${activeSection === 'configuracion' ? 'active' : ''}`}
            onClick={() => handleSetActiveSection('configuracion')}
          >
            <i className="bi bi-gear"></i>
            <span>Configuración</span>
          </a>
        </nav>

        <div className="sidebar-footer">
          <button className="btn btn-outline-light btn-sm w-100" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right me-2"></i>Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Bar */}
        <div className="top-bar">
          <div className="top-bar-left">
            <button className="btn btn-link mobile-menu-toggle" onClick={toggleSidebar}>
              <i className="bi bi-list"></i>
            </button>
            <h3 className="page-title">{currentPageTitle}</h3>
          </div>
          <div className="top-bar-right">
            <button className="btn btn-icon" title="Notificaciones">
              <i className="bi bi-bell"></i>
              <span className="notification-badge">3</span>
            </button>
            <button className="btn btn-icon" title="Ayuda">
              <i className="bi bi-question-circle"></i>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="content-area">
          {/* Sección: Inicio */}
          {activeSection === 'inicio' && (
            <div className="section-content">
              {/* Alert de notificaciones */}
              {stats.todayReservations > 0 && (
                <div className="alert alert-info mb-4">
                  <i className="bi bi-info-circle me-2"></i>
                  Tienes <strong>{stats.todayReservations}</strong> reserva(s) para hoy
                </div>
              )}

              {/* Quick Stats */}
              <div className="row g-3 mb-4">
                <div className="col-md-3 col-sm-6">
                  <div className="stat-card">
                    <div className="stat-icon bg-success">
                      <i className="bi bi-calendar-check"></i>
                    </div>
                    <div className="stat-info">
                      <h4>{stats.activeReservationsCount}</h4>
                      <p>Reservas Activas</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6">
                  <div className="stat-card">
                    <div className="stat-icon bg-primary">
                      <i className="bi bi-clock-history"></i>
                    </div>
                    <div className="stat-info">
                      <h4>{stats.upcomingReservationsCount}</h4>
                      <p>Próximas</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6">
                  <div className="stat-card">
                    <div className="stat-icon bg-warning">
                      <i className="bi bi-bookmark-check"></i>
                    </div>
                    <div className="stat-info">
                      <h4>{stats.completedReservationsCount}</h4>
                      <p>Completadas</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6">
                  <div className="stat-card">
                    <div className="stat-icon bg-danger">
                      <i className="bi bi-star"></i>
                    </div>
                    <div className="stat-info">
                      <h4>{stats.favoriteRoomsCount}</h4>
                      <p>Favoritos</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bienvenida */}
              <div className="card">
                <div className="card-body text-center py-5">
                  <i className="bi bi-check-circle-fill text-success mb-3" style={{ fontSize: '4rem' }}></i>
                  <h3 className="text-success mb-3">¡Bienvenido a TutoUIS!</h3>
                  <p className="text-muted mb-4">
                    Has iniciado sesión correctamente. Desde aquí puedes gestionar tus reservas de tutorías.
                  </p>
                  <button 
                    className="btn btn-success btn-lg"
                    onClick={() => handleSetActiveSection('nueva-reserva')}
                  >
                    <i className="bi bi-calendar-plus me-2"></i>
                    Hacer una Nueva Reserva
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Otras secciones */}
          {activeSection !== 'inicio' && (
            <div className="section-content">
              <div className="card">
                <div className="card-body text-center py-5">
                  <i className="bi bi-tools text-warning mb-3" style={{ fontSize: '3rem' }}></i>
                  <h4 className="mb-3">Sección en Desarrollo</h4>
                  <p className="text-muted">
                    La sección <strong>{currentPageTitle}</strong> estará disponible próximamente.
                  </p>
                  <button 
                    className="btn btn-outline-secondary mt-3"
                    onClick={() => handleSetActiveSection('inicio')}
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Volver al Inicio
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
