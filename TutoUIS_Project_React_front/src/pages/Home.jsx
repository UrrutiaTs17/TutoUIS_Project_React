import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import './Home.css';

function Home() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="home-bg flex-grow-1 d-flex flex-column justify-content-center align-items-center" style={{ background: 'linear-gradient(135deg, #e9f7ef 60%, #f8f9fa 100%)', padding: '20px' }}>
        <div className="card shadow-lg animate__animated animate__fadeIn" style={{ maxWidth: '800px', width: '100%', borderRadius: '18px', padding: '30px' }}>
          <h1 className="mb-3 text-success fw-bold text-center">Reserva tus tutorías con TutoUIS</h1>
          <div className="text-center mb-3">
            <img
              src="/TutoUIS_Logo.png"
              alt="Logo UIS"
              className="img-fluid"
              style={{ maxWidth: '180px' }}
            />
          </div>
          <p className="lead mb-4 text-secondary text-center">
            Accede a nuestra plataforma para reservar tutorías y gestionar tus sesiones de apoyo académico en la Universidad Industrial de Santander.
          </p>

          <div className="row g-2 mb-4">
            <div className="col-12 col-md-4">
              <div className="card border-0 shadow-sm p-3 h-100 text-center animate__animated animate__fadeInUp" style={{ borderRadius: '12px' }}>
                <i className="bi bi-calendar-check text-success mb-2" style={{ fontSize: '2rem' }}></i>
                <div className="fw-semibold">Reserva fácil</div>
                <small className="text-muted">Elige tu tutoría en segundos.</small>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="card border-0 shadow-sm p-3 h-100 text-center animate__animated animate__fadeInUp" style={{ borderRadius: '12px', animationDelay: '0.2s' }}>
                <i className="bi bi-clock-history text-primary mb-2" style={{ fontSize: '2rem' }}></i>
                <div className="fw-semibold">Gestión rápida</div>
                <small className="text-muted">Administra tus reservas fácilmente.</small>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="card border-0 shadow-sm p-3 h-100 text-center animate__animated animate__fadeInUp" style={{ borderRadius: '12px', animationDelay: '0.4s' }}>
                <i className="bi bi-shield-check text-warning mb-2" style={{ fontSize: '2rem' }}></i>
                <div className="fw-semibold">Seguro y confiable</div>
                <small className="text-muted">Tus datos siempre protegidos.</small>
              </div>
            </div>
          </div>

          <Link to="/login" className="btn btn-success btn-lg shadow-sm animate__animated animate__pulse animate__infinite w-100" style={{ borderRadius: '8px' }}>
            <i className="bi bi-person-plus me-2"></i>Inicia Sesión
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
