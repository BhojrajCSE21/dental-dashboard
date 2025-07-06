import { useEffect, useState } from 'react';
import { getData } from '../../utils/localStorageUtils';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from '../../components/common/StatCard';
import { CalendarDays, User, CheckCircle, DollarSign } from 'lucide-react';

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    const incidents = getData('incidents') || [];

    const allSorted = incidents
      .filter(i => i.appointmentDate)
      .sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate)); // latest first

    const completed = incidents.filter(i => i.status === 'Completed');
    const totalRevenue = completed.reduce((acc, i) => acc + (i.cost || 0), 0);

    setAppointments(allSorted.slice(0, 10)); // show top 10 recent
    setCompletedCount(completed.length);
    setRevenue(totalRevenue);
    setPatients(getData('patients') || []);
  }, []);


  const pieData = [
    { name: 'Completed', value: completedCount },
    { name: 'Upcoming', value: appointments.length },
  ];

  const COLORS = ['#34D399', '#3B82F6'];

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-blue-800">Admin Dental Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<User className="text-white" />} label="Total Patients" value={patients.length} bgColor="bg-blue-600" />
        <StatCard icon={<CalendarDays className="text-white" />} label="Upcoming Appointments" value={appointments.length} bgColor="bg-indigo-500" />
        <StatCard icon={<CheckCircle className="text-white" />} label="Completed Treatments" value={completedCount} bgColor="bg-green-500" />
        <StatCard icon={<DollarSign className="text-white" />} label="Total Revenue" value={`₹${revenue}`} bgColor="bg-yellow-500" />
      </div>

      {/* Charts & Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Appointment Summary</h2>
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

        {/* Appointment List */}
        {/* Appointments Table (Latest 10) */}
        <div className="bg-white rounded-2xl shadow-md p-6 overflow-x-auto">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Latest 10 Appointments</h2>
          {appointments.length === 0 ? (
            <p className="text-sm text-gray-500">No appointments found.</p>
          ) : (
            <table className="min-w-full text-sm text-left text-gray-600">
              <thead className="text-xs uppercase bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-3">Patient</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Time</th>
                  <th className="px-4 py-3">Doctor</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Reason</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {appointments.map((apt, idx) => {
                  const patient = patients.find(p => p.id === apt.patientId);
                  return (
                    <tr key={apt.id || idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3 flex items-center gap-3">
                        <img
                          src={patient?.photo || `https://i.pravatar.cc/40?img=${idx + 10}`}
                          alt="Patient"
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="font-medium">
                          {patient
                            ? [patient.firstName, patient.middleName, patient.lastName].filter(Boolean).join(' ')
                            : '—'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {apt.date || new Date(apt.appointmentDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">{apt.time || new Date(apt.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                      <td className="px-4 py-3">{apt.doctor || '—'}</td>
                      <td className="px-4 py-3">{apt.status || '—'}</td>
                      <td className="px-4 py-3">{apt.reason || apt.title || '—'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
