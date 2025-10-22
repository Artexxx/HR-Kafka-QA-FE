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
      toast.error('Failed to load profiles');
      setProfiles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfiles();
  }, []);

  const handleDelete = async (employeeId: string) => {
    if (!confirm('Are you sure you want to delete this profile?')) return;

    try {
      await deleteProfile(employeeId);
      toast.success('Profile deleted successfully');
      loadProfiles();
    } catch (error) {
      toast.error('Failed to delete profile');
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
                <span>Employee Profiles</span>
              </span>
            </h1>
            <p className="subtitle">Manage employee profiles stored in database</p>
          </div>
        </div>

        <div className="box">
          <div className="field">
            <div className="control has-icons-left">
              <input
                className="input is-medium"
                type="text"
                placeholder="Search by name, ID, or email..."
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
              {searchTerm ? 'No profiles found matching your search.' : 'No profiles available. Create events via Producer to add profiles.'}
            </p>
          </div>
        ) : (
          <>
            <div className="notification is-light">
              <strong>Found {filteredProfiles.length} profile(s)</strong>
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
