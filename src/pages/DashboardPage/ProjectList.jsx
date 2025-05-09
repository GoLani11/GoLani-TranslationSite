import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ProgressBar from '../../components/common/ProgressBar';

const Project = ({ project, isExpanded, onToggle }) => {
  const { t } = useTranslation();
  
  return (
    <div className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
      <div 
        className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center">
          <h3 className="text-lg font-semibold">{project.name}</h3>
          <span className="ml-2 text-sm text-gray-600">({project.progress}% 완료)</span>
        </div>
        <button className="text-gray-600">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      
      {isExpanded && (
        <div className="p-4 bg-white">
          <div className="mb-4">
            <ProgressBar
              value={project.progress}
              label="전체 진행률"
              color="bg-indigo-600"
            />
          </div>
          
          {project.mainCategories.map((category) => (
            <div key={category.id} className="mt-6">
              <h4 className="text-md font-medium mb-4">{category.name}</h4>
              
              {/* 여기에서는 목업 데이터로 임의의 진행률을 부여합니다.
                  실제 구현에서는 각 카테고리별 진행률 데이터를 사용해야 합니다. */}
              <div className="grid grid-cols-1 gap-3">
                {category.subCategories.map((subCategory, index) => {
                  // 임의의 진행률 생성 (70~100 사이)
                  const progress = Math.floor(Math.random() * 30) + 70;
                  return (
                    <div key={index} className="flex items-center">
                      <div className="w-1/4 text-sm">{subCategory}</div>
                      <div className="w-3/4">
                        <div className="relative pt-1">
                          <div className="flex items-center justify-between">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
                            </div>
                            <span className="text-xs text-gray-600 ml-2">{progress}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          
          <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
            <Link
              to={`/projects/${project.id}`}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              프로젝트 상세보기
            </Link>
            <Link
              to={`/translations/${project.id}`}
              className="bg-white border border-indigo-600 text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-50 transition-colors"
            >
              번역 참여하기
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

const ProjectList = ({ projects }) => {
  const { t } = useTranslation();
  const [expandedProjects, setExpandedProjects] = useState({});
  
  const toggleProject = (projectId) => {
    setExpandedProjects(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">{t('dashboard.projectProgress', '프로젝트 진행 상황')}</h2>
      
      {projects.length === 0 ? (
        <p className="text-gray-600">진행 중인 프로젝트가 없습니다.</p>
      ) : (
        <div>
          {projects.map(project => (
            <Project 
              key={project.id} 
              project={project} 
              isExpanded={!!expandedProjects[project.id]}
              onToggle={() => toggleProject(project.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectList; 