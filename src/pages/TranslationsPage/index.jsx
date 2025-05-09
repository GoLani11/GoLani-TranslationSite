import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import { crud, setupRealtimeSubscription } from '../../lib/supabase';

// 분리된 UI 컴포넌트 임포트
import FilterSection from './FilterSection';
import TranslationTable from './TranslationTable';
import Pagination from './Pagination';

// 불필요한 임포트 제거
// import StatusBadge from '../../components/common/StatusBadge';
// import LoadingSpinner from '../../components/common/LoadingSpinner';

const TranslationsPage = () => {
  const { t } = useTranslation();
  const [translations, setTranslations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    search: '',
  });
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
  });

  // 번역 데이터 로드
  const loadTranslations = async () => {
    setIsLoading(true);

    try {
      const query = {
        pagination: {
          page: pagination.page,
          pageSize: pagination.pageSize,
        },
        orderBy: {
          column: 'updated_at',
          ascending: false,
        },
      };

      if (filters.status) {
        query.filters = { status: filters.status };
      }

      const { data, error, count } = await crud.getItems('translations', query);

      if (error) throw error;

      setTranslations(data || []);
      setPagination(prev => ({ ...prev, total: count || 0 }));
    } catch (error) {
      console.error('Error loading translations:', error);
      toast.error(t('common.error'));
    } finally {
      setIsLoading(false);
    }
  };

  // 필터 변경 처리
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setPagination(prev => ({ ...prev, page: 1 })); // 필터 변경 시 첫 페이지로 이동
  };

  // 검색 처리
  const handleSearch = (e) => {
    e.preventDefault();
    loadTranslations();
  };

  // 페이지 변경 처리
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > Math.ceil(pagination.total / pagination.pageSize)) return;
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  // 컴포넌트 마운트 시 번역 데이터 로드
  useEffect(() => {
    loadTranslations();
  }, [pagination.page, filters.status]);

  // 실시간 업데이트 구독
  useEffect(() => {
    const unsubscribe = setupRealtimeSubscription(['translations'], (payload) => {
      // 데이터 변경 시 번역 목록 다시 로드
      loadTranslations();

      // 토스트 메시지 표시
      const eventMessages = {
        INSERT: '새 번역이 추가되었습니다.',
        UPDATE: '번역이 업데이트되었습니다.',
        DELETE: '번역이 삭제되었습니다.',
      };

      toast.success(eventMessages[payload.eventType] || '번역 데이터가 변경되었습니다.');
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">{t('translation.title')}</h1>

        <Link
          to="/translations/new"
          className="mt-4 sm:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          {t('translation.addNew')}
        </Link>
      </div>

      {/* 필터 및 검색 */}
      <FilterSection 
        filters={filters}
        handleFilterChange={handleFilterChange}
        handleSearch={handleSearch}
      />

      {/* 번역 목록 테이블 */}
      <TranslationTable 
        translations={translations}
        isLoading={isLoading}
      />

      {/* 페이지네이션 */}
      <Pagination 
        pagination={pagination}
        handlePageChange={handlePageChange}
      />

    </div>
  );
};

export default TranslationsPage; 