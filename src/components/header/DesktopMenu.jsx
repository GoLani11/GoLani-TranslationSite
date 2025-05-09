import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import ProjectsDropdown from './ProjectsDropdown';
import AuthButtons from './AuthButtons';

const DesktopMenu = ({
  isLoggedIn,
  handleLogout,
  isProjectsOpen,
  toggleProjects,
  setIsProjectsOpen
}) => {
  const { t } = useTranslation();

  return (
    <nav className="hidden md:flex md:items-center space-x-6">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? 'font-bold' : 'hover:text-indigo-200'
        }
      >
        {t('navigation.home')}
      </NavLink>
      
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          isActive ? 'font-bold' : 'hover:text-indigo-200'
        }
      >
        {t('navigation.projects')}
      </NavLink>
      
      <ProjectsDropdown 
        isProjectsOpen={isProjectsOpen} 
        toggleProjects={toggleProjects} 
        setIsProjectsOpen={setIsProjectsOpen} 
        isMobile={false}
      />
      
      <AuthButtons 
        isLoggedIn={isLoggedIn} 
        handleLogout={handleLogout} 
        isMobile={false}
      />
    </nav>
  );
};

export default DesktopMenu; 