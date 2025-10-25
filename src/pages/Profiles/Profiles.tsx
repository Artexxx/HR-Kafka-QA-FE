import { useEffect, useState } from 'react';
import MainLayout from '@/components/Layouts/MainLayout';
import ProfileCard from '@/components/Widgets/ProfileCard';
import LoadingSpinner from '@/components/UI/LoadingSpinner';
import { getProfiles, deleteProfile } from '@/api/profiles';
import { getHistoryByEmployee } from '@/api/history';
import type { EmployeeProfileDTO } from '@/models/profiles/api';
import type { EmploymentHistoryDTO } from '@/models/history/api';
import { toast } from 'sonner';
import './Styles.scss';

const Profiles = () => {
  const [profiles, setProfiles] = useState<EmployeeProfileDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [historyMap, setHistoryMap] = useState<Record<string, EmploymentHistoryDTO[]>>({});
  const [historyLoading, setHistoryLoading] = useState<Record<string, boolean>>({});

  const loadProfiles = async () => {
    try {
      setLoading(true);
      const data = await getProfiles();
      const profilesArray = Array.isArray(data) ? data : [];
      setProfiles(profilesArray);
      
      // Load history for each profile
      profilesArray.forEach(profile => {
        loadHistory(profile.employee_id);
      });
    } catch (error) {
      toast.error('Не удалось загрузить профили');
      setProfiles([]);
    } finally {
      setLoading(false);
    }
  };

  const loadHistory = async (employeeId: string) => {
    setHistoryLoading(prev => ({ ...prev, [employeeId]: true }));
    try {
      const data = await getHistoryByEmployee(employeeId);
      setHistoryMap(prev => ({ ...prev, [employeeId]: Array.isArray(data) ? data : [] }));
    } catch (error) {
      setHistoryMap(prev => ({ ...prev, [employeeId]: [] }));
    } finally {
      setHistoryLoading(prev => ({ ...prev, [employeeId]: false }));
    }
  };

  useEffect(() => {
    loadProfiles();
  }, []);

  const handleDelete = async (employeeId: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот профиль?')) return;

    try {
      await deleteProfile(employeeId);
      toast.success('Профиль успешно удалён');
      loadProfiles();
    } catch (error) {
      toast.error('Не удалось удалить профиль');
    }
  };

  return (
    <MainLayout>
      <div className="profiles-page">
        <div className="page-header">
          <div>
            <h1 className="title is-2">
              <span className="icon-text">
                <span className="icon"><i className="fas fa-users"></i></span>
                <span>Профили сотрудников</span>
              </span>
            </h1>
            <p className="subtitle">Управление профилями сотрудников в базе данных</p>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner fullPage />
        ) : profiles.length === 0 ? (
          <div className="notification is-info is-light">
            <p className="has-text-centered">
              <span className="icon is-large">
                <i className="fas fa-info-circle fa-2x"></i>
              </span>
            </p>
            <p className="has-text-centered">
              Нет доступных профилей. Создайте события через Продюсер для добавления профилей.
            </p>
          </div>
        ) : (
          <>
            <div className="notification is-light">
              <strong>Найдено {profiles.length} профиль(-ей/-я)</strong>
            </div>
            <div className="columns is-multiline">
              {profiles.map((profile) => (
                <div key={profile.employee_id} className="column is-one-half">
                  <ProfileCard
                    profile={profile}
                    history={historyMap[profile.employee_id]}
                    historyLoading={historyLoading[profile.employee_id]}
                    onDelete={() => handleDelete(profile.employee_id)}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default Profiles;
