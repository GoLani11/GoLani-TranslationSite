import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        GoLani Translation Project
      </h1>
      <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
        게이머를 위한 한국어 번역 커뮤니티에 오신 것을 환영합니다.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/dashboard"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-md transition-colors"
        >
          프로젝트 살펴보기
        </Link>
        <Link
          to="/translations"
          className="bg-white border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-semibold py-3 px-6 rounded-md transition-colors"
        >
          번역 참여하기
        </Link>
      </div>
    </section>
  );
};

export default HeroSection; 