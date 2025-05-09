import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 overflow-hidden bg-gray-200">
        {project.image && (
          <img 
            src={project.image} 
            alt={project.name} 
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = '/images/placeholder.jpg'; }}
          />
        )}
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{project.name}</h3>
        <p className="text-gray-600 mb-4">{project.description}</p>
        
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">진행률</span>
            <span className="text-sm font-medium">{project.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${project.progress}%` }}></div>
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="text-sm font-semibold mb-2">카테고리</h4>
          <div className="flex flex-wrap gap-2">
            {project.categories.map((category, idx) => (
              <span key={idx} className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-md text-xs">
                {category}
              </span>
            ))}
          </div>
        </div>
        
        <Link 
          to={`/translations/${project.slug}`}
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          이 프로젝트 참여하기
        </Link>
      </div>
    </div>
  );
};

const ProjectsSection = ({ projects }) => {
  return (
    <section>
      <h2 className="text-3xl font-bold text-center mb-10">진행 중인 프로젝트</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection; 