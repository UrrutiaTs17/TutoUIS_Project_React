import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AdminDashboard.css';

function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [currentPageTitle, setCurrentPageTitle] = useState('Panel Administrativo');

  // Datos del usuario
  const userName = user ? `${user.nombre || ''} ${user.apellido || ''}`.trim() : 'Administrador';
  const userEmail = user?.correo || 'admin@example.com';
  const userInitials = userName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  // Estadísticas de ejemplo
  const [stats, setStats] = useState({
    totalUsers: 156,
    activeReservations: 42,
    totalRooms: 15,
    pendingApprovals: 8
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSetActiveSection = (section) => {
    setActiveSection(section);
    setIsSidebarOpen(false);
    
    const titles = {
      'inicio': 'Panel Administrativo',
      'usuarios': 'Gestión de Usuarios',
      'reservas': 'Gestión de Reservas',
      'salas': 'Gestión de Salas',
      'horarios': 'Gestión de Horarios',
      'reportes': 'Reportes',
      'configuracion': 'Configuración del Sistema'
    };
    setCurrentPageTitle(titles[section] || 'Panel Administrativo');
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
      <aside className="sidebar admin-sidebar">
        <div className="sidebar-header">
          <img src="/TutoUIS_Logo.png" alt="Logo TutoUIS" className="logo-sidebar" />
          <div className="admin-badge">
            <i className="bi bi-shield-check me-1"></i>
            ADMIN
          </div>
        </div>

        <div className="user-profile">
          <div className="avatar admin-avatar">{userInitials}</div>
          <h6 className="user-name">{userName}</h6>
          <small className="user-email">{userEmail}</small>
        </div>

        <nav className="nav-menu">
          <a 
            className={`nav-item ${activeSection === 'inicio' ? 'active' : ''}`}
            onClick={() => handleSetActiveSection('inicio')}
          >
            <i className="bi bi-speedometer2"></i>
            <span>Dashboard</span>
          </a>
          <a 
            className={`nav-item ${activeSection === 'usuarios' ? 'active' : ''}`}
            onClick={() => handleSetActiveSection('usuarios')}
          >
            <i className="bi bi-people"></i>
            <span>Usuarios</span>
          </a>
          <a 
            className={`nav-item ${activeSection === 'reservas' ? 'active' : ''}`}
            onClick={() => handleSetActiveSection('reservas')}
          >
            <i className="bi bi-calendar-check"></i>
            <span>Reservas</span>
          </a>
          <a 
            className={`nav-item ${activeSection === 'salas' ? 'active' : ''}`}
            onClick={() => handleSetActiveSection('salas')}
          >
            <i className="bi bi-building"></i>
            <span>Salas</span>
          </a>
          <a 
            className={`nav-item ${activeSection === 'horarios' ? 'active' : ''}`}
            onClick={() => handleSetActiveSection('horarios')}
          >
            <i className="bi bi-clock"></i>
            <span>Horarios</span>
          </a>
          <a 
            className={`nav-item ${activeSection === 'reportes' ? 'active' : ''}`}
            onClick={() => handleSetActiveSection('reportes')}
          >
            <i className="bi bi-bar-chart"></i>
            <span>Reportes</span>
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
              <span className="notification-badge">{stats.pendingApprovals}</span>
            </button>
            <button className="btn btn-icon" title="Configuración">
              <i className="bi bi-gear"></i>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="content-area">
          {/* Sección: Inicio */}
          {activeSection === 'inicio' && (
            <div className="section-content">
              {/* Alert de pendientes */}
              {stats.pendingApprovals > 0 && (
                <div className="alert alert-warning mb-4">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  Tienes <strong>{stats.pendingApprovals}</strong> aprobación(es) pendiente(s)
                </div>
              )}

              {/* Admin Stats */}
              <div className="row g-3 mb-4">
                <div className="col-md-3 col-sm-6">
                  <div className="stat-card admin-stat-card">
                    <div className="stat-icon bg-primary">
                      <i className="bi bi-people"></i>
                    </div>
                    <div className="stat-info">
                      <h4>{stats.totalUsers}</h4>
                      <p>Usuarios Totales</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6">
                  <div className="stat-card admin-stat-card">
                    <div className="stat-icon bg-success">
                      <i className="bi bi-calendar-check"></i>
                    </div>
                    <div className="stat-info">
                      <h4>{stats.activeReservations}</h4>
                      <p>Reservas Activas</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6">
                  <div className="stat-card admin-stat-card">
                    <div className="stat-icon bg-info">
                      <i className="bi bi-building"></i>
                    </div>
                    <div className="stat-info">
                      <h4>{stats.totalRooms}</h4>
                      <p>Salas Disponibles</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6">
                  <div className="stat-card admin-stat-card">
                    <div className="stat-icon bg-warning">
                      <i className="bi bi-hourglass-split"></i>
                    </div>
                    <div className="stat-info">
                      <h4>{stats.pendingApprovals}</h4>
                      <p>Pendientes</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bienvenida Admin */}
              <div className="card">
                <div className="card-body text-center py-5">
                  <i className="bi bi-shield-check text-primary mb-3" style={{ fontSize: '4rem' }}></i>
                  <h3 className="text-primary mb-3">Panel de Administración</h3>
                  <p className="text-muted mb-4">
                    Bienvenido al panel de administración de TutoUIS. Desde aquí puedes gestionar todos los aspectos del sistema.
                  </p>
                  <div className="d-flex gap-3 justify-content-center flex-wrap">
                    <button 
                      className="btn btn-primary"
                      onClick={() => handleSetActiveSection('usuarios')}
                    >
                      <i className="bi bi-people me-2"></i>
                      Gestionar Usuarios
                    </button>
                    <button 
                      className="btn btn-success"
                      onClick={() => handleSetActiveSection('reservas')}
                    >
                      <i className="bi bi-calendar-check me-2"></i>
                      Ver Reservas
                    </button>
                    <button 
                      className="btn btn-info"
                      onClick={() => handleSetActiveSection('reportes')}
                    >
                      <i className="bi bi-bar-chart me-2"></i>
                      Ver Reportes
                    </button>
                  </div>
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
                  <h4 className="mb-3">Módulo en Desarrollo</h4>
                  <p className="text-muted">
                    El módulo <strong>{currentPageTitle}</strong> estará disponible próximamente.
                  </p>
                  <button 
                    className="btn btn-outline-secondary mt-3"
                    onClick={() => handleSetActiveSection('inicio')}
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Volver al Dashboard
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

export default AdminDashboard;
