import type { KafkaEventDTO } from '@/models/events/api';
import { formatDateTime, decodePayload } from '@/utils/formatters';
import './Styles.scss';

interface EventCardProps {
  event: KafkaEventDTO;
}

const EventCard = ({ event }: EventCardProps) => {
  const getTopicColor = (topic: string) => {
    if (topic.includes('personal')) return 'is-info';
    if (topic.includes('position')) return 'is-success';
    if (topic.includes('history')) return 'is-warning';
    return 'is-light';
  };

  return (
    <div className="card event-card">
      <div className="card-content">
        <div className="event-header">
          <span className={`tag ${getTopicColor(event.topic)}`}>
            <span className="icon"><i className="fas fa-stream"></i></span>
            <span>{event.topic}</span>
          </span>
          <span className="has-text-grey-light is-size-7">
            {formatDateTime(event.received_at)}
          </span>
        </div>

        <div className="event-meta">
          <div className="columns is-mobile">
            <div className="column">
              <span className="icon-text">
                <span className="icon has-text-info"><i className="fas fa-hashtag"></i></span>
                <span><strong>ID:</strong> {event.id}</span>
              </span>
            </div>
            <div className="column">
              <span className="icon-text">
                <span className="icon has-text-warning"><i className="fas fa-layer-group"></i></span>
                <span><strong>Партиция:</strong> {event.partition}</span>
              </span>
            </div>
            <div className="column">
              <span className="icon-text">
                <span className="icon has-text-success"><i className="fas fa-sort-numeric-up"></i></span>
                <span><strong>Offset:</strong> {event.offset}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="message-id">
          <strong>ID сообщения:</strong> 
          <code>{event.message_id}</code>
        </div>

        <div className="payload-section">
          <details>
            <summary className="button is-small is-light">
              <span className="icon"><i className="fas fa-code"></i></span>
              <span>Показать Payload</span>
            </summary>
            <pre className="payload-content">{decodePayload(event.payload)}</pre>
          </details>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
