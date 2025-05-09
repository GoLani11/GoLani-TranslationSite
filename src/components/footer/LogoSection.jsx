import { Link } from 'react-router-dom';

const LogoSection = () => {
  return (
    <div className="col-span-1">
      <Link to="/" className="text-xl font-bold text-white">
        {import.meta.env.VITE_APP_NAME || 'GoLani Translation Project'}
      </Link>
      <p className="mt-2">게이머를 위한 한국어 번역 커뮤니티 프로젝트입니다.</p>
    </div>
  );
};

export default LogoSection; 