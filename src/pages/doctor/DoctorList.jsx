import { useEffect, useState } from 'react';
import { getData, upsertData } from '../../utils/localStorageUtils';
import { Search, Pencil, Trash2, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const getFullName = (d) => [d.firstName, d.lastName].filter(Boolean).join(' ');
const getStatus = (idx) => (idx % 2 === 0 ? 'Active' : 'On Leave');

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const data = getData('doctors') || [];
    setDoctors(data);
  }, []);

  const filteredDoctors = doctors.filter(d =>
    getFullName(d).toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Download handler (CSV)
  const handleDownload = () => {
    const csvRows = [
      ['Name', 'Specialty', 'Status', 'Patients', 'Experience', 'Contact'],
      ...filteredDoctors.map(d => [
        getFullName(d),
        d.specialty || '-',
        d.status || '-',
        d.patients || '-',
        d.experience || '-',
        d.phone || '-',
      ])
    ];
    const csvContent = csvRows.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'doctors.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Delete doctor handler
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      const updated = doctors.filter(d => d.id !== id);
      upsertData('doctors', updated, true);
      setDoctors(updated);
    }
  };

  // Edit doctor handler
  const handleEdit = (id) => {
    navigate(`/doctors/edit?id=${id}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Doctors List</h1>
          <p className="text-sm text-gray-500">A list of all doctors in your clinic with their details.</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="relative w-72">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search doctors..."
              className="pl-10 pr-3 py-2 border rounded-lg w-full shadow-sm text-sm focus:outline-blue-500"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <button onClick={handleDownload} className="flex items-center gap-1 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700">
            <Download size={16} /> Download
          </button>
        </div>
      </div>
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full">
          <thead>
            <tr className="text-left border-b bg-blue-50">
              <th className="px-4 py-3 text-blue-700">Name</th>
              <th className="px-4 py-3 text-blue-700">Specialty</th>
              <th className="px-4 py-3 text-blue-700">Status</th>
              <th className="px-4 py-3 text-blue-700">Experience</th>
              <th className="px-4 py-3 text-blue-700">Contact</th>
              <th className="px-4 py-3 text-blue-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm text-gray-700">
            {filteredDoctors.map((doctor, idx) => (
              <tr key={doctor.id || idx} className="hover:bg-gray-50">
                <td className="px-4 py-3 flex items-center gap-3">
                  <img
                    src={doctor.photo || `https://i.pravatar.cc/40?img=${idx + 20}`}
                    alt={getFullName(doctor)}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="font-medium">{getFullName(doctor)}</span>
                </td>
                <td className="px-4 py-3">{doctor.specialty || '-'}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatus(idx) === 'On Leave' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>
                    {getStatus(idx)}
                  </span>
                </td>
                
                <td className="px-4 py-3">{doctor.experience || '-'}</td>
                <td className="px-4 py-3">{doctor.phone || '-'}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button
                    title="Edit"
                    onClick={() => handleEdit(doctor.id)}
                    className="text-blue-600 hover:bg-blue-50 p-1 rounded"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    title="Delete"
                    onClick={() => handleDelete(doctor.id)}
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

export default DoctorList;
