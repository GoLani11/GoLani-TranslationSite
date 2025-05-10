import React from 'react';

const TranslationProgress = ({ total, translated, needsReview }) => {
  // 진행 상황 계산
  const translatedPercent = Math.round((translated / total) * 100) || 0;
  const reviewPercent = Math.round((needsReview / total) * 100) || 0;
  const untranslatedPercent = 100 - translatedPercent - reviewPercent;

  return (
    <div className="bg-white p-3 rounded-md shadow-sm">
      <h3 className="text-sm font-semibold mb-2">번역 진행 상황</h3>
      
      {/* 진행 상황 바 */}
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div className="flex h-full">
          <div 
            className="bg-green-500 h-full" 
            style={{ width: `${translatedPercent}%` }}
          />
          <div 
            className="bg-yellow-500 h-full" 
            style={{ width: `${reviewPercent}%` }}
          />
        </div>
      </div>
      
      {/* 진행 상황 수치 */}
      <div className="flex justify-between text-xs mt-2 text-gray-600">
        <div className="flex items-center">
          <span className="w-2 h-2 rounded-full bg-green-500 inline-block mr-1"></span>
          <span>완료: {translated}/{total} ({translatedPercent}%)</span>
        </div>
        <div className="flex items-center">
          <span className="w-2 h-2 rounded-full bg-yellow-500 inline-block mr-1"></span>
          <span>검토 필요: {needsReview}/{total} ({reviewPercent}%)</span>
        </div>
        <div className="flex items-center">
          <span className="w-2 h-2 rounded-full bg-gray-300 inline-block mr-1"></span>
          <span>미번역: {total - translated - needsReview}/{total} ({untranslatedPercent}%)</span>
        </div>
      </div>
    </div>
  );
};

export default TranslationProgress; 