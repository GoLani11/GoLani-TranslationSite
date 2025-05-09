import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

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

  return (
    <div className="flex flex-col gap-16 py-8">
      {/* 히어로 섹션 */}
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          SPT 한글화 프로젝트
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
          효율적이고 체계적인 번역 작업을 위한 최적의 플랫폼에 오신 것을 환영합니다.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/translations"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-md transition-colors"
          >
            번역 시작하기
          </Link>
          <Link
            to="/dashboard"
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-md transition-colors"
          >
            진행 상황 보기
          </Link>
        </div>
      </section>

      {/* 기능 소개 섹션 */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12">주요 기능</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 통계 섹션 */}
      <section className="bg-indigo-700 text-white py-12 rounded-lg">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">프로젝트 현황</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-4xl font-bold">1,234</p>
            <p className="text-lg">번역 완료</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold">56</p>
            <p className="text-lg">활동 번역자</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold">89%</p>
            <p className="text-lg">전체 진행률</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold">78</p>
            <p className="text-lg">남은 항목</p>
          </div>
        </div>
      </section>

      {/* 참여 방법 섹션 */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">참여 방법</h2>
        <div className="bg-gray-50 p-8 rounded-lg">
          <ol className="space-y-6">
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold">계정 생성하기</h3>
                <p className="text-gray-600 mt-1">
                  회원가입을 통해 번역 프로젝트에 참여하세요.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold">번역할 항목 선택하기</h3>
                <p className="text-gray-600 mt-1">
                  번역이 필요한 항목 중에서 원하는 부분을 선택하세요.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold">번역 작업 진행하기</h3>
                <p className="text-gray-600 mt-1">
                  편리한 인터페이스에서 번역 작업을 진행하세요.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold">검수 및 피드백</h3>
                <p className="text-gray-600 mt-1">
                  다른 번역자들의 검수를 통해 번역 품질을 향상시키세요.
                </p>
              </div>
            </li>
          </ol>
          <div className="mt-8 text-center">
            <Link
              to="/register"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-md transition-colors inline-block"
            >
              지금 참여하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 