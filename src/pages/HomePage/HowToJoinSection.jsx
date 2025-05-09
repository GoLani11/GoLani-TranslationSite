import { Link } from 'react-router-dom';

const StepItem = ({ number, title, description }) => {
  return (
    <li className="flex gap-4">
      <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
        {number}
      </div>
      <div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-600 mt-1">
          {description}
        </p>
      </div>
    </li>
  );
};

const HowToJoinSection = () => {
  const steps = [
    {
      title: "계정 생성하기",
      description: "회원가입을 통해 번역 프로젝트에 참여하세요."
    },
    {
      title: "번역할 항목 선택하기",
      description: "번역이 필요한 항목 중에서 원하는 부분을 선택하세요."
    },
    {
      title: "번역 작업 진행하기",
      description: "편리한 인터페이스에서 번역 작업을 진행하세요."
    },
    {
      title: "검수 및 피드백",
      description: "다른 번역자들의 검수를 통해 번역 품질을 향상시키세요."
    }
  ];

  return (
    <section>
      <h2 className="text-3xl font-bold text-center mb-8">참여 방법</h2>
      <div className="bg-gray-50 p-8 rounded-lg">
        <ol className="space-y-6">
          {steps.map((step, index) => (
            <StepItem 
              key={index} 
              number={index + 1} 
              title={step.title} 
              description={step.description} 
            />
          ))}
        </ol>
      </div>
    </section>
  );
};

export default HowToJoinSection; 