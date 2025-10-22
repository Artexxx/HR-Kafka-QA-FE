import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Styles.scss';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="main-layout">
      <aside className="menu main-sidebar">
        <div className="sidebar-header">
          <h1 className="title is-4 has-text-white">
            <span className="icon-text">
              <span className="icon">
                <i className="fas fa-stream"></i>
              </span>
              <span>Kafka QA Trainer</span>
            </span>
          </h1>
        </div>
        
        <ul className="menu-list">
          <li>
            <Link to="/" className={isActive('/') ? 'is-active' : ''}>
              <span className="icon-text">
                <span className="icon"><i className="fas fa-tachometer-alt"></i></span>
                <span>Dashboard</span>
              </span>
            </Link>
          </li>
          <li>
            <Link to="/profiles" className={isActive('/profiles') ? 'is-active' : ''}>
              <span className="icon-text">
                <span className="icon"><i className="fas fa-users"></i></span>
                <span>Profiles</span>
              </span>
            </Link>
          </li>
          <li>
            <Link to="/events" className={isActive('/events') ? 'is-active' : ''}>
              <span className="icon-text">
                <span className="icon"><i className="fas fa-stream"></i></span>
                <span>Events</span>
              </span>
            </Link>
          </li>
          <li>
            <Link to="/dlq" className={isActive('/dlq') ? 'is-active' : ''}>
              <span className="icon-text">
                <span className="icon"><i className="fas fa-exclamation-triangle"></i></span>
                <span>DLQ</span>
              </span>
            </Link>
          </li>
          <li>
            <Link to="/producer" className={isActive('/producer') ? 'is-active' : ''}>
              <span className="icon-text">
                <span className="icon"><i className="fas fa-paper-plane"></i></span>
                <span>Producer</span>
              </span>
            </Link>
          </li>
        </ul>

        <div className="sidebar-footer">
          <Link to="/admin" className="button is-danger is-fullwidth">
            <span className="icon"><i className="fas fa-cog"></i></span>
            <span>Admin</span>
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
