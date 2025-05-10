import React from 'react';

const FilterBar = ({ filter, setFilter }) => {
  const filters = [
    { id: 'all', label: '전체', icon: '🔍' },
    { id: 'untranslated', label: '미번역', icon: '📝', color: 'bg-red-600' },
    { id: 'translated', label: '완료', icon: '✓', color: 'bg-green-600' },
    { id: 'needs-review', label: '검토 필요', icon: '⚠️', color: 'bg-yellow-600' }
  ];

  return (
    <div className="p-3 bg-blue-50 border-b border-blue-100">
      <div className="flex flex-wrap gap-2 justify-center">
        {filters.map(item => (
          <button
            key={item.id}
            onClick={() => setFilter(item.id)}
            className={`px-3 py-1.5 text-sm rounded-full transition-all ${
              filter === item.id
                ? `${item.color || 'bg-blue-600'} text-white shadow-md` 
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
            } flex items-center`}
          >
            {item.icon && <span className="mr-1">{item.icon}</span>}
            {item.label}
          </button>
        ))}
      </div>
      
      {/* 검색 필드 */}
      <div className="mt-3 flex items-center">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input
            type="text"
            placeholder="검색..."
            className="w-full pl-10 pr-3 py-2 text-sm border border-blue-200 bg-white rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>
      
      {/* 빠른 이동 버튼 */}
      {/* 삭제된 빠른 이동 버튼 */}
    </div>
  );
};

export default FilterBar; 