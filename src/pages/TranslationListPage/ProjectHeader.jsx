import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const ProjectHeader = ({ project }) => {
  const { t } = useTranslation();

  if (!project) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md mb-6 animate-pulse">
        <div className="h-8 bg-gray-200 w-1/3 mb-2"></div>
        <div className="h-4 bg-gray-100 w-2/3 mb-4"></div>
        <div className="h-2 bg-gray-200 w-full mb-2"></div>
        <div className="h-2 bg-gray-200 w-5/6"></div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
          <p className="text-gray-500 mt-1">{project.description}</p>
        </div>
        <Link
          to="/translations"
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg
            className="-ml-0.5 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          {t('translation.backToProjects')}
        </Link>
      </div>

      <div className="mt-6">
        <div className="flex items-center mb-2">
          <h2 className="text-lg font-medium text-gray-900 mr-2">
            {t('translation.progressStatus')}
          </h2>
          <span className="text-sm text-gray-500">
            ({project.progress}% {t('translation.completed')})
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-indigo-600 h-4 rounded-full"
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader; 