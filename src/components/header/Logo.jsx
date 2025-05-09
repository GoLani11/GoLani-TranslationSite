import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="text-2xl font-bold">
      {import.meta.env.VITE_APP_NAME || 'GoLani Translation Project'}
    </Link>
  );
};

export default Logo; 