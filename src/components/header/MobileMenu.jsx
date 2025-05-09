import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import ProjectsDropdown from './ProjectsDropdown';
import AuthButtons from './AuthButtons';

const MobileMenu = ({
  isMenuOpen,
  isLoggedIn,
  handleLogout,
  isProjectsOpen,
  toggleProjects,
  setIsProjectsOpen,
  setIsMenuOpen
}) => {
  const { t } = useTranslation();

  if (!isMenuOpen) return null;

  return (
    <nav className="md:hidden mt-4 flex flex-col space-y-2">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? 'bg-indigo-800 px-4 py-2 rounded-md'
            : 'px-4 py-2 hover:bg-indigo-800 rounded-md'
        }
        onClick={() => setIsMenuOpen(false)}
      >
        {t('navigation.home')}
      </NavLink>
      
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          isActive
            ? 'bg-indigo-800 px-4 py-2 rounded-md'
            : 'px-4 py-2 hover:bg-indigo-800 rounded-md'
        }
        onClick={() => setIsMenuOpen(false)}
      >
        {t('navigation.projects')}
      </NavLink>
      
      <ProjectsDropdown 
        isProjectsOpen={isProjectsOpen} 
        toggleProjects={toggleProjects} 
        setIsProjectsOpen={setIsProjectsOpen} 
        isMobile={true}
      />
      
      <AuthButtons 
        isLoggedIn={isLoggedIn} 
        handleLogout={handleLogout} 
        isMobile={true}
        setIsMenuOpen={setIsMenuOpen}
      />
    </nav>
  );
};

export default MobileMenu; 