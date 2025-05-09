import { useTranslation } from 'react-i18next';

const Copyright = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <div className="border-t border-gray-700 mt-8 pt-4 text-center">
      <p>&copy; {year} GoLani Translation Project. {t('footer.allRightsReserved', '모든 권리 보유')}</p>
    </div>
  );
};

export default Copyright; 