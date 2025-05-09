import { useTranslation } from 'react-i18next';

const FilterSection = ({ filters, handleFilterChange, handleSearch }) => {
  const { t } = useTranslation();

  return (
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
  );
};

export default FilterSection; 