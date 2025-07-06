// File: src/components/common/StatCard.jsx
const StatCard = ({ label, value }) => (
  <div className="bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-all">
    <p className="text-sm text-gray-500 mb-1">{label}</p>
    <h3 className="text-2xl font-semibold text-blue-600">{value}</h3>
  </div>
);

export default StatCard;
