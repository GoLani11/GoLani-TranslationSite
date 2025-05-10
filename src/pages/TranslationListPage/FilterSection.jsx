import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const FilterSection = ({ 
  project, 
  filters, 
  onFilterChange, 
  onSearch, 
  handleSearchSubmit,
  projectId
}) => {
  const { t } = useTranslation(['translation', 'common']);
  const navigate = useNavigate();

  // 현재 선택된 메인 카테고리에 따른 서브 카테고리 목록 가져오기
  const getSubCategories = () => {
    if (!project || !filters.mainCategory) return [];
    const selectedMainCategory = project.mainCategories.find(
      category => category.id === filters.mainCategory
    );
    return selectedMainCategory ? selectedMainCategory.subCategories : [];
  };

  // 선택된 메인 카테고리 이름 가져오기
  const getSelectedMainCategoryName = () => {
    if (!project || !filters.mainCategory) return '';
    const selectedMainCategory = project.mainCategories.find(
      category => category.id === filters.mainCategory
    );
    return selectedMainCategory ? selectedMainCategory.name : '';
  };

  // 메인 카테고리 카드 클릭 핸들러
  const handleMainCategoryClick = (categoryId) => {
    if (filters.mainCategory === categoryId) {
      onFilterChange({
        target: { name: 'mainCategory', value: '' }
      });
      onFilterChange({
        target: { name: 'subCategory', value: '' }
      });
    } else {
      onFilterChange({
        target: { name: 'mainCategory', value: categoryId }
      });
      onFilterChange({
        target: { name: 'subCategory', value: '' }
      });
    }
  };

  // 서브 카테고리 선택 핸들러
  const handleSubCategoryClick = (subCategory) => {
    const newValue = filters.subCategory === subCategory ? '' : subCategory;
    onFilterChange({ target: { name: 'subCategory', value: newValue } });
  };

  // 카테고리에서 바로 작업 시작하기 버튼 핸들러
  const handleStartTranslatingCategory = (e, categoryId) => {
    e.stopPropagation(); // 부모 요소의 클릭 이벤트 방지

    // 선택된 카테고리 정보 가져오기
    const selectedCategory = project.mainCategories.find(cat => cat.id === categoryId);

    if (selectedCategory) {
      // 카테고리 정보와 하위 카테고리 목록을 쿼리 파라미터로 전달
      const subCategoriesQuery = selectedCategory.subCategories.map(sub => encodeURIComponent(sub)).join(',');
      navigate(`/translation-editor/${projectId}/new?mainCategory=${categoryId}&mainCategoryName=${encodeURIComponent(selectedCategory.name)}&subCategories=${subCategoriesQuery}`);
    } else {
      // 카테고리를 찾지 못한 경우 기본 에디터 페이지로 이동
      navigate(`/translation-editor/${projectId}/new`);
    }
  };

  // 카테고리에서 바로 작업 시작하기 버튼 핸들러 (서브 카테고리용)
  const handleStartTranslatingSubCategory = (e, subCategory) => {
    e.stopPropagation(); // 부모 요소의 클릭 이벤트 방지
    const mainCategory = filters.mainCategory;
    const selectedCategory = project.mainCategories.find(cat => cat.id === mainCategory);
    
    if (selectedCategory) {
       const mainCategoryName = selectedCategory.name;
       const subCategoriesQuery = selectedCategory.subCategories.map(sub => encodeURIComponent(sub)).join(',');
       navigate(`/translation-editor/${projectId}/new?mainCategory=${mainCategory}&mainCategoryName=${encodeURIComponent(mainCategoryName)}&subCategory=${encodeURIComponent(subCategory)}&subCategories=${subCategoriesQuery}`);
    } else {
       // 메인 카테고리를 찾지 못한 경우 기본 에디터 페이지로 이동
       navigate(`/translation-editor/${projectId}/new`);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
      {/* 진행률 표시 */}
      {project && (
        <div className="p-4 bg-indigo-50">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">진행률</span>
            <span className="text-sm font-medium">{project.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-indigo-600 h-2.5 rounded-full" 
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* 메인 카테고리 카드 */}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">{t('translation.categories')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {project?.mainCategories.map((category) => (
            <div 
              key={category.id} 
              className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                filters.mainCategory === category.id 
                  ? 'border-indigo-500 bg-indigo-50' 
                  : 'border-gray-200 hover:border-indigo-300'
              }`}
              onClick={() => handleMainCategoryClick(category.id)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">{category.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {category.subCategories.length}개 하위 카테고리
                  </p>
                </div>
                <button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-2 py-1 rounded transition-colors"
                  onClick={(e) => handleStartTranslatingCategory(e, category.id)}
                >
                  번역 시작
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 선택된 메인 카테고리가 있을 때 서브 카테고리 표시 */}
      {filters.mainCategory && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <h3 className="font-medium mb-3">
            <span className="text-indigo-600">{getSelectedMainCategoryName()}</span>의 하위 카테고리
          </h3>
          <div className="flex flex-wrap gap-2">
            {getSubCategories().map((subCategory) => (
              <div key={subCategory} className="relative inline-block">
                <button
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                    filters.subCategory === subCategory
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => handleSubCategoryClick(subCategory)}
                >
                  {subCategory}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 필터링된 결과 표시 */}
      {(filters.mainCategory || filters.subCategory || filters.status) && (
        <div className="px-4 py-2 bg-indigo-50 border-t border-indigo-100">
          <p className="text-sm text-indigo-700 flex items-center flex-wrap">
            <span className="font-medium mr-2">필터 적용됨:</span>
            {filters.mainCategory && (
              <span className="inline-flex items-center mr-2 bg-white px-2 py-1 rounded-md border border-indigo-200">
                {getSelectedMainCategoryName()}
                <button 
                  className="ml-1 text-gray-400 hover:text-gray-600"
                  onClick={() => handleMainCategoryClick(filters.mainCategory)}
                >
                  ×
                </button>
              </span>
            )}
            {filters.subCategory && (
              <span className="inline-flex items-center mr-2 bg-white px-2 py-1 rounded-md border border-indigo-200">
                {filters.subCategory}
                <button 
                  className="ml-1 text-gray-400 hover:text-gray-600"
                  onClick={() => handleSubCategoryClick(filters.subCategory)}
                >
                  ×
                </button>
              </span>
            )}
            {filters.status && (
              <span className="inline-flex items-center mr-2 bg-white px-2 py-1 rounded-md border border-indigo-200">
                {t(`translation.statuses.${filters.status}`)}
                <button 
                  className="ml-1 text-gray-400 hover:text-gray-600"
                  onClick={() => onFilterChange({ target: { name: 'status', value: '' } })}
                >
                  ×
                </button>
              </span>
            )}
            {(filters.mainCategory || filters.subCategory || filters.status) && (
              <button
                className="text-xs text-indigo-600 hover:text-indigo-800 underline"
                onClick={() => {
                  onFilterChange({ target: { name: 'mainCategory', value: '' } });
                  onFilterChange({ target: { name: 'subCategory', value: '' } });
                  onFilterChange({ target: { name: 'status', value: '' } });
                }}
              >
                모든 필터 지우기
              </button>
            )}
          </p>
        </div>
      )}

      {/* 추가 필터 (상태 및 검색) */}
      <div className="p-4 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 상태 필터 */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              {t('translation.status')}
            </label>
            <select
              id="status"
              name="status"
              value={filters.status}
              onChange={onFilterChange}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="">{t('common.all')}</option>
              <option value="pending">{t('translation.statuses.pending')}</option>
              <option value="inProgress">{t('translation.statuses.inProgress')}</option>
              <option value="reviewRequired">{t('translation.statuses.reviewRequired')}</option>
              <option value="completed">{t('translation.statuses.completed')}</option>
              <option value="approved">{t('translation.statuses.approved')}</option>
            </select>
          </div>
          
          {/* 검색 */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              {t('common.search')}
            </label>
            <form onSubmit={handleSearchSubmit}>
              <div className="flex">
                <input
                  type="text"
                  id="search"
                  name="search"
                  value={filters.search}
                  onChange={onSearch}
                  placeholder={t('translation.searchPlaceholder')}
                  className="w-full border border-gray-300 rounded-l-md shadow-sm p-2"
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
    </div>
  );
};

export default FilterSection; 