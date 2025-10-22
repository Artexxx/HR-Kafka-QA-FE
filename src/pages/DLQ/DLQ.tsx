import { useEffect, useState } from 'react';
import MainLayout from '@/components/Layouts/MainLayout';
import DLQCard from '@/components/Widgets/DLQCard';
import LoadingSpinner from '@/components/UI/LoadingSpinner';
import { getDLQ } from '@/api/events';
import type { KafkaDLQDTO } from '@/models/events/api';
import { toast } from 'sonner';
import './Styles.scss';

const DLQ = () => {
  const [dlqMessages, setDlqMessages] = useState<KafkaDLQDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDLQ = async () => {
    try {
      setLoading(true);
      const data = await getDLQ();
      setDlqMessages(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Failed to load DLQ messages');
      setDlqMessages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDLQ();
    const interval = setInterval(loadDLQ, 5000); // Auto-refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <MainLayout>
      <div className="dlq-page">
        <div className="page-header">
          <div>
            <h1 className="title is-2">
              <span className="icon-text">
                <span className="icon has-text-danger"><i className="fas fa-exclamation-triangle"></i></span>
                <span>Dead Letter Queue</span>
              </span>
            </h1>
            <p className="subtitle">Monitor failed Kafka messages</p>
          </div>
          <button className="button is-danger" onClick={loadDLQ}>
            <span className="icon"><i className="fas fa-sync-alt"></i></span>
            <span>Refresh</span>
          </button>
        </div>

        {loading ? (
          <LoadingSpinner fullPage />
        ) : dlqMessages.length === 0 ? (
          <div className="notification is-success is-light">
            <p className="has-text-centered">
              <span className="icon is-large">
                <i className="fas fa-check-circle fa-2x"></i>
              </span>
            </p>
            <p className="has-text-centered">
              <strong>Great! No failed messages in DLQ.</strong><br />
              All events are being processed successfully.
            </p>
          </div>
        ) : (
          <>
            <div className="notification is-danger is-light">
              <strong>⚠️ {dlqMessages.length} message(s) failed processing</strong>
              <p className="mt-2">Review the errors below and fix the issues in your message format.</p>
            </div>
            <div className="dlq-list">
              {dlqMessages.map((dlq) => (
                <DLQCard key={dlq.id} dlq={dlq} />
              ))}
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default DLQ;
