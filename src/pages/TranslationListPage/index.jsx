import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import { crud, setupRealtimeSubscription } from '../../lib/supabase';

import FilterSection from './FilterSection';
import TranslationTable from './TranslationTable';
import Pagination from './Pagination';
import ProjectHeader from './ProjectHeader';

const TranslationListPage = () => {
  const { t } = useTranslation();
  const { projectId } = useParams();
  const navigate = useNavigate();
  
  const [translations, setTranslations] = useState([]);
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    mainCategory: '',
    subCategory: '',
    status: '',
    search: '',
  });
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
  });
  
  // 프로젝트 정보 로드
  const loadProject = async () => {
    // 실제 구현에서는 API에서 프로젝트 데이터를 가져와야 합니다
    // 현재는 목업 데이터를 사용합니다
    const projectsData = {
      spt: {
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
      minecraft: {
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
      },
    };
    
    const foundProject = projectsData[projectId];
    
    if (foundProject) {
      setProject(foundProject);
    } else if (projectId) {
      // 프로젝트를 찾을 수 없으면 메인 번역 페이지로 리다이렉트
      toast.error('프로젝트를 찾을 수 없습니다.');
      navigate('/translations');
    } else {
      // 프로젝트 ID가 없는 경우(메인 번역 목록 페이지) 모든 프로젝트 목록을 보여줄 수 있음
      // 여기서는 간단한 구현을 위해 빈 상태로 둠
    }
  };
  
  // 번역 데이터 로드
  const loadTranslations = async () => {
    setIsLoading(true);
    
    try {
      // 프로젝트가 없는 경우 (메인 번역 목록 페이지)
      if (!project && !projectId) {
        // 모든 프로젝트의 번역 항목을 보여줄 수 있는 구현을 추가할 수 있음
        setIsLoading(false);
        return;
      }
      
      // 지연 시간 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // 모든 가능한 카테고리 수집
      const allSubCategories = project.mainCategories.flatMap(main => main.subCategories);
      const mockStatuses = ['pending', 'inProgress', 'reviewRequired', 'completed', 'approved'];
      
      // 각 카테고리별 아이템 생성
      const mockTranslations = [];
      let idCounter = 1;
      
      for (let i = 0; i < 100; i++) {
        const mainCategoryIndex = i % project.mainCategories.length;
        const mainCategory = project.mainCategories[mainCategoryIndex];
        const subCategoryIndex = i % mainCategory.subCategories.length;
        const statusIndex = i % mockStatuses.length;
        
        mockTranslations.push({
          id: idCounter++,
          project_id: projectId,
          main_category: mainCategory.id,
          main_category_name: mainCategory.name,
          sub_category: mainCategory.subCategories[subCategoryIndex],
          status: mockStatuses[statusIndex],
          original_text: `Original text example ${i+1} for ${mainCategory.name} - ${mainCategory.subCategories[subCategoryIndex]}`,
          translated_text: i % 3 === 0 ? '' : `번역된 텍스트 예시 ${i+1}`,
          context: `Context for translation ${i+1}`,
          updated_at: new Date(Date.now() - i * 86400000).toISOString(),
          translator: i % 3 === 0 ? null : { name: `번역자${i % 7 + 1}` },
        });
      }
      
      // 필터링 - 현재 state의 최신 값을 사용하기 위해 즉시 참조
      const currentFilters = filters;
      
      let filtered = [...mockTranslations];
      
      if (currentFilters.mainCategory) {
        filtered = filtered.filter(item => item.main_category === currentFilters.mainCategory);
      }
      
      if (currentFilters.subCategory) {
        filtered = filtered.filter(item => item.sub_category === currentFilters.subCategory);
      }
      
      if (currentFilters.status) {
        filtered = filtered.filter(item => item.status === currentFilters.status);
      }
      
      if (currentFilters.search) {
        const searchLower = currentFilters.search.toLowerCase();
        filtered = filtered.filter(
          item => 
            item.original_text.toLowerCase().includes(searchLower) || 
            (item.translated_text && item.translated_text.toLowerCase().includes(searchLower))
        );
      }
      
      // 페이지네이션
      const startIndex = (pagination.page - 1) * pagination.pageSize;
      const paginatedData = filtered.slice(startIndex, startIndex + pagination.pageSize);
      
      setTranslations(paginatedData);
      setPagination(prev => ({ ...prev, total: filtered.length }));
    } catch (error) {
      console.error('Error loading translations:', error);
      toast.error(t('common.error'));
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === 'mainCategory') {
      setFilters(prev => ({
        ...prev,
        [name]: value,
        subCategory: '',
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [name]: value,
      }));
    }
    setPagination(prev => ({
      ...prev,
      page: 1,
    }));
  };
  
  const handleSearch = (e) => {
    setFilters(prev => ({
      ...prev,
      search: e.target.value,
    }));
  };
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };
  
  const handlePageChange = (newPage) => {
    setPagination(prev => ({
      ...prev,
      page: newPage,
    }));
  };
  
  // 번역 항목 클릭 시 에디터 페이지로 이동
  const handleTranslationClick = (translationId) => {
    navigate(`/translation-editor/${projectId}/${translationId}`);
  };
  
  // 초기 데이터 로드
  useEffect(() => {
    loadProject();
  }, [projectId]);
  
  // filters, pagination.page가 바뀔 때마다 번역 데이터 로드
  useEffect(() => {
    if (project) {
      loadTranslations();
    }
  }, [project, filters, pagination.page]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">번역 항목 목록</h1>
        {project && (
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
          >
            대시보드로 돌아가기
          </button>
        )}
      </div>
      
      {project && <ProjectHeader project={project} />}
      
      {project && (
        <FilterSection 
          project={project}
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
          handleSearchSubmit={handleSearchSubmit}
          projectId={projectId}
        />
      )}
      
      <TranslationTable 
        translations={translations}
        projectId={projectId}
        isLoading={isLoading}
        onTranslationClick={handleTranslationClick}
      />
      
      <div className="mt-6">
        <Pagination 
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default TranslationListPage; 