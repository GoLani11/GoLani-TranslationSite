import { useTranslation } from 'react-i18next';
import HeroSection from './HeroSection';
import ProjectsSection from './ProjectsSection';
import FeaturesSection from './FeaturesSection';
import StatsSection from './StatsSection';
import HowToJoinSection from './HowToJoinSection';

const HomePage = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-indigo-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
          />
        </svg>
      ),
      title: '실시간 번역 환경',
      description: '여러 번역자가 동시에 작업할 수 있는 실시간 협업 환경을 제공합니다.',
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-indigo-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      title: '진행 상황 관리',
      description: '번역 작업의 진행 상황을 추적하고 관리할 수 있습니다.',
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-indigo-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
      title: '안전한 접근 제어',
      description: '역할 기반 접근 제어로 각 사용자의 권한을 세밀하게 관리합니다.',
    },
  ];

  const projects = [
    {
      name: 'SPT 타르코프',
      slug: 'spt',
      description: 'Single Player Tarkov 게임의 한글화 프로젝트입니다. 게임 내 모든 텍스트와 모드의 번역을 진행합니다.',
      image: '/images/spt.jpg',
      categories: ['SPT 타르코프 한글화 프로젝트', '플러그인 모드', '퀘스트 모드'],
      progress: 89,
    },
    {
      name: '마인크래프트',
      slug: 'minecraft',
      description: '마인크래프트 게임 및 각종 모드의 한글화 프로젝트입니다. 바닐라 게임부터 인기 모드까지 번역합니다.',
      image: '/images/minecraft.jpg',
      categories: ['바닐라', '모드', '텍스처팩', '서버 리소스'],
      progress: 72,
    },
  ];

  return (
    <div className="flex flex-col gap-16 py-8">
      <HeroSection />
      <ProjectsSection projects={projects} />
      <FeaturesSection features={features} />
      <StatsSection />
      <HowToJoinSection />
    </div>
  );
};

export default HomePage; 