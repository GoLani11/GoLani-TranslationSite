import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import { crud } from '../../lib/supabase';

import LoadingSpinner from '../../components/common/LoadingSpinner';
import StatCards from './StatCards';
import ProgressSummary from './ProgressSummary';
import ActivityList from './ActivityList';
import ProjectList from './ProjectList';

const DashboardPage = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    pending: 0,
    users: 0,
  });
  const [projects, setProjects] = useState([]);
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
      
      // 프로젝트 목록 가져오기 (현재는 목업 데이터 사용)
      const mockProjects = [
        {
          id: 'spt',
          name: 'SPT 타르코프',
          description: 'Single Player Tarkov 게임의 한글화 프로젝트입니다.',
          mainCategories: [
            {
              id: 'base',
              name: 'SPT 타르코프 한글화 프로젝트',
              subCategories: ['게임 UI', '아이템', '대화', '스킬', '지도']
            },
            {
              id: 'plugins',
              name: '플러그인 모드',
              subCategories: ['SPT-AKI', 'Server Value Modifier', 'Waypoints', 'Custom Static Loot']
            },
            {
              id: 'quests',
              name: '퀘스트 모드',
              subCategories: ['메인 퀘스트', '사이드 퀘스트', '일일 퀘스트', '주간 퀘스트']
            }
          ],
          progress: 89,
        },
        {
          id: 'minecraft',
          name: '마인크래프트',
          description: '마인크래프트 게임 및 각종 모드의 한글화 프로젝트입니다.',
          mainCategories: [
            {
              id: 'vanilla',
              name: '바닐라',
              subCategories: ['게임 UI', '아이템', '생물', '바이옴']
            },
            {
              id: 'mods',
              name: '모드',
              subCategories: ['기술 모드', '모험 모드', '마법 모드', '퀘스트 모드']
            },
            {
              id: 'resources',
              name: '리소스',
              subCategories: ['텍스처팩', '서버 리소스', '데이터팩']
            }
          ],
          progress: 72,
        }
      ];
      
      setStats({
        ...statusCounts,
        users: users.length,
      });
      
      setProjects(mockProjects);
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
      <h1 className="text-2xl font-bold mb-8">프로젝트 대시보드</h1>
      
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {/* 통계 카드 */}
          <StatCards stats={stats} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* 진행 상황 차트 */}
            <ProgressSummary 
              stats={stats}
              completionRate={completionRate}
              inProgressRate={inProgressRate}
              pendingRate={pendingRate}
            />
            
            {/* 최근 활동 */}
            <ActivityList activities={recentActivity} />
          </div>
          
          {/* 프로젝트별 진행 상황 */}
          <ProjectList projects={projects} />
        </>
      )}
    </div>
  );
};

export default DashboardPage; 