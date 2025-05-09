import { useTranslation } from 'react-i18next';

const Pagination = ({ pagination, handlePageChange }) => {
  const { t } = useTranslation();
  const totalPages = Math.ceil(pagination.total / pagination.pageSize);

  if (pagination.total === 0) return null;

  return (
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
          disabled={pagination.page >= totalPages}
          className="px-3 py-1 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t('pagination.next', '다음')}
        </button>
      </div>
    </div>
  );
};

export default Pagination; 