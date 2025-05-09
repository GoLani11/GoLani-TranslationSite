import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import { crud } from '../lib/supabase';

// 통계 카드 컴포넌트
const StatCard = ({ title, value, icon, bgColor }) => {
  return (
    <div className={`rounded-lg shadow-sm p-6 ${bgColor}`}>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600 font-medium">{title}</p>
          <p className="text-2xl font-bold mt-2">{value}</p>
        </div>
        <div className="text-indigo-500">{icon}</div>
      </div>
    </div>
  );
};

// 진행 상황 바 컴포넌트
const ProgressBar = ({ value, label, color }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm font-medium">{value}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full ${color}`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    pending: 0,
    users: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);
  
  // 대시보드 데이터 로드
  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      // 실제 구현 시에는 서버 측에서 집계된 통계 데이터를 가져오는 것이 효율적입니다.
      // 여기서는 예시 목적으로 직접 집계합니다.
      
      // 번역 상태별 통계
      const { data: translations, error: translationsError } = await crud.getItems('translations');
      
      if (translationsError) throw translationsError;
      
      // 상태별 카운트 계산
      const statusCounts = translations.reduce((acc, translation) => {
        acc.total += 1;
        if (translation.status === 'completed' || translation.status === 'approved') {
          acc.completed += 1;
        } else if (translation.status === 'inProgress' || translation.status === 'reviewRequired') {
          acc.inProgress += 1;
        } else {
          acc.pending += 1;
        }
        return acc;
      }, { total: 0, completed: 0, inProgress: 0, pending: 0 });
      
      // 사용자 수 가져오기
      const { data: users, error: usersError } = await crud.getItems('users');
      
      if (usersError) throw usersError;
      
      // 최근 활동 가져오기 (최신 10개)
      const { data: activities, error: activitiesError } = await crud.getItems('activities', {
        orderBy: { column: 'created_at', ascending: false },
        pagination: { page: 1, pageSize: 10 },
      });
      
      if (activitiesError) throw activitiesError;
      
      setStats({
        ...statusCounts,
        users: users.length,
      });
      
      setRecentActivity(activities || []);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast.error(t('common.error'));
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    loadDashboardData();
  }, []);
  
  // 진행률 계산
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
  const inProgressRate = stats.total > 0 ? Math.round((stats.inProgress / stats.total) * 100) : 0;
  const pendingRate = stats.total > 0 ? Math.round((stats.pending / stats.total) * 100) : 0;
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">{t('navigation.dashboard')}</h1>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <svg
            className="animate-spin h-12 w-12 text-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      ) : (
        <>
          {/* 통계 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title={t('dashboard.totalItems', '전체 항목')}
              value={stats.total}
              bgColor="bg-white"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              }
            />
            <StatCard
              title={t('dashboard.completedItems', '완료된 항목')}
              value={stats.completed}
              bgColor="bg-white"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              }
            />
            <StatCard
              title={t('dashboard.inProgressItems', '진행 중인 항목')}
              value={stats.inProgress}
              bgColor="bg-white"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
            />
            <StatCard
              title={t('dashboard.activeUsers', '활동 사용자 수')}
              value={stats.users}
              bgColor="bg-white"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              }
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 진행 상황 차트 */}
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
            
            {/* 최근 활동 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">{t('dashboard.recentActivity', '최근 활동')}</h2>
              
              {recentActivity && recentActivity.length > 0 ? (
                <ul className="space-y-4">
                  {recentActivity.map((activity) => (
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
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage; 