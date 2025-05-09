const StatItem = ({ value, label }) => {
  return (
    <div className="text-center">
      <p className="text-4xl font-bold">{value}</p>
      <p className="text-lg">{label}</p>
    </div>
  );
};

const StatsSection = () => {
  const stats = [
    { value: "1,234", label: "번역 완료" },
    { value: "56", label: "활동 번역자" },
    { value: "89%", label: "전체 진행률" },
    { value: "78", label: "남은 항목" },
  ];

  return (
    <section className="bg-indigo-700 text-white py-12 rounded-lg">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">프로젝트 현황</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatItem key={index} value={stat.value} label={stat.label} />
        ))}
      </div>
    </section>
  );
};

export default StatsSection; 