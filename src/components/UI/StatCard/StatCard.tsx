import './Styles.scss';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: 'primary' | 'success' | 'danger' | 'warning' | 'info';
  subtitle?: string;
}

const StatCard = ({ title, value, icon, color, subtitle }: StatCardProps) => {
  const colorMap = {
    primary: 'hsl(262, 52%, 47%)',
    success: 'hsl(142, 76%, 36%)',
    danger: 'hsl(0, 84%, 60%)',
    warning: 'hsl(38, 92%, 50%)',
    info: 'hsl(199, 89%, 48%)',
  };

  return (
    <div className="stat-card">
      <div className="stat-content">
        <div className="stat-text">
          <p className="stat-title">{title}</p>
          <p className="stat-value">{value}</p>
          {subtitle && <p className="stat-subtitle">{subtitle}</p>}
        </div>
        <div className="stat-icon" style={{ color: colorMap[color] }}>
          <i className={icon}></i>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
