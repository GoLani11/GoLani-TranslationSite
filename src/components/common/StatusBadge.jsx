import { useTranslation } from 'react-i18next';

const StatusBadge = ({ status }) => {
  const { t } = useTranslation();
  
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    inProgress: 'bg-blue-100 text-blue-800',
    reviewRequired: 'bg-purple-100 text-purple-800',
    completed: 'bg-green-100 text-green-800',
    approved: 'bg-indigo-100 text-indigo-800',
  };
  
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}
    >
      {t(`translation.statuses.${status}`)}
    </span>
  );
};

export default StatusBadge; 