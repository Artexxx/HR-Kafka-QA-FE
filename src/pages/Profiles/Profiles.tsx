import { useEffect, useState } from 'react';
import MainLayout from '@/components/Layouts/MainLayout';
import ProfileCard from '@/components/Widgets/ProfileCard';
import LoadingSpinner from '@/components/UI/LoadingSpinner';
import { getProfiles, deleteProfile } from '@/api/profiles';
import type { EmployeeProfileDTO } from '@/models/profiles/api';
import { toast } from 'sonner';
import './Styles.scss';

const Profiles = () => {
  const [profiles, setProfiles] = useState<EmployeeProfileDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const loadProfiles = async () => {
    try {
      setLoading(true);
      const data = await getProfiles();
      setProfiles(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Не удалось загрузить профили');
      setProfiles([]);
    } finally {
      setLoading(false);
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

  const filteredProfiles = profiles.filter(profile => 
    profile.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.employee_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

        <div className="box">
          <div className="field">
            <div className="control has-icons-left">
              <input
                className="input is-medium"
                type="text"
                placeholder="Поиск по имени, ID или email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="icon is-left">
                <i className="fas fa-search"></i>
              </span>
            </div>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner fullPage />
        ) : filteredProfiles.length === 0 ? (
          <div className="notification is-info is-light">
            <p className="has-text-centered">
              <span className="icon is-large">
                <i className="fas fa-info-circle fa-2x"></i>
              </span>
            </p>
            <p className="has-text-centered">
              {searchTerm ? 'Профили не найдены по вашему запросу.' : 'Нет доступных профилей. Создайте события через Продюсер для добавления профилей.'}
            </p>
          </div>
        ) : (
          <>
            <div className="notification is-light">
              <strong>Найдено {filteredProfiles.length} профиль(-ей/-я)</strong>
            </div>
            <div className="columns is-multiline">
              {filteredProfiles.map((profile) => (
                <div key={profile.employee_id} className="column is-one-third">
                  <ProfileCard
                    profile={profile}
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
