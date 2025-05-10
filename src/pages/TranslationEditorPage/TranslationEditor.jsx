import { useState, useEffect, useRef } from 'react';

const TranslationEditor = ({ string, onSave, onNext, onPrev }) => {
  const [translation, setTranslation] = useState(string.target || '');
  const [isSaved, setIsSaved] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const textareaRef = useRef(null);

  // 문자열이 변경될 때 번역 필드 업데이트
  useEffect(() => {
    setTranslation(string.target || '');
    setIsSaved(true);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [string]);

  // 기계 번역 샘플 제안 - 실제로는 API에서 가져와야 함
  useEffect(() => {
    if (string.source) {
      // 실제 구현에서는 API 호출 필요 (예: getMachineTranslations(string.source))
      const mockSuggestions = [
        { provider: "Google", text: `[구글] ${string.source}에 대한 번역 제안` },
        { provider: "Microsoft", text: `[마이크로소프트] ${string.source}에 대한 번역 제안` }
      ];
      setSuggestions(mockSuggestions);
    }
  }, [string.source]);

  const handleTranslationChange = (e) => {
    setTranslation(e.target.value);
    setIsSaved(false);
  };

  const handleSave = () => {
    onSave(string.id, translation);
    setIsSaved(true);
  };

  const handleSuggestionClick = (suggestionText) => {
    setTranslation(suggestionText);
    setIsSaved(false);
  };

  // 단축키 처리
  const handleKeyDown = (e) => {
    // Ctrl+Enter 또는 Command+Enter를 눌러 저장
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    }
    // Ctrl+ArrowDown 또는 Command+ArrowDown을 눌러 다음 문자열로 이동
    else if ((e.ctrlKey || e.metaKey) && e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isSaved) {
        handleSave();
      }
      onNext();
    }
    // Ctrl+ArrowUp 또는 Command+ArrowUp을 눌러 이전 문자열로 이동
    else if ((e.ctrlKey || e.metaKey) && e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isSaved) {
        handleSave();
      }
      onPrev();
    }
  };

  // 특수 문자 및 서식 도구 함수
  const insertSpecialChar = (char) => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const text = translation;
      const newText = text.substring(0, start) + char + text.substring(end);
      setTranslation(newText);
      // 텍스트 삽입 후 커서 위치 조정
      setTimeout(() => {
        textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + char.length;
        textareaRef.current.focus();
      }, 0);
      setIsSaved(false);
    }
  };

  return (
    <div className="flex flex-col h-full p-4 bg-white">
      {/* 소스 문자열 섹션 */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold text-gray-800">원본 텍스트</h2>
          <div className="text-sm">
            <span className={`px-2 py-1 rounded-full ${
              string.status === 'translated' ? 'bg-green-100 text-green-800' : 
              string.status === 'needs-review' ? 'bg-yellow-100 text-yellow-800' : 
              'bg-red-100 text-red-800'
            }`}>
              {string.status === 'translated' ? '번역됨' : 
              string.status === 'needs-review' ? '검토필요' : '미번역'}
            </span>
          </div>
        </div>
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="text-lg mb-2">{string.source}</div>
          <div className="flex flex-wrap gap-2 mt-3">
            {string.context && (
              <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-md border border-blue-100">
                컨텍스트: {string.context}
              </span>
            )}
            {string.mainCategory && (
              <span className="text-xs px-2 py-1 bg-indigo-50 text-indigo-700 rounded-md border border-indigo-100">
                메인 카테고리: {string.mainCategory}
              </span>
            )}
            {string.subCategory && (
              <span className="text-xs px-2 py-1 bg-purple-50 text-purple-700 rounded-md border border-purple-100">
                서브 카테고리: {string.subCategory}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 번역 섹션 */}
      <div className="mb-4 flex-1">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold text-gray-800">번역</h2>
          <div className="flex items-center">
            <div className={`text-sm px-2 py-1 rounded-full ${
              isSaved ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
            }`}>
              {isSaved ? '저장됨 ✓' : '저장 필요 ⚠️'}
            </div>
          </div>
        </div>
        
        <div className="rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-2 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-blue-700 text-sm font-medium">번역 편집</span>
              </div>
              <div className="text-xs text-gray-500">
                자동 저장: {isSaved ? '완료' : '대기 중...'}
              </div>
            </div>
          </div>
          
          <textarea
            ref={textareaRef}
            value={translation}
            onChange={handleTranslationChange}
            onKeyDown={handleKeyDown}
            className="w-full p-4 border-0 min-h-[150px] focus:outline-none focus:ring-0 bg-white"
            placeholder="번역을 입력하세요..."
            dir="auto" // 자동 텍스트 방향
          />

          {/* 특수 문자 및 서식 도구 모음 */}
          <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border-t border-gray-200">
            {['…', '—', '"', "'", '«', '»', '·', '•', '→', '★', '☆', '♥'].map(char => (
              <button
                key={char}
                type="button"
                className="px-2 py-1 text-sm bg-white border border-gray-200 rounded hover:bg-gray-100 transition-colors"
                onClick={() => insertSpecialChar(char)}
              >
                {char}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 기계 번역 제안 */}
      <div className="mb-4">
        <h3 className="text-md font-semibold mb-2 text-gray-800">번역 제안</h3>
        <div className="space-y-2">
          {suggestions.map((suggestion, index) => (
            <div 
              key={index}
              className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors bg-white"
              onClick={() => handleSuggestionClick(suggestion.text)}
            >
              <div className="flex items-center mb-1">
                <span className="text-xs font-medium px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                  {suggestion.provider}
                </span>
              </div>
              <div className="text-sm">{suggestion.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 액션 버튼 */}
      <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <button
            onClick={onPrev}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            이전 (Ctrl+↑)
          </button>
          <button
            onClick={onNext}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center"
          >
            다음 (Ctrl+↓)
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaved}
          className={`px-4 py-2 rounded-md transition-colors flex items-center ${
            isSaved
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          저장 (Ctrl+Enter)
        </button>
      </div>

      {/* 단축키 안내 */}
      <div className="mt-4 text-xs text-gray-400 bg-gray-50 p-2 rounded-md">
        <div className="flex flex-wrap gap-x-4">
          <span className="whitespace-nowrap"><kbd className="px-1 py-0.5 bg-white border border-gray-300 rounded">Ctrl+Enter</kbd> 저장</span>
          <span className="whitespace-nowrap"><kbd className="px-1 py-0.5 bg-white border border-gray-300 rounded">Ctrl+↓</kbd> 다음 항목</span> 
          <span className="whitespace-nowrap"><kbd className="px-1 py-0.5 bg-white border border-gray-300 rounded">Ctrl+↑</kbd> 이전 항목</span>
        </div>
      </div>
    </div>
  );
};

export default TranslationEditor; 