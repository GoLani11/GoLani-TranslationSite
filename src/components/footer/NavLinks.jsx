import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const NavLinks = () => {
  const { t } = useTranslation();

  return (
    <div className="col-span-1">
      <h3 className="text-lg font-semibold text-white mb-4">{t('navigation.title', '페이지')}</h3>
      <ul className="space-y-2">
        <li>
          <Link to="/" className="hover:text-white">
            {t('navigation.home')}
          </Link>
        </li>
        <li>
          <Link to="/translations" className="hover:text-white">
            {t('navigation.translations')}
          </Link>
        </li>
        <li>
          <Link to="/translations/spt" className="hover:text-white">
            SPT 타르코프
          </Link>
        </li>
        <li>
          <Link to="/translations/minecraft" className="hover:text-white">
            마인크래프트
          </Link>
        </li>
        <li>
          <Link to="/dashboard" className="hover:text-white">
            {t('navigation.dashboard')}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavLinks; 