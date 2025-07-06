import { useEffect, useState } from 'react';
import { getData } from '../../utils/localStorageUtils';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from '../../components/common/StatCard';

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    const incidents = getData('incidents') || [];
    const upcoming = incidents
      .filter(i => new Date(i.appointmentDate) > new Date())
      .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate))
      .slice(0, 10);

    const completed = incidents.filter(i => i.status === 'Completed');
    const totalRevenue = completed.reduce((acc, i) => acc + (i.cost || 0), 0);

    setAppointments(upcoming);
    setCompletedCount(completed.length);
    setRevenue(totalRevenue);
    setPatients(getData('patients') || []);
  }, []);

  const pieData = [
    { name: 'Completed', value: completedCount },
    { name: 'Upcoming', value: appointments.length },
  ];

  const COLORS = ['#4F46E5', '#60A5FA'];

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-3xl font-bold text-blue-800">Doctor Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Patients" value={patients.length} />
        <StatCard label="Upcoming Appointments" value={appointments.length} />
        <StatCard label="Completed Treatments" value={completedCount} />
        <StatCard label="Total Revenue" value={`₹${revenue}`} />
      </div>

      {/* Graph + Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Appointment Summary</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Next 10 Appointments */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Next 10 Appointments</h2>
          {appointments.length === 0 ? (
            <p className="text-sm text-gray-500">No upcoming appointments found.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {appointments.map(apt => (
                <li key={apt.id} className="py-2">
                  <p className="text-sm font-medium text-blue-700">{apt.title}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(apt.appointmentDate).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
