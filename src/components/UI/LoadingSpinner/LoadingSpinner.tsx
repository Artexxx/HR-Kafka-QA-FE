import './Styles.scss';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  fullPage?: boolean;
}

const LoadingSpinner = ({ size = 'medium', fullPage = false }: LoadingSpinnerProps) => {
  const sizeClass = size === 'small' ? 'is-small' : size === 'large' ? 'is-large' : '';
  
  const spinner = (
    <div className={`spinner ${sizeClass}`}>
      <div className="spinner-border"></div>
    </div>
  );

  if (fullPage) {
    return (
      <div className="loading-overlay">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;
