import type { EmploymentHistoryDTO } from '@/models/history/api';
import { formatDate } from '@/utils/formatters';
import './Styles.scss';

interface HistoryItemProps {
  history: EmploymentHistoryDTO;
}

const HistoryItem = ({ history }: HistoryItemProps) => {
  return (
    <div className="history-item">
      <div className="history-header">
        <h4 className="history-company">{history.company}</h4>
        <p className="history-position">{history.position}</p>
      </div>
      <div className="history-period">
        <span className="icon-text">
          <span className="icon"><i className="fas fa-calendar"></i></span>
          <span>{formatDate(history.period_from)} — {formatDate(history.period_to)}</span>
        </span>
      </div>
      {history.stack && history.stack.length > 0 && (
        <div className="history-stack">
          <div className="tags">
            {history.stack.map((tech, index) => (
              <span key={index} className="tag is-light">{tech}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryItem;
