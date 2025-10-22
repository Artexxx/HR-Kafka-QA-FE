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

      toast.success(`Event sent to topic successfully!`);
      setFormData({ ...formData, message_id: generateUUID() });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send event');
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
              <span>Kafka Producer</span>
            </span>
          </h1>
          <p className="subtitle">Send events to Kafka topics</p>
        </div>

        <div className="columns">
          <div className="column is-8">
            <Card title="Event Producer" subtitle="Create and send events to Kafka">
              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label className="label">Event Type</label>
                  <div className="control">
                    <div className="select is-fullwidth is-info">
                      <select value={eventType} onChange={(e) => setEventType(e.target.value as EventType)}>
                        <option value="personal">Personal (hr.personal)</option>
                        <option value="position">Position (hr.positions)</option>
                        <option value="history">History (hr.history)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="columns">
                  <div className="column">
                    <div className="field">
                      <label className="label">Message ID</label>
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
                      <p className="help">Auto-generated UUID</p>
                    </div>
                  </div>
                  <div className="column">
                    <div className="field">
                      <label className="label">Employee ID</label>
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
                          <label className="label">First Name</label>
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
                          <label className="label">Last Name</label>
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
                          <label className="label">Phone</label>
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
                      <label className="label">Birth Date</label>
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
                      <label className="label">Title</label>
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
                          <label className="label">Department</label>
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
                          <label className="label">Grade</label>
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
                      <label className="label">Effective From</label>
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
                      <label className="label">Company</label>
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
                      <label className="label">Position</label>
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
                          <label className="label">Period From</label>
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
                          <label className="label">Period To</label>
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
                      <label className="label">Tech Stack</label>
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
                      <p className="help">Comma-separated values</p>
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
                      <span>Send Event to Kafka</span>
                    </button>
                  </div>
                </div>
              </form>
            </Card>
          </div>

          <div className="column is-4">
            <Card title="Topic Information">
              <div className="content">
                {eventType === 'personal' && (
                  <>
                    <h4 className="title is-5">hr.personal</h4>
                    <p>Contains personal information about employees:</p>
                    <ul>
                      <li>Name and contact details</li>
                      <li>Email and phone</li>
                      <li>Birth date</li>
                    </ul>
                  </>
                )}
                {eventType === 'position' && (
                  <>
                    <h4 className="title is-5">hr.positions</h4>
                    <p>Contains position and role information:</p>
                    <ul>
                      <li>Job title</li>
                      <li>Department</li>
                      <li>Grade level</li>
                      <li>Effective date</li>
                    </ul>
                  </>
                )}
                {eventType === 'history' && (
                  <>
                    <h4 className="title is-5">hr.history</h4>
                    <p>Contains employment history:</p>
                    <ul>
                      <li>Company name</li>
                      <li>Position held</li>
                      <li>Employment period</li>
                      <li>Technology stack</li>
                    </ul>
                  </>
                )}
                
                <div className="notification is-warning is-light mt-4">
                  <p><strong>Testing Tip:</strong> Try sending malformed data to trigger DLQ scenarios!</p>
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
