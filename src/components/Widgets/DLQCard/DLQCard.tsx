import { useState } from 'react';
import type { KafkaDLQDTO } from '@/models/events/api';
import { formatDateTime, decodePayload } from '@/utils/formatters';
import './Styles.scss';

interface DLQCardProps {
  dlq: KafkaDLQDTO;
}

const DLQCard = ({ dlq }: DLQCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="card dlq-card">
      <div className="card-content">
        <div className="dlq-header">
          <span className="tag is-danger is-light">
            <span className="icon"><i className="fas fa-exclamation-circle"></i></span>
            <span>Ошибка в {dlq.topic}</span>
          </span>
          <span className="has-text-grey-light is-size-7">
            {formatDateTime(dlq.received_at)}
          </span>
        </div>

        <div className="notification is-danger is-light error-message">
          <strong>Ошибка:</strong>
          <p>{dlq.error}</p>
        </div>

        <div className="dlq-meta">
          <p><strong>ID:</strong> {dlq.id}</p>
          <p><strong>Ключ:</strong> <code>{dlq.key}</code></p>
        </div>

        <div className="payload-section">
          <details open={isOpen}>
            <summary 
              className="button is-small is-danger is-light"
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(!isOpen);
              }}
            >
              <span className="icon"><i className="fas fa-code"></i></span>
              <span>{isOpen ? 'Скрыть payload' : 'Показать payload с ошибкой'}</span>
            </summary>
            {isOpen && <pre className="payload-content">{decodePayload(dlq.payload)}</pre>}
          </details>
        </div>
      </div>
    </div>
  );
};

export default DLQCard;
