import type { EmployeeProfileDTO } from '@/models/profiles/api';
import { formatDate } from '@/utils/formatters';
import './Styles.scss';

interface ProfileCardProps {
  profile: EmployeeProfileDTO;
  onEdit?: () => void;
  onDelete?: () => void;
}

const ProfileCard = ({ profile, onEdit, onDelete }: ProfileCardProps) => {
  return (
    <div className="card profile-card">
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-64x64">
              <div className="profile-avatar">
                <span>{profile.first_name[0]}{profile.last_name[0]}</span>
              </div>
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-5" style={{ color: 'hsl(260, 20%, 15%)' }}>{profile.first_name} {profile.last_name}</p>
            <p className="subtitle is-6" style={{ color: 'hsl(260, 15%, 40%)' }}>{profile.title}</p>
            <div className="tags">
              <span className="tag is-info">{profile.grade}</span>
              <span className="tag is-light">{profile.department}</span>
            </div>
          </div>
        </div>

        <div className="content profile-details">
          <div className="detail-row">
            <span className="icon-text">
              <span className="icon"><i className="fas fa-id-card"></i></span>
              <span><strong>ID:</strong> {profile.employee_id}</span>
            </span>
          </div>
          <div className="detail-row">
            <span className="icon-text">
              <span className="icon"><i className="fas fa-envelope"></i></span>
              <span>{profile.email}</span>
            </span>
          </div>
          <div className="detail-row">
            <span className="icon-text">
              <span className="icon"><i className="fas fa-phone"></i></span>
              <span>{profile.phone}</span>
            </span>
          </div>
          <div className="detail-row">
            <span className="icon-text">
              <span className="icon"><i className="fas fa-birthday-cake"></i></span>
              <span>{formatDate(profile.birth_date)}</span>
            </span>
          </div>
          <div className="detail-row">
            <span className="icon-text">
              <span className="icon"><i className="fas fa-calendar"></i></span>
              <span><strong>Действует с:</strong> {formatDate(profile.effective_from)}</span>
            </span>
          </div>
        </div>

        {(onEdit || onDelete) && (
          <div className="buttons">
            {onEdit && (
              <button className="button is-info is-small" onClick={onEdit}>
                <span className="icon"><i className="fas fa-edit"></i></span>
                <span>Редактировать</span>
              </button>
            )}
            {onDelete && (
              <button className="button is-danger is-small" onClick={onDelete}>
                <span className="icon"><i className="fas fa-trash"></i></span>
                <span>Удалить</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
