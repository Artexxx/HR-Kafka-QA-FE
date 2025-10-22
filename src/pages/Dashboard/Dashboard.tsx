import { useEffect, useState } from 'react';
import MainLayout from '@/components/Layouts/MainLayout';
import Card from '@/components/UI/Card';
import StatCard from '@/components/UI/StatCard';
import LoadingSpinner from '@/components/UI/LoadingSpinner';
import { getProfiles } from '@/api/profiles';
import { getEvents, getDLQ } from '@/api/events';
import { checkHealth } from '@/api/admin';
import './Styles.scss';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    profiles: 0,
    events: 0,
    dlq: 0,
    health: 'unknown' as string,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [profilesData, eventsData, dlqData, healthData] = await Promise.all([
          getProfiles().catch(() => []),
          getEvents().catch(() => []),
          getDLQ().catch(() => []),
          checkHealth().catch(() => ({ status: 'error' })),
        ]);

        setStats({
          profiles: Array.isArray(profilesData) ? profilesData.length : 0,
          events: Array.isArray(eventsData) ? eventsData.length : 0,
          dlq: Array.isArray(dlqData) ? dlqData.length : 0,
          health: String(healthData.status || 'unknown'),
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <LoadingSpinner fullPage />;
  }

  return (
    <MainLayout>
      <div className="dashboard-page">
        <div className="page-header">
          <h1 className="title is-2">
            <span className="icon-text">
              <span className="icon"><i className="fas fa-tachometer-alt"></i></span>
              <span>Dashboard</span>
            </span>
          </h1>
          <p className="subtitle">Kafka HR Profiles Training Environment</p>
        </div>

        <div className="columns is-multiline">
          <div className="column is-3">
            <StatCard
              title="Employee Profiles"
              value={stats.profiles}
              icon="fas fa-users"
              color="info"
              subtitle="Total profiles in DB"
            />
          </div>
          <div className="column is-3">
            <StatCard
              title="Kafka Events"
              value={stats.events}
              icon="fas fa-stream"
              color="success"
              subtitle="Processed events"
            />
          </div>
          <div className="column is-3">
            <StatCard
              title="DLQ Messages"
              value={stats.dlq}
              icon="fas fa-exclamation-triangle"
              color="danger"
              subtitle="Failed messages"
            />
          </div>
          <div className="column is-3">
            <StatCard
              title="System Health"
              value={stats.health === 'ok' ? '✓ OK' : '✗ Error'}
              icon="fas fa-heartbeat"
              color={stats.health === 'ok' ? 'success' : 'danger'}
              subtitle="API status"
            />
          </div>
        </div>

        <div className="columns">
          <div className="column is-8">
            <Card title="About Kafka QA Trainer" subtitle="Learning environment for QA engineers">
              <div className="content">
                <p>
                  This training stand helps QA engineers understand and test Kafka message processing scenarios.
                  The system simulates an HR profile management system with three main topics:
                </p>
                
                <div className="tags are-medium">
                  <span className="tag is-info">hr.personal</span>
                  <span className="tag is-success">hr.positions</span>
                  <span className="tag is-warning">hr.history</span>
                </div>

                <h4 className="title is-5 mt-4">Key Testing Scenarios:</h4>
                <ul>
                  <li>✓ Message ordering and sequence validation</li>
                  <li>✓ Duplicate message detection</li>
                  <li>✓ Dead Letter Queue (DLQ) monitoring</li>
                  <li>✓ Consumer lag analysis</li>
                  <li>✓ Event payload validation</li>
                </ul>
              </div>
            </Card>
          </div>

          <div className="column is-4">
            <Card title="Quick Actions">
              <div className="buttons is-flex is-flex-direction-column">
                <a href="/producer" className="button is-primary is-fullwidth">
                  <span className="icon"><i className="fas fa-paper-plane"></i></span>
                  <span>Send Event</span>
                </a>
                <a href="/profiles" className="button is-info is-fullwidth">
                  <span className="icon"><i className="fas fa-users"></i></span>
                  <span>View Profiles</span>
                </a>
                <a href="/events" className="button is-success is-fullwidth">
                  <span className="icon"><i className="fas fa-stream"></i></span>
                  <span>Monitor Events</span>
                </a>
                <a href="/dlq" className="button is-danger is-fullwidth">
                  <span className="icon"><i className="fas fa-exclamation-triangle"></i></span>
                  <span>Check DLQ</span>
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
