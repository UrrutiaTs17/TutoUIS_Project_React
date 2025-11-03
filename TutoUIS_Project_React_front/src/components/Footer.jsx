import './Footer.css';

function Footer() {
  return (
    <footer className="modern-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-left">
            <div className="footer-logo">
              <img src="/TutoUIS_Logo.png" alt="Logo UIS" className="footer-logo-img" />
              <div className="footer-info">
                <h5 className="footer-title">TutoUIS</h5>
                <p className="footer-description">Sistema de reserva de tutorías - UIS</p>
              </div>
            </div>
          </div>
          
          <div className="footer-right">
            <a 
              href="https://github.com/UrrutiaTs17/TutoUIS-Project" 
              target="_blank" 
              rel="noopener noreferrer"
              className="github-link"
              title="Ver proyecto en GitHub"
            >
              <i className="bi bi-github"></i>
              <span>GitHub</span>
            </a>
            <p className="footer-copyright">© 2025 <strong>TutoUIS</strong></p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
