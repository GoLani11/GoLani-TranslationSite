import { useState, useEffect } from 'react';
import TranslationEditor from './TranslationEditor';
import GlossaryPanel from './GlossaryPanel';
import TranslationProgress from './TranslationProgress';
import FilterBar from './FilterBar';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

// 샘플 데이터 - 실제 구현 시 API에서 가져와야 함
const sampleStrings = [
  { id: 1, source: "Welcome to our platform", target: "", context: "Homepage header", status: "untranslated", mainCategory: "base", subCategory: "게임 UI" },
  { id: 2, source: "Sign up for free", target: "무료로 가입하세요", context: "CTA button", status: "translated", mainCategory: "base", subCategory: "게임 UI" },
  { id: 3, source: "Forgot password?", target: "", context: "Login form", status: "untranslated", mainCategory: "base", subCategory: "아이템" },
  { id: 4, source: "Search for projects", target: "프로젝트 검색", context: "Search box", status: "needs-review", mainCategory: "plugins", subCategory: "SPT-AKI" },
  { id: 5, source: "Settings", target: "설정", context: "Navigation menu", status: "translated", mainCategory: "plugins", subCategory: "SPT-AKI" },
  { id: 6, source: "Profile", target: "", context: "User menu", status: "untranslated", mainCategory: "plugins", subCategory: "Waypoints" },
  { id: 7, source: "Logout", target: "로그아웃", context: "User menu", status: "translated", mainCategory: "quests", subCategory: "메인 퀘스트" },
  { id: 8, source: "Home", target: "", context: "Navigation", status: "untranslated", mainCategory: "quests", subCategory: "사이드 퀘스트" },
];

const sampleGlossary = [
  { term: "platform", translation: "플랫폼", description: "서비스를 제공하는 기반 시스템" },
  { term: "settings", translation: "설정", description: "사용자 지정 옵션 구성" },
  { term: "project", translation: "프로젝트", description: "번역 작업 단위" },
  { term: "search", translation: "검색", description: "정보를 찾는 행위" },
];

// 추가: 프로젝트의 메인 카테고리 구조 샘플 (실제 API에서 가져와야 함)
const sampleProjectCategories = [
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
];

// 추가: 모든 하위 카테고리 목록 상수 추가 (샘플용 - 실제 데이터 기반으로 생성 필요)
const ALL_SUB_CATEGORIES = [
  ...new Set(sampleProjectCategories.flatMap(cat => cat.subCategories))
];

