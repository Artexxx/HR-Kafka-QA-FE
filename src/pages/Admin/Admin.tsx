import { useState } from 'react';
import MainLayout from '@/components/Layouts/MainLayout';
import Card from '@/components/UI/Card';
import { resetData } from '@/api/admin';
import { toast } from 'sonner';
import './Styles.scss';

const Admin = () => {
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!confirm('⚠️ This will DELETE ALL DATA from the database. Are you absolutely sure?')) {
      return;
    }

    if (!confirm('This action cannot be undone. Type YES in the next dialog to confirm.')) {
      return;
    }

    const confirmation = prompt('Type "DELETE" to confirm:');
    if (confirmation !== 'DELETE') {
      toast.error('Reset cancelled');
      return;
    }

    try {
      setLoading(true);
      await resetData();
      toast.success('All data has been reset successfully');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to reset data');
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
              <span>Admin Panel</span>
            </span>
          </h1>
          <p className="subtitle">Manage training environment</p>
        </div>

        <div className="columns">
          <div className="column is-8">
            <Card title="Danger Zone" subtitle="Destructive actions">
              <div className="notification is-danger is-light">
                <p className="title is-5">⚠️ Reset All Data</p>
                <p className="mb-4">
                  This action will <strong>permanently delete</strong> all data from the database:
                </p>
                <ul className="mb-4">
                  <li>✗ All employee profiles</li>
                  <li>✗ All employment history records</li>
                  <li>✗ All Kafka events</li>
                  <li>✗ All DLQ messages</li>
                </ul>
                <p className="has-text-weight-bold mb-4">
                  This action cannot be undone!
                </p>
                <button
                  className={`button is-danger is-large ${loading ? 'is-loading' : ''}`}
                  onClick={handleReset}
                  disabled={loading}
                >
                  <span className="icon"><i className="fas fa-exclamation-triangle"></i></span>
                  <span>Reset All Data</span>
                </button>
              </div>
            </Card>
          </div>

          <div className="column is-4">
            <Card title="Information">
              <div className="content">
                <h4 className="title is-5">When to use reset?</h4>
                <ul>
                  <li>Starting a new training session</li>
                  <li>Cleaning up test data</li>
                  <li>Resetting to initial state</li>
                </ul>

                <div className="notification is-info is-light mt-4">
                  <p>
                    <strong>Tip:</strong> You can always recreate test data using the Producer page.
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
