import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

const AuthButtons = ({ isLoggedIn, handleLogout, isMobile, setIsMenuOpen }) => {
  const { t } = useTranslation();

  // 모바일 로그인 상태일 때의 컴포넌트
  if (isMobile && isLoggedIn) {
    return (
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
    );
  }

  // 모바일 로그아웃 상태일 때의 컴포넌트
  if (isMobile && !isLoggedIn) {
    return (
      <NavLink
        to="/login"
        className="bg-white text-indigo-700 px-4 py-2 rounded-md font-medium hover:bg-indigo-50"
        onClick={() => setIsMenuOpen(false)}
      >
        {t('auth.login')}
      </NavLink>
    );
  }

  // 데스크톱 로그인 상태일 때의 컴포넌트
  if (isLoggedIn) {
    return (
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
    );
  }

  // 데스크톱 로그아웃 상태일 때의 컴포넌트
  return (
    <NavLink
      to="/login"
      className="bg-white text-indigo-700 px-4 py-2 rounded-md font-medium hover:bg-indigo-50"
    >
      {t('auth.login')}
    </NavLink>
  );
};

export default AuthButtons; 