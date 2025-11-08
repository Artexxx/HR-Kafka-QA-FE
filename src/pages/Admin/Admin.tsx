import { useState } from 'react';
import MainLayout from '@/components/Layouts/MainLayout';
import Card from '@/components/UI/Card';
import { resetData } from '@/api/admin';
import { toast } from 'sonner';
import './Styles.scss';

const Admin = () => {
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!confirm('⚠️ Это действие УДАЛИТ ВСЕ ДАННЫЕ из базы данных. Вы абсолютно уверены?')) {
      return;
    }

    if (!confirm('Это действие необратимо. Подтвердите ещё раз.')) {
      return;
    }

    const password = prompt('Введите пароль администратора для подтверждения очистки:');
    if (!password) {
      toast.error('Сброс отменён: пароль не введён');
      return;
    }

    try {
      setLoading(true);
      await resetData(password);
      toast.success('Все данные успешно сброшены');
    } catch (error: any) {
      const msg =
          error?.response?.status === 401 || error?.response?.status === 403
              ? 'Неверный пароль'
              : error?.response?.data?.message || error?.message || 'Не удалось сбросить данные';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
      <MainLayout>
        <div className="admin-page">
          <div className="page-header">
            <h1 className="title is-2">
            <span className="icon-text">
              <span className="icon has-text-danger"><i className="fas fa-cog"></i></span>
              <span>Панель администратора</span>
            </span>
            </h1>
            <p className="subtitle">Управление учебной средой</p>
          </div>

          <div className="columns">
            <div className="column is-8">
              <Card title="Опасная зона" subtitle="Деструктивные действия">
                <div className="notification is-danger is-light">
                  <p className="title is-5">⚠️ Сброс всех данных</p>
                  <p className="mb-4">
                    Это действие <strong>безвозвратно удалит</strong> все данные из базы данных:
                  </p>
                  <ul className="mb-4">
                    <li>✗ Все профили сотрудников</li>
                    <li>✗ Все записи истории работы</li>
                    <li>✗ Все события Kafka</li>
                    <li>✗ Все сообщения DLQ</li>
                  </ul>
                  <p className="has-text-weight-bold mb-4">
                    Это действие невозможно отменить!
                  </p>
                  <button
                      className={`button is-danger is-large ${loading ? 'is-loading' : ''}`}
                      onClick={handleReset}
                      disabled={loading}
                  >
                    <span className="icon"><i className="fas fa-exclamation-triangle"></i></span>
                    <span>Сбросить все данные</span>
                  </button>
                </div>
              </Card>
            </div>

            <div className="column is-4">
              <Card title="Информация">
                <div className="content">
                  <h4 className="title is-5">Когда использовать сброс?</h4>
                  <ul>
                    <li>При начале новой учебной сессии</li>
                    <li>Для очистки тестовых данных</li>
                    <li>Для возврата к начальному состоянию</li>
                  </ul>

                  <div className="notification is-info is-light mt-4">
                    <p>
                      <strong>Совет:</strong> Вы всегда можете пересоздать тестовые данные через страницу Продюсера.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </MainLayout>
  );
};

export default Admin;
