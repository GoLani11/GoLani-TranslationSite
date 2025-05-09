import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { auth } from '../lib/supabase';

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  return (
    <header className="bg-indigo-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* 로고 */}
          <Link to="/" className="text-2xl font-bold">
            {import.meta.env.VITE_APP_NAME || 'SPT 한글화 프로젝트'}
          </Link>

          {/* 모바일 메뉴 버튼 */}
          <button
            className="md:hidden"
            onClick={toggleMenu}
            aria-label="메뉴 열기"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* 데스크톱 메뉴 */}
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
              to="/translations"
              className={({ isActive }) =>
                isActive ? 'font-bold' : 'hover:text-indigo-200'
              }
            >
              {t('navigation.translations')}
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? 'font-bold' : 'hover:text-indigo-200'
              }
            >
              {t('navigation.dashboard')}
            </NavLink>
            
            {isLoggedIn ? (
              <>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive ? 'font-bold' : 'hover:text-indigo-200'
                  }
                >
                  {t('navigation.profile')}
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="hover:text-indigo-200"
                >
                  {t('auth.logout')}
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                className="bg-white text-indigo-700 px-4 py-2 rounded-md font-medium hover:bg-indigo-50"
              >
                {t('auth.login')}
              </NavLink>
            )}
          </nav>
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
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
              to="/translations"
              className={({ isActive }) =>
                isActive
                  ? 'bg-indigo-800 px-4 py-2 rounded-md'
                  : 'px-4 py-2 hover:bg-indigo-800 rounded-md'
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {t('navigation.translations')}
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
              {t('navigation.dashboard')}
            </NavLink>
            
            {isLoggedIn ? (
              <>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive
                      ? 'bg-indigo-800 px-4 py-2 rounded-md'
                      : 'px-4 py-2 hover:bg-indigo-800 rounded-md'
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('navigation.profile')}
                </NavLink>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="text-left px-4 py-2 hover:bg-indigo-800 rounded-md"
                >
                  {t('auth.logout')}
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                className="bg-white text-indigo-700 px-4 py-2 rounded-md font-medium hover:bg-indigo-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('auth.login')}
              </NavLink>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header; 