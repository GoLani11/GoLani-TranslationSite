import { useTranslation } from 'react-i18next';
import ProgressBar from '../../components/common/ProgressBar';

const ProgressSummary = ({ stats, completionRate, inProgressRate, pendingRate }) => {
  const { t } = useTranslation();

  return (
    <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">{t('dashboard.progress', '번역 진행 상황')}</h2>
      
      <ProgressBar
        value={completionRate}
        label={t('translation.statuses.completed')}
        color="bg-green-500"
      />
      <ProgressBar
        value={inProgressRate}
        label={t('translation.statuses.inProgress')}
        color="bg-blue-500"
      />
      <ProgressBar
        value={pendingRate}
        label={t('translation.statuses.pending')}
        color="bg-yellow-500"
      />
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium mb-4">{t('dashboard.summary', '요약')}</h3>
        <p className="text-gray-600">
          {t('dashboard.progressSummary', '총 {{total}}개 항목 중 {{completed}}개({{rate}}%)가 완료되었습니다.', {
            total: stats.total,
            completed: stats.completed,
            rate: completionRate,
          })}
        </p>
        <p className="text-gray-600 mt-2">
          {t('dashboard.estimatedCompletion', '현재 진행 속도로 약 {{days}}일 후에 완료될 예정입니다.', {
            days: 30, // 실제로는 진행 속도를 기반으로 계산해야 함
          })}
        </p>
      </div>
    </div>
  );
};

export default ProgressSummary; 