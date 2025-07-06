// File: src/components/common/StatCard.jsx
const StatCard = ({ label, value, icon, bgColor = "bg-blue-500" }) => (
  <div className={`flex items-center p-4 rounded-xl shadow ${bgColor} text-white`}>
    <div className="mr-4">{icon}</div>
    <div>
      <p className="text-sm font-medium">{label}</p>
      <h3 className="text-xl font-bold">{value}</h3>
    </div>
  </div>
);

export default StatCard;
