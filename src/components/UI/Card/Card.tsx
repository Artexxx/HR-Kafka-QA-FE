import { ReactNode } from 'react';
import './Styles.scss';

interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  headerAction?: ReactNode;
}

const Card = ({ children, title, subtitle, className = '', headerAction }: CardProps) => {
  return (
    <div className={`card custom-card ${className}`}>
      {(title || subtitle || headerAction) && (
        <header className="card-header">
          <div className="card-header-title-wrapper">
            {title && <p className="card-header-title">{title}</p>}
            {subtitle && <p className="card-header-subtitle">{subtitle}</p>}
          </div>
          {headerAction && (
            <div className="card-header-action">
              {headerAction}
            </div>
          )}
        </header>
      )}
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

export default Card;
