import { useEffect, useState } from 'react';
import { getData, upsertData } from '../../utils/localStorageUtils';
import { Search, Pencil, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const getFullName = (p) =>
  [p.firstName, p.middleName, p.lastName].filter(Boolean).join(' ');

const getStatus = (idx) => (idx % 2 === 0 ? 'Active' : 'Pending');

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const data = getData('patients') || [];
    setPatients(data);
  }, []);

  const filteredPatients = patients.filter(p =>
    getFullName(p).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const today = new Date().toLocaleDateString();

  // Delete patient handler
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      const updated = patients.filter(p => p.id !== id);
      upsertData('patients', updated, true); // true to overwrite array
      setPatients(updated);
    }
  };

  // Edit patient handler
  const handleEdit = (id) => {
    navigate(`/patients/edit?id=${id}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patients List</h1>
          <p className="text-sm text-gray-500">A list of all patients in your clinic with their details.</p>
        </div>
        <div className="relative w-72">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search patients..."
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
              <th className="px-4 py-3 text-blue-700">Name</th>
              <th className="px-4 py-3 text-blue-700">Age/Gender</th>
              <th className="px-4 py-3 text-blue-700">Status</th>
              <th className="px-4 py-3 text-blue-700">Last Visit</th>
              <th className="px-4 py-3 text-blue-700">Condition</th>
              <th className="px-4 py-3 text-blue-700">Doctor</th>
              <th className="px-4 py-3 text-blue-700">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm text-gray-700">
            {filteredPatients.map((patient, idx) => (
              <tr key={patient.id || idx} className="hover:bg-gray-50">
                <td className="px-4 py-3 flex items-center gap-3">
                  <img
                    src={patient.photo || `https://i.pravatar.cc/40?img=${idx + 10}`}
                    alt={getFullName(patient)}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="font-medium">{getFullName(patient)}</span>
                </td>
                <td className="px-4 py-3">
                  {patient.age || '—'} • {patient.gender || '—'}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      getStatus(idx) === 'Pending'
                        ? 'bg-yellow-200 text-yellow-800'
                        : 'bg-green-200 text-green-800'
                    }`}
                  >
                    {getStatus(idx)}
                  </span>
                </td>
                <td className="px-4 py-3">{today}</td>
                <td className="px-4 py-3">{patient.allergies || '—'}</td>
                <td className="px-4 py-3">{patient.doctor || '—'}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button
                    title="Edit"
                    onClick={() => handleEdit(patient.id)}
                    className="text-blue-600 hover:bg-blue-50 p-1 rounded"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    title="Delete"
                    onClick={() => handleDelete(patient.id)}
                    className="text-red-600 hover:bg-red-50 p-1 rounded"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientList;