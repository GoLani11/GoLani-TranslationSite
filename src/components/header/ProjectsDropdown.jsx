import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const ProjectsDropdown = ({ isProjectsOpen, toggleProjects, setIsProjectsOpen, isMobile }) => {
  const { t } = useTranslation();

  const renderDesktopDropdown = () => (
    <div className="relative">
      <button 
        className="flex items-center hover:text-indigo-200 focus:outline-none" 
        onClick={toggleProjects}
      >
        {t('navigation.translations')}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-4 w-4 ml-1 transition-transform ${isProjectsOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isProjectsOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <Link 
            to="/translations/spt" 
            className="block px-4 py-2 text-gray-800 hover:bg-indigo-100"
            onClick={() => setIsProjectsOpen(false)}
          >
            SPT 타르코프
          </Link>
          <Link 
            to="/translations/minecraft" 
            className="block px-4 py-2 text-gray-800 hover:bg-indigo-100"
            onClick={() => setIsProjectsOpen(false)}
          >
            마인크래프트
          </Link>
          <div className="border-t border-gray-200 my-1"></div>
          <Link 
            to="/translations" 
            className="block px-4 py-2 text-gray-800 hover:bg-indigo-100"
            onClick={() => setIsProjectsOpen(false)}
          >
            모든 번역 작업
          </Link>
        </div>
      )}
    </div>
  );

  const renderMobileDropdown = () => (
    <div>
      <button
        className="w-full text-left px-4 py-2 hover:bg-indigo-800 rounded-md flex justify-between items-center"
        onClick={toggleProjects}
      >
        {t('navigation.translations')}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-4 w-4 ml-1 transition-transform ${isProjectsOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isProjectsOpen && (
        <div className="pl-4 mt-1 space-y-1">
          <Link 
            to="/translations/spt" 
            className="block px-4 py-2 hover:bg-indigo-800 rounded-md"
            onClick={() => setIsProjectsOpen(false)}
          >
            SPT 타르코프
          </Link>
          <Link 
            to="/translations/minecraft" 
            className="block px-4 py-2 hover:bg-indigo-800 rounded-md"
            onClick={() => setIsProjectsOpen(false)}
          >
            마인크래프트
          </Link>
          <div className="border-t border-indigo-600 my-1 mx-4"></div>
          <Link 
            to="/translations" 
            className="block px-4 py-2 hover:bg-indigo-800 rounded-md"
            onClick={() => setIsProjectsOpen(false)}
          >
            모든 번역 작업
          </Link>
        </div>
      )}
    </div>
  );

  return isMobile ? renderMobileDropdown() : renderDesktopDropdown();
};

export default ProjectsDropdown; 