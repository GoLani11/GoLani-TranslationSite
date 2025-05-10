import { useState, useEffect } from 'react';

const GlossaryPanel = ({ glossary, currentSource }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGlossary, setFilteredGlossary] = useState([]);
  const [relevantTerms, setRelevantTerms] = useState([]);

  // 검색어 입력 시 필터링
  useEffect(() => {
    if (searchTerm) {
      const filtered = glossary.filter(
        item => 
          item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
          item.translation.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredGlossary(filtered);
    } else {
      setFilteredGlossary(glossary);
    }
  }, [searchTerm, glossary]);

  // 현재 문자열에서 관련 용어 찾기
  useEffect(() => {
    if (currentSource && glossary.length > 0) {
      const lowerSource = currentSource.toLowerCase();
      const relevant = glossary.filter(
        item => lowerSource.includes(item.term.toLowerCase())
      );
      setRelevantTerms(relevant);
    } else {
      setRelevantTerms([]);
    }
  }, [currentSource, glossary]);

  // 모든 용어를 알파벳 순으로 정렬
  const sortedGlossary = [...filteredGlossary].sort((a, b) => 
    a.term.localeCompare(b.term)
  );

  return (
    <div className="p-4 bg-white h-full">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">용어집</h2>
      
      {/* 검색 입력 */}
      <div className="mb-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="용어 검색..."
            className="w-full pl-10 pr-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* 현재 문자열과 관련된 용어 */}
      {relevantTerms.length > 0 && (
        <div className="mb-4">
          <h3 className="text-md font-semibold mb-2 text-blue-600">이 문자열의 용어</h3>
          <div className="space-y-2 bg-blue-50 p-3 rounded-md border border-blue-100">
            {relevantTerms.map((term, index) => (
              <div key={index} className="border-b border-blue-100 pb-2 last:border-b-0">
                <div className="flex justify-between">
                  <span className="font-medium">{term.term}</span>
                  <span className="text-blue-700">{term.translation}</span>
                </div>
                {term.description && (
                  <p className="text-xs text-gray-600 mt-1">{term.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 모든 용어 목록 */}
      <div className="space-y-4">
        <h3 className="text-md font-semibold text-gray-800">전체 용어 목록</h3>
        
        {sortedGlossary.length === 0 ? (
          <div className="text-gray-500 text-center py-4 bg-gray-50 rounded-md">
            {searchTerm ? '검색 결과가 없습니다.' : '등록된 용어가 없습니다.'}
          </div>
        ) : (
          <div className="divide-y divide-gray-200 max-h-[500px] overflow-y-auto rounded-md border border-gray-200 bg-white">
            {sortedGlossary.map((term, index) => (
              <div key={index} className="py-2 px-3 hover:bg-gray-50">
                <div className="flex justify-between">
                  <span className="font-medium">{term.term}</span>
                  <span className="text-blue-600">{term.translation}</span>
                </div>
                {term.description && (
                  <p className="text-xs text-gray-600 mt-1">{term.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 새 용어 추가 버튼 */}
      <div className="mt-6">
        <button
          className="w-full py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 flex items-center justify-center transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          새 용어 추가
        </button>
      </div>
    </div>
  );
};

export default GlossaryPanel; 