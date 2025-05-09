import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import { crud, setupRealtimeSubscription } from '../lib/supabase';

// 상태 배지 컴포넌트
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
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <div className="flex-1">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              {t('translation.status')}
            </label>
            <select
              id="status"
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">{t('common.all', '전체')}</option>
              <option value="pending">{t('translation.statuses.pending')}</option>
              <option value="inProgress">{t('translation.statuses.inProgress')}</option>
              <option value="reviewRequired">{t('translation.statuses.reviewRequired')}</option>
              <option value="completed">{t('translation.statuses.completed')}</option>
              <option value="approved">{t('translation.statuses.approved')}</option>
            </select>
          </div>
          
          <div className="flex-1">
            <form onSubmit={handleSearch}>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                {t('common.search')}
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="search"
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                  placeholder={t('translation.searchPlaceholder', '원문 또는 번역문 검색...')}
                  className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-r-md transition-colors"
                >
                  {t('common.search')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* 번역 목록 테이블 */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">
            <svg
              className="animate-spin h-10 w-10 text-indigo-600 mx-auto mb-4"
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
            <p>{t('common.loading')}</p>
          </div>
        ) : translations.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('translation.original')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('translation.translated')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('translation.status')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('translation.updatedAt')}
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('common.actions')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {translations.map((translation) => (
                  <tr key={translation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 line-clamp-2">{translation.original_text}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 line-clamp-2">{translation.translated_text}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={translation.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(translation.updated_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to={`/translations/${translation.id}`}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        {t('common.view')}
                      </Link>
                      <Link
                        to={`/translations/${translation.id}/edit`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        {t('common.edit')}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-gray-400 mx-auto mb-4"
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
            <p className="text-gray-600">{t('common.noResults')}</p>
            <Link
              to="/translations/new"
              className="mt-4 inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              {t('translation.addNew')}
            </Link>
          </div>
        )}
      </div>
      
      {/* 페이지네이션 */}
      {translations.length > 0 && (
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-500">
            {t('pagination.showing', '총 {{total}}개 중 {{from}}~{{to}}번째 항목', {
              total: pagination.total,
              from: (pagination.page - 1) * pagination.pageSize + 1,
              to: Math.min(pagination.page * pagination.pageSize, pagination.total),
            })}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="px-3 py-1 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('pagination.previous', '이전')}
            </button>
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page >= Math.ceil(pagination.total / pagination.pageSize)}
              className="px-3 py-1 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('pagination.next', '다음')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TranslationsPage; 