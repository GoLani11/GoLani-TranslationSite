import { useTranslation } from 'react-i18next';

const ActivityList = ({ activities }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">{t('dashboard.recentActivity', '최근 활동')}</h2>
      
      {activities && activities.length > 0 ? (
        <ul className="space-y-4">
          {activities.map((activity) => (
            <li key={activity.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
              <p className="font-medium">{activity.user_name}</p>
              <p className="text-sm text-gray-600">{activity.description}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(activity.created_at).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center py-4">
          {t('dashboard.noActivity', '아직 활동 내역이 없습니다.')}
        </p>
      )}
    </div>
  );
};

export default ActivityList; 