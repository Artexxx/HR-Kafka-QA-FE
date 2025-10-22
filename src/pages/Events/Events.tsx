import { useEffect, useState } from 'react';
import MainLayout from '@/components/Layouts/MainLayout';
import EventCard from '@/components/Widgets/EventCard';
import LoadingSpinner from '@/components/UI/LoadingSpinner';
import { getEvents } from '@/api/events';
import type { KafkaEventDTO } from '@/models/events/api';
import { toast } from 'sonner';
import './Styles.scss';

const Events = () => {
  const [events, setEvents] = useState<KafkaEventDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterTopic, setFilterTopic] = useState<string>('all');

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await getEvents();
      setEvents(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Failed to load events');
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
    const interval = setInterval(loadEvents, 5000); // Auto-refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const filteredEvents = filterTopic === 'all' 
    ? events 
    : events.filter(event => event.topic === filterTopic);

  const topics = Array.from(new Set(events.map(e => e.topic)));

  return (
    <MainLayout>
      <div className="events-page">
        <div className="page-header">
          <div>
            <h1 className="title is-2">
              <span className="icon-text">
                <span className="icon"><i className="fas fa-stream"></i></span>
                <span>Kafka Events</span>
              </span>
            </h1>
            <p className="subtitle">Monitor raw Kafka events in real-time</p>
          </div>
          <button className="button is-info" onClick={loadEvents}>
            <span className="icon"><i className="fas fa-sync-alt"></i></span>
            <span>Refresh</span>
          </button>
        </div>

        <div className="box">
          <div className="field">
            <label className="label">Filter by Topic</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select value={filterTopic} onChange={(e) => setFilterTopic(e.target.value)}>
                  <option value="all">All Topics ({events.length})</option>
                  {topics.map(topic => (
                    <option key={topic} value={topic}>
                      {topic} ({events.filter(e => e.topic === topic).length})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner fullPage />
        ) : filteredEvents.length === 0 ? (
          <div className="notification is-info is-light">
            <p className="has-text-centered">
              <span className="icon is-large">
                <i className="fas fa-info-circle fa-2x"></i>
              </span>
            </p>
            <p className="has-text-centered">
              No events found. Send events via Producer to see them here.
            </p>
          </div>
        ) : (
          <div className="events-list">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Events;
