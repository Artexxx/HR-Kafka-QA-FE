import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Styles.scss';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="main-layout">
      {/* Mobile hamburger button */}
      <button 
        className="mobile-menu-toggle" 
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
      </button>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={closeMobileMenu}></div>
      )}

      <aside className={`menu main-sidebar ${isMobileMenuOpen ? 'is-active' : ''}`}>
        <div className="sidebar-header">
          <h1 className="title is-4 has-text-white">
            <span className="icon-text">
              <span className="icon">
                <i className="fas fa-stream"></i>
              </span>
              <span>Kafka QA Тренажёр</span>
            </span>
          </h1>
        </div>
        
        <ul className="menu-list">
          <li>
            <Link to="/" className={isActive('/') ? 'is-active' : ''} onClick={closeMobileMenu}>
              <span className="icon-text">
                <span className="icon"><i className="fas fa-tachometer-alt"></i></span>
                <span>Дашборд</span>
              </span>
            </Link>
          </li>
          <li>
            <Link to="/profiles" className={isActive('/profiles') ? 'is-active' : ''} onClick={closeMobileMenu}>
              <span className="icon-text">
                <span className="icon"><i className="fas fa-users"></i></span>
                <span>Профили</span>
              </span>
            </Link>
          </li>
          <li>
            <Link to="/events" className={isActive('/events') ? 'is-active' : ''} onClick={closeMobileMenu}>
              <span className="icon-text">
                <span className="icon"><i className="fas fa-stream"></i></span>
                <span>События</span>
              </span>
            </Link>
          </li>
          <li>
            <Link to="/dlq" className={isActive('/dlq') ? 'is-active' : ''} onClick={closeMobileMenu}>
              <span className="icon-text">
                <span className="icon"><i className="fas fa-exclamation-triangle"></i></span>
                <span>DLQ</span>
              </span>
            </Link>
          </li>
          <li>
            <Link to="/producer" className={isActive('/producer') ? 'is-active' : ''} onClick={closeMobileMenu}>
              <span className="icon-text">
                <span className="icon"><i className="fas fa-paper-plane"></i></span>
                <span>Продюсер</span>
              </span>
            </Link>
          </li>
        </ul>

        <div className="sidebar-footer">
          <Link to="/admin" className="button is-danger is-fullwidth">
            <span className="icon"><i className="fas fa-cog"></i></span>
            <span>Админ</span>
          </Link>
        </div>
      </aside>

      <div className="main-content">
        <div className="container is-fluid">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
