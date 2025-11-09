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
              <span>Дашборд</span>
            </span>
          </h1>
          <p className="subtitle">Учебная среда для тестирования Kafka HR-профилей</p>
        </div>

        <div className="columns is-multiline">
          <div className="column is-3">
            <StatCard
              title="Профили сотрудников"
              value={stats.profiles}
              icon="fas fa-users"
              color="info"
              subtitle="Всего профилей в БД"
            />
          </div>
          <div className="column is-3">
            <StatCard
              title="События Kafka"
              value={stats.events}
              icon="fas fa-stream"
              color="success"
              subtitle="Обработанные события"
            />
          </div>
          <div className="column is-3">
            <StatCard
              title="Сообщения DLQ"
              value={stats.dlq}
              icon="fas fa-exclamation-triangle"
              color="danger"
              subtitle="Ошибочные сообщения"
            />
          </div>
          <div className="column is-3">
            <StatCard
              title="Здоровье системы"
              value={stats.health === 'ok' ? '✓ OK' : '✗ Ошибка'}
              icon="fas fa-heartbeat"
              color={stats.health === 'ok' ? 'success' : 'danger'}
              subtitle="Статус API"
            />
          </div>
        </div>

        <div className="columns">
          <div className="column is-8">
            <Card title="О Kafka QA Тренажёре" subtitle="Учебная среда для QA-инженеров">
              <div className="content">
                <p>
                  Этот учебный стенд помогает QA-инженерам понимать и тестировать сценарии обработки сообщений Kafka.
                  Система симулирует управление HR-профилями с тремя основными топиками:
                </p>
                
                <div className="tags are-medium">
                  <span className="tag is-info">hr.personal</span>
                  <span className="tag is-success">hr.positions</span>
                  <span className="tag is-warning">hr.history</span>
                </div>

                <h4 className="title is-5 mt-4">Ключевые сценарии тестирования:</h4>
                <ul>
                  <li>✓ Проверка порядка и последовательности сообщений</li>
                  <li>✓ Обнаружение дубликатов сообщений</li>
                  <li>✓ Мониторинг Dead Letter Queue (DLQ)</li>
                  <li>✓ Анализ задержек консьюмеров</li>
                  <li>✓ Валидация payload событий</li>
                </ul>
              </div>
            </Card>
          </div>

          <div className="column is-4">
            <Card title="Быстрые действия">
              <div className="quick-action-buttons">
                <a href="/producer" className="button is-primary is-fullwidth">
                  <span className="icon"><i className="fas fa-paper-plane"></i></span>
                  <span>Отправить событие</span>
                </a>
                <a href="/profiles" className="button is-info is-fullwidth">
                  <span className="icon"><i className="fas fa-users"></i></span>
                  <span>Просмотр профилей</span>
                </a>
                <a href="/events" className="button is-success is-fullwidth">
                  <span className="icon"><i className="fas fa-stream"></i></span>
                  <span>Мониторинг событий</span>
                </a>
                <a href="/dlq" className="button is-danger is-fullwidth">
                  <span className="icon"><i className="fas fa-exclamation-triangle"></i></span>
                  <span>Проверить DLQ</span>
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
