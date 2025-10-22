import './Styles.scss';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: 'primary' | 'success' | 'danger' | 'warning' | 'info';
  subtitle?: string;
}

const StatCard = ({ title, value, icon, color, subtitle }: StatCardProps) => {
  return (
    <div className={`stat-card has-background-${color}`}>
      <div className="stat-content">
        <div className="stat-text">
          <p className="stat-title">{title}</p>
          <p className="stat-value">{value}</p>
          {subtitle && <p className="stat-subtitle">{subtitle}</p>}
        </div>
        <div className="stat-icon">
          <i className={icon}></i>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
