const StatCard = ({ title, value, icon, bgColor }) => {
  return (
    <div className={`rounded-lg shadow-sm p-6 ${bgColor}`}>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600 font-medium">{title}</p>
          <p className="text-2xl font-bold mt-2">{value}</p>
        </div>
        <div className="text-indigo-500">{icon}</div>
      </div>
    </div>
  );
};

export default StatCard; 