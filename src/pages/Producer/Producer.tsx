import { useState } from 'react';
import MainLayout from '@/components/Layouts/MainLayout';
import Card from '@/components/UI/Card';
import { producePersonal, producePosition, produceHistory } from '@/api/producer';
import { generateUUID } from '@/utils/formatters';
import { GRADE_OPTIONS, DEPARTMENT_OPTIONS } from '@/constants/kafka';
import { toast } from 'sonner';
import './Styles.scss';

type EventType = 'personal' | 'position' | 'history';

const Producer = () => {
  const [eventType, setEventType] = useState<EventType>('personal');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    employee_id: 'e-1024',
    message_id: generateUUID(),
    
    // Personal
    first_name: 'Anna',
    last_name: 'Ivanova',
    email: 'anna@mail.ru',
    phone: '+7 916 123-45-67',
    birth_date: '1994-06-12',
    
    // Position
    title: 'QA Engineer',
    department: 'QA',
    grade: 'Middle',
    effective_from: new Date().toISOString().split('T')[0],
    
    // History
    company: 'OOO Romashka',
    position: 'QA Engineer',
    period_from: '2022-07-01',
    period_to: '2025-09-30',
    stack: 'Python, Pytest, PostgreSQL',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        message_id: formData.message_id,
        employee_id: formData.employee_id,
      };

      if (eventType === 'personal') {
        await producePersonal({
          ...data,
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          phone: formData.phone,
          birth_date: formData.birth_date,
        });
      } else if (eventType === 'position') {
        await producePosition({
          ...data,
          title: formData.title,
          department: formData.department,
          grade: formData.grade,
          effective_from: formData.effective_from,
        });
      } else if (eventType === 'history') {
        await produceHistory({
          ...data,
          company: formData.company,
          position: formData.position,
          period_from: formData.period_from,
          period_to: formData.period_to,
          stack: formData.stack.split(',').map(s => s.trim()),
        });
      }

      toast.success('Событие успешно отправлено в топик!');
      setFormData({ ...formData, message_id: generateUUID() });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Не удалось отправить событие');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="producer-page">
        <div className="page-header">
          <h1 className="title is-2">
            <span className="icon-text">
              <span className="icon"><i className="fas fa-paper-plane"></i></span>
              <span>Kafka Продюсер</span>
            </span>
          </h1>
          <p className="subtitle">Отправка событий в топики Kafka</p>
        </div>

        <div className="columns">
          <div className="column is-8">
            <Card title="Продюсер событий" subtitle="Создание и отправка событий в Kafka">
              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label className="label">Тип события</label>
                  <div className="control">
                    <div className="select is-fullwidth is-info">
                      <select value={eventType} onChange={(e) => setEventType(e.target.value as EventType)}>
                        <option value="personal">Персональные данные (hr.personal)</option>
                        <option value="position">Должность (hr.positions)</option>
                        <option value="history">История (hr.history)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="columns">
                  <div className="column">
                    <div className="field">
                      <label className="label">ID сообщения</label>
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          name="message_id"
                          value={formData.message_id}
                          onChange={handleChange}
                          readOnly
                        />
                      </div>
                      <p className="help">Автоматически сгенерированный UUID</p>
                    </div>
                  </div>
                  <div className="column">
                    <div className="field">
                      <label className="label">ID сотрудника</label>
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          name="employee_id"
                          value={formData.employee_id}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {eventType === 'personal' && (
                  <>
                    <div className="columns">
                      <div className="column">
                        <div className="field">
                          <label className="label">Имя</label>
                          <div className="control">
                            <input
                              className="input"
                              type="text"
                              name="first_name"
                              value={formData.first_name}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label">Фамилия</label>
                          <div className="control">
                            <input
                              className="input"
                              type="text"
                              name="last_name"
                              value={formData.last_name}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="columns">
                      <div className="column">
                        <div className="field">
                          <label className="label">Email</label>
                          <div className="control">
                            <input
                              className="input"
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label">Телефон</label>
                          <div className="control">
                            <input
                              className="input"
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="field">
                      <label className="label">Дата рождения</label>
                      <div className="control">
                        <input
                          className="input"
                          type="date"
                          name="birth_date"
                          value={formData.birth_date}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                {eventType === 'position' && (
                  <>
                    <div className="field">
                      <label className="label">Должность</label>
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="columns">
                      <div className="column">
                        <div className="field">
                          <label className="label">Отдел</label>
                          <div className="control">
                            <div className="select is-fullwidth">
                              <select name="department" value={formData.department} onChange={handleChange}>
                                {DEPARTMENT_OPTIONS.map(opt => (
                                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label">Грейд</label>
                          <div className="control">
                            <div className="select is-fullwidth">
                              <select name="grade" value={formData.grade} onChange={handleChange}>
                                {GRADE_OPTIONS.map(opt => (
                                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="field">
                      <label className="label">Действует с</label>
                      <div className="control">
                        <input
                          className="input"
                          type="date"
                          name="effective_from"
                          value={formData.effective_from}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                {eventType === 'history' && (
                  <>
                    <div className="field">
                      <label className="label">Компания</label>
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="field">
                      <label className="label">Должность</label>
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          name="position"
                          value={formData.position}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="columns">
                      <div className="column">
                        <div className="field">
                          <label className="label">Период с</label>
                          <div className="control">
                            <input
                              className="input"
                              type="date"
                              name="period_from"
                              value={formData.period_from}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label">Период по</label>
                          <div className="control">
                            <input
                              className="input"
                              type="date"
                              name="period_to"
                              value={formData.period_to}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="field">
                      <label className="label">Технологический стек</label>
                      <div className="control">
                        <textarea
                          className="textarea"
                          name="stack"
                          value={formData.stack}
                          onChange={handleChange}
                          placeholder="Python, Pytest, PostgreSQL"
                          required
                        />
                      </div>
                      <p className="help">Значения через запятую</p>
                    </div>
                  </>
                )}

                <div className="field">
                  <div className="control">
                    <button 
                      className={`button is-primary is-large is-fullwidth ${loading ? 'is-loading' : ''}`}
                      type="submit"
                      disabled={loading}
                    >
                      <span className="icon"><i className="fas fa-paper-plane"></i></span>
                      <span>Отправить событие в Kafka</span>
                    </button>
                  </div>
                </div>
              </form>
            </Card>
          </div>

          <div className="column is-4">
            <Card title="Информация о топике">
              <div className="content">
                {eventType === 'personal' && (
                  <>
                    <h4 className="title is-5">hr.personal</h4>
                    <p>Содержит персональную информацию о сотрудниках:</p>
                    <ul>
                      <li>Имя и контактная информация</li>
                      <li>Email и телефон</li>
                      <li>Дата рождения</li>
                    </ul>
                  </>
                )}
                {eventType === 'position' && (
                  <>
                    <h4 className="title is-5">hr.positions</h4>
                    <p>Содержит информацию о должности и роли:</p>
                    <ul>
                      <li>Название должности</li>
                      <li>Отдел</li>
                      <li>Уровень грейда</li>
                      <li>Дата вступления в силу</li>
                    </ul>
                  </>
                )}
                {eventType === 'history' && (
                  <>
                    <h4 className="title is-5">hr.history</h4>
                    <p>Содержит историю работы:</p>
                    <ul>
                      <li>Название компании</li>
                      <li>Занимаемая должность</li>
                      <li>Период работы</li>
                      <li>Технологический стек</li>
                    </ul>
                  </>
                )}
                
                <div className="notification is-warning is-light mt-4">
                  <p><strong>Совет по тестированию:</strong> Попробуйте отправить некорректные данные для проверки сценариев DLQ!</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Producer;