const TranslationsPage = () => {
  const { projectId, translationId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [strings, setStrings] = useState(sampleStrings);
  const [glossary, setGlossary] = useState(sampleGlossary);
  const [currentStringId, setCurrentStringId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [categoryFilters, setCategoryFilters] = useState({
    mainCategory: '',
    subCategory: '',
    mainCategoryName: ''
  });
  const [availableSubCategories, setAvailableSubCategories] = useState([]);

  // URL 쿼리 파라미터에서 필터 및 하위 카테고리 목록 정보 가져오기
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const mainCategory = searchParams.get('mainCategory');
    const subCategory = searchParams.get('subCategory');
    const mainCategoryName = searchParams.get('mainCategoryName');
    const subCategoriesParam = searchParams.get('subCategories'); // URL에서 받은 하위 카테고리 목록 (쉼표 구분)

    const newCategoryFilters = {
      mainCategory: mainCategory || '',
      subCategory: subCategory || '',
      mainCategoryName: mainCategoryName || ''
    };
    setCategoryFilters(newCategoryFilters);

    // 사용 가능한 하위 카테고리 목록 결정
    let subCatsToUse = [];
    if (subCategoriesParam) {
       // URL에 명시적인 하위 카테고리 목록이 있으면 사용
      subCatsToUse = subCategoriesParam.split(',').map(sub => decodeURIComponent(sub));
    } else if (newCategoryFilters.mainCategory) {
       // 메인 카테고리가 선택된 경우 해당 메인 카테고리의 하위 카테고리 목록 사용
       const selectedMainCatDefinition = sampleProjectCategories.find(cat => cat.id === newCategoryFilters.mainCategory);
       if (selectedMainCatDefinition) {
         subCatsToUse = selectedMainCatDefinition.subCategories;
       } else {
         // 선택된 메인 카테고리 정의를 찾을 수 없는 경우 (샘플 데이터 불일치 등)
         subCatsToUse = ALL_SUB_CATEGORIES; // 또는 빈 배열 []
       }
    } else {
       // 메인 카테고리가 선택되지 않은 경우 모든 하위 카테고리 목록 사용
       subCatsToUse = ALL_SUB_CATEGORIES;
    }
    
    setAvailableSubCategories(subCatsToUse);

  }, [location.search]); // location.search가 변경될 때마다 실행

  // 실제 구현 시 API에서 문자열 및 용어집 데이터를 가져오는 코드 필요
  useEffect(() => {
    console.log(`Loading translations for project: ${projectId}`);

    // translationId가 'new'인 경우 새 번역을 시작하는 것으로 간주
    if (translationId === 'new') {
      // 필터링된 문자열 목록에서 첫 번째 미번역 문자열을 찾아 현재 문자열로 설정
      const filteredList = applyFilters(strings);
      const firstUntranslated = filteredList.find(s => s.status === 'untranslated');

      if (firstUntranslated) {
        setCurrentStringId(firstUntranslated.id);
      } else if (filteredList.length > 0) {
        // 미번역된 문자열이 없는 경우 필터링된 목록의 첫 번째 문자열 사용
        setCurrentStringId(filteredList[0].id);
      } else {
         // 필터링된 항목이 없는 경우 currentStringId를 null로 설정
         setCurrentStringId(null);
      }
    } else {
      // 특정 translationId로 진입한 경우 해당 항목을 찾아서 설정
      const initialString = strings.find(s => s.id === Number(translationId));
      if (initialString) {
         setCurrentStringId(Number(translationId));
         // 특정 항목으로 진입 시 해당 항목의 카테고리로 필터 설정 (옵션)
         setCategoryFilters({
            mainCategory: initialString.mainCategory || '',
            subCategory: initialString.subCategory || '',
            mainCategoryName: initialString.mainCategory || '' // 이름 정보는 없을 수 있으므로 ID 사용
         });
         // 해당 메인 카테고리의 하위 카테고리 목록 로드 (실제 API 필요)
         const uniqueSubCategories = [...new Set(sampleStrings
           .filter(s => s.mainCategory === initialString.mainCategory)
           .map(s => s.subCategory))];
         setAvailableSubCategories(uniqueSubCategories);

      } else {
         // translationId에 해당하는 항목이 없으면 첫 번째 항목 또는 null 설정
         setCurrentStringId(filteredStrings[0]?.id || null);
      }
    }
  }, [projectId, translationId, strings]); // strings를 종속성에 추가

  // filters, categoryFilters가 바뀔 때마다 첫 번째 항목 다시 설정 (필요시)
  useEffect(() => {
     // 필터가 변경될 때 필터링된 목록의 첫 번째 항목으로 이동
     const filteredList = applyFilters(strings);
     if (filteredList.length > 0) {
       // 현재 선택된 문자열이 필터링된 목록에 없으면 첫 번째 항목으로 이동
       if (!currentStringId || !filteredList.some(s => s.id === currentStringId)) {
          setCurrentStringId(filteredList[0].id);
       }
     } else {
        setCurrentStringId(null);
     }
  }, [filter, categoryFilters, strings, currentStringId]); // currentStringId를 종속성에 추가


  // 카테고리 필터 적용하는 함수
  const applyFilters = (stringList) => {
    let result = [...stringList];

    // 메인 카테고리 필터 적용
    if (categoryFilters.mainCategory) {
      result = result.filter(s => s.mainCategory === categoryFilters.mainCategory);
    }

    // 서브 카테고리 필터 적용
    if (categoryFilters.subCategory) {
      result = result.filter(s => s.subCategory === categoryFilters.subCategory);
    }

    // 상태 필터 적용 (모든/미번역/번역됨/검토필요)
    if (filter !== 'all') {
      result = result.filter(s => s.status === filter);
    }

    return result;
  };

  const handleSaveTranslation = (id, newTranslation) => {
    setStrings(strings.map(str =>
      str.id === id ? { ...str, target: newTranslation, status: "needs-review" } : str
    ));
    // API 저장 호출 (예: saveTranslation(id, newTranslation))
  };

  const handleNextString = () => {
    const filteredList = applyFilters(strings);
    const currentIndex = filteredList.findIndex(s => s.id === currentStringId);
    // 마지막 항목에서 다음으로 가면 첫 번째 항목으로 순환
    const nextIndex = (currentIndex + 1) % filteredList.length;
    setCurrentStringId(filteredList[nextIndex]?.id || filteredList[0]?.id);
  };

  const handlePrevString = () => {
    const filteredList = applyFilters(strings);
    const currentIndex = filteredList.findIndex(s => s.id === currentStringId);
     // 첫 번째 항목에서 이전으로 가면 마지막 항목으로 순환
    const prevIndex = (currentIndex - 1 + filteredList.length) % filteredList.length;
    setCurrentStringId(filteredList[prevIndex]?.id || filteredList[0]?.id);
  };

  // 필터링된 문자열 목록
  const filteredStrings = applyFilters(strings);
  // 현재 선택된 문자열
  const currentString = strings.find(s => s.id === currentStringId) || filteredStrings[0];

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-blue-700 text-white p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">번역 작업</h1>

          {/* 상단 필터 표시 및 초기화 버튼 */}
          {(categoryFilters.mainCategory || categoryFilters.subCategory) ? (
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-blue-600 rounded-full text-white text-sm">
                {categoryFilters.mainCategoryName || categoryFilters.mainCategory}
              </span>
              {categoryFilters.subCategory && (
                <span className="px-3 py-1 bg-blue-600 rounded-full text-white text-sm">
                  {categoryFilters.subCategory}
                </span>
              )}
              <button
                onClick={() => {
                  // 필터 초기화
                  setCategoryFilters({
                    mainCategory: '',
                    subCategory: '',
                    mainCategoryName: ''
                  });
                  // URL에서 카테고리 관련 쿼리 파라미터 제거
                  const searchParams = new URLSearchParams(location.search);
                  searchParams.delete('mainCategory');
                  searchParams.delete('subCategory');
                  searchParams.delete('mainCategoryName');
                  searchParams.delete('subCategories');
                   navigate({
                     pathname: `/translation-editor/${projectId}/${currentStringId || 'new'}`,
                     search: searchParams.toString()
                   });
                }}
                className="text-sm text-blue-200 hover:text-white"
              >
                필터 지우기
              </button>
            </div>
          ) : (
             <div className="text-sm text-blue-200">전체 항목 작업 중</div>
          )}

          <button
            onClick={() => navigate(`/translations/${projectId}`)}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded-md text-sm"
          >
            목록으로 돌아가기
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* 왼쪽: 번역 목록 및 필터 */}
        <div className="w-1/4 border-r border-gray-200 bg-white overflow-y-auto">
          <FilterBar filter={filter} setFilter={setFilter} />

          {/* 카테고리 선택 영역 - 항상 표시 */}
          <div className="p-3 bg-blue-50 border-b border-blue-100">
            <div className="text-sm font-medium text-blue-700 mb-2">현재 카테고리</div>
            <div className="flex flex-wrap gap-1 mb-2">
              {categoryFilters.mainCategory ? (
                <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                  {categoryFilters.mainCategoryName || categoryFilters.mainCategory}
                </span>
              ) : (
                <span className="text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-700">메인 카테고리 선택 안됨</span>
              )}
              {categoryFilters.subCategory ? (
                <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                  {categoryFilters.subCategory}
                </span>
              ) : (
                categoryFilters.mainCategory && <span className="text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-700">하위 카테고리 선택 안됨</span>
              )}
            </div>

            {/* 하위 카테고리 선택 드롭다운 - 항상 표시 */}
            <div className="mt-2">
              <label htmlFor="subCategoryFilter" className="block text-xs font-medium text-blue-700 mb-1">
                {categoryFilters.mainCategory ? '하위 카테고리 변경' : '하위 카테고리 선택'}
              </label>
              <select
                id="subCategoryFilter"
                value={categoryFilters.subCategory || ''}
                onChange={(e) => {
                  const newSubCategory = e.target.value;
                  setCategoryFilters(prev => ({
                    ...prev,
                    subCategory: newSubCategory
                  }));

                  // URL 쿼리 파라미터 업데이트
                  const searchParams = new URLSearchParams(location.search);
                  if (newSubCategory) {
                    searchParams.set('subCategory', newSubCategory);
                  } else {
                    searchParams.delete('subCategory');
                  }
                   // 하위 카테고리 변경 시에는 subCategories 목록 URL 파라미터를 제거하여 현재 필터에 맞게 항목을 로드하도록 유도
                   searchParams.delete('subCategories');

                  navigate({
                    pathname: `/translation-editor/${projectId}/${currentStringId || 'new'}`,
                    search: searchParams.toString()
                  });
                }}
                className="w-full text-sm rounded-md border border-blue-200 bg-white py-1 px-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">모든 하위 카테고리</option>
                {availableSubCategories.map(subCat => (
                  <option key={subCat} value={subCat}>
                    {subCat}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-3 flex justify-end">
              <button
                onClick={() => {
                  // 필터 초기화 - 메인 카테고리는 유지
                  setCategoryFilters(prev => ({
                    mainCategory: prev.mainCategory,
                    subCategory: '',
                    mainCategoryName: prev.mainCategoryName
                  }));
                  // 하위 카테고리 목록을 모든 목록으로 설정
                  // 메인 카테고리가 선택된 상태라면 해당 메인 카테고리의 하위 목록으로 재설정
                  const selectedMainCatDefinition = sampleProjectCategories.find(cat => cat.id === categoryFilters.mainCategory);
                   if (selectedMainCatDefinition) {
                     setAvailableSubCategories(selectedMainCatDefinition.subCategories);
                   } else {
                     setAvailableSubCategories(ALL_SUB_CATEGORIES);
                   }

                  // URL에서 하위 카테고리 및 기타 필터 관련 쿼리 파라미터 제거
                  const searchParams = new URLSearchParams(location.search);
                  searchParams.delete('subCategory');
                  searchParams.delete('subCategories');
                   // 상태 필터도 초기화하는 경우 여기서 추가 삭제
                   searchParams.delete('filter'); // FilterBar에서 관리하지만 URL에도 반영된다면 삭제

                   // 메인 카테고리 관련 파라미터는 유지 (삭제하지 않음)

                  navigate({
                    pathname: `/translation-editor/${projectId}/${currentStringId || 'new'}`,
                    search: searchParams.toString()
                  });
                }}
                className="text-xs px-2 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                필터 초기화
              </button>
            </div>
          </div>

          <div className="p-2">
            <TranslationProgress
              total={filteredStrings.length}
              translated={filteredStrings.filter(s => s.status === "translated").length}
              needsReview={filteredStrings.filter(s => s.status === "needs-review").length}
            />
          </div>

          <div className="divide-y divide-gray-200">
            {filteredStrings.length > 0 ? (
              filteredStrings.map(string => (
                <div
                  key={string.id}
                  className={`p-3 cursor-pointer hover:bg-gray-100 ${currentStringId === string.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''}`}
                  onClick={() => setCurrentStringId(string.id)}
                >
                  <div className="font-medium truncate">{string.source}</div>
                  <div className="text-sm text-gray-500 truncate">{string.target || '(번역 필요)'}</div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-700">{string.context}</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-700">{string.subCategory}</span>
                    <span className={`text-xs px-2 py-1 rounded-full
                      ${string.status === 'translated' ? 'bg-green-100 text-green-800' :
                        string.status === 'needs-review' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'}`}>
                      {string.status === 'translated' ? '번역됨' :
                      string.status === 'needs-review' ? '검토필요' : '미번역'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                선택한 필터에 해당하는 번역 항목이 없습니다.
              </div>
            )}
          </div>
        </div>

        {/* 중앙: 번역 에디터 */}
        <div className="flex-1 flex flex-col overflow-y-auto bg-white">
          {currentString ? (
            <TranslationEditor
              string={currentString}
              onSave={handleSaveTranslation}
              onNext={handleNextString}
              onPrev={handlePrevString}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center p-6 max-w-sm">
                <div className="text-3xl text-gray-400 mb-2">📝</div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">번역할 항목이 없습니다</h3>
                <p className="text-gray-500 mb-4">다른 카테고리나 필터를 선택해보세요.</p>
                <button
                  onClick={() => navigate(`/translations/${projectId}`)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
                >
                  번역 목록으로 돌아가기
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 오른쪽: 용어집 및 참조 */}
        <div className="w-1/4 border-l border-gray-200 bg-white overflow-y-auto">
          <GlossaryPanel
            glossary={glossary}
            currentSource={currentString?.source || ""}
          />
        </div>
      </div>
    </div>
  );
};

export default TranslationsPage; 