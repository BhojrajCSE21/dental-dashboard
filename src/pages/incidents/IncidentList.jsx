import { useEffect, useState } from 'react';
import { getData, upsertData } from '../../utils/localStorageUtils';
import { Pencil, Trash2, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const IncidentList = () => {
  const [incidents, setIncidents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const data = getData('incidents') || [];
    setIncidents(data);
  }, []);

  const filteredIncidents = incidents.filter(inc =>
    (inc.reason || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (inc.type || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Delete incident handler
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      const updated = incidents.filter(i => i.id !== id);
      upsertData('incidents', updated, true);
      setIncidents(updated);
    }
  };

  // Edit incident handler
  const handleEdit = (id) => {
    navigate(`/incidents/edit?id=${id}`);
  };

  // Fetch patients for lookup
  const patients = getData('patients') || [];
  const getPatient = (id) => patients.find(p => p.id === id);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
          <p className="text-sm text-gray-500">All booked appointments and their details.</p>
        </div>
        <div className="relative w-72">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search appointments..."
            className="pl-10 pr-3 py-2 border rounded-lg w-full shadow-sm text-sm focus:outline-blue-500"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full">
          <thead>
            <tr className="text-left border-b bg-blue-50">
              <th className="px-4 py-3 text-blue-700">Patient</th>
              <th className="px-4 py-3 text-blue-700">Type</th>
              <th className="px-4 py-3 text-blue-700">Status</th>
              <th className="px-4 py-3 text-blue-700">Date</th>
              <th className="px-4 py-3 text-blue-700">Time</th>
              <th className="px-4 py-3 text-blue-700">Duration</th>
              <th className="px-4 py-3 text-blue-700">Reason</th>
              <th className="px-4 py-3 text-blue-700">Doctor</th>
              <th className="px-4 py-3 text-blue-700">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm text-gray-700">
            {filteredIncidents.map((inc, idx) => {
              const patient = getPatient(inc.patientId);
              return (
                <tr key={inc.id || idx} className="hover:bg-gray-50">
                  <td className="px-4 py-3 flex items-center gap-3">
                    <img
                      src={patient?.photo || `https://i.pravatar.cc/40?img=${idx + 10}`}
                      alt={patient ? [patient.firstName, patient.middleName, patient.lastName].filter(Boolean).join(' ') : 'Patient'}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="font-medium">{patient ? [patient.firstName, patient.middleName, patient.lastName].filter(Boolean).join(' ') : '—'}</span>
                  </td>
                  <td className="px-4 py-3">{inc.type || '—'}</td>
                  <td className="px-4 py-3">{inc.status || '—'}</td>
                  <td className="px-4 py-3">{inc.date || '—'}</td>
                  <td className="px-4 py-3">{inc.time || '—'}</td>
                  <td className="px-4 py-3">{inc.duration ? `${inc.duration} min` : '—'}</td>
                  <td className="px-4 py-3">{inc.reason || '—'}</td>
                  <td className="px-4 py-3">{inc.doctor || '—'}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      title="Edit"
                      onClick={() => handleEdit(inc.id)}
                      className="text-blue-600 hover:bg-blue-50 p-1 rounded"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      title="Delete"
                      onClick={() => handleDelete(inc.id)}
                      className="text-red-600 hover:bg-red-50 p-1 rounded"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IncidentList;
