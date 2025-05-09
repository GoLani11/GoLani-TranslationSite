import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../lib/supabase';
import { 
  Logo, 
  MenuButton, 
  DesktopMenu, 
  MobileMenu 
} from './header/index';

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 사용자 로그인 상태 확인 (실제 구현 시에는 context 사용 권장)
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await auth.getCurrentUser();
      setIsLoggedIn(!!data?.user);
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    setIsLoggedIn(false);
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProjects = () => {
    setIsProjectsOpen(!isProjectsOpen);
  };

  return (
    <header className="bg-indigo-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* 로고 */}
          <Logo />

          {/* 모바일 메뉴 버튼 */}
          <MenuButton isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

          {/* 데스크톱 메뉴 */}
          <DesktopMenu 
            isLoggedIn={isLoggedIn}
            handleLogout={handleLogout}
            isProjectsOpen={isProjectsOpen}
            toggleProjects={toggleProjects}
            setIsProjectsOpen={setIsProjectsOpen}
          />
        </div>

        {/* 모바일 메뉴 */}
        <MobileMenu 
          isMenuOpen={isMenuOpen}
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
          isProjectsOpen={isProjectsOpen}
          toggleProjects={toggleProjects}
          setIsProjectsOpen={setIsProjectsOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
      </div>
    </header>
  );
};

export default Header; 