import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getData } from '../../utils/localStorageUtils';

const PatientView = () => {
  const { currentUser } = useAuth();
  const [patient, setPatient] = useState(null);
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    if (currentUser?.patientId) {
      const p = getData('patients').find(p => p.id === currentUser.patientId);
      const i = getData('incidents').filter(i => i.patientId === currentUser.patientId);
      setPatient(p);
      setIncidents(i);
    }
  }, [currentUser]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">My Profile</h1>
      {patient && (
        <div className="mb-4 bg-white p-4 rounded shadow">
          <p><strong>Name:</strong> {patient.name}</p>
          <p><strong>DOB:</strong> {patient.dob}</p>
          <p><strong>Contact:</strong> {patient.contact}</p>
          <p><strong>Health Info:</strong> {patient.healthInfo}</p>
        </div>
      )}
      <h2 className="text-xl font-semibold mb-2">Appointments</h2>
      <ul className="bg-white p-4 rounded shadow">
        {incidents.map(inc => (
          <li key={inc.id} className="border-b last:border-none py-2">
            <p><strong>{inc.title}</strong> - {new Date(inc.appointmentDate).toLocaleString()}</p>
            <p>Status: {inc.status}</p>
            <p>Cost: ₹{inc.cost}</p>
            {inc.files?.map((file, idx) => (
              <a key={idx} href={file.url} target="_blank" rel="noreferrer" className="text-blue-600 text-sm block mt-1">{file.name}</a>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientView;
