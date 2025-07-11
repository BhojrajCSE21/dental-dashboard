import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getData, upsertData } from '../../utils/localStorageUtils';

const APPOINTMENT_TYPES = [
  'Consultation',
  'Follow-up',
  'Cleaning',
  'Root Canal',
  'Extraction',
  'Other'
];

const TIME_SLOTS = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
];

const STATUS_OPTIONS = [
  'Scheduled',
  'Tentative (Pending Confirmation)',
  'Add to Waitlist'
];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const EditIncident = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const id = query.get('id');
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch doctors and patients
  const doctors = getData('doctors') || [];
  const patients = getData('patients') || [];
  const currentUser = getData('currentUser') || {};

  useEffect(() => {
    const incidents = getData('incidents') || [];
    const incident = incidents.find(i => i.id === id);
    if (!incident) {
      alert('Appointment not found.');
      navigate('/incidents');
      return;
    }
    setForm(incident);
    setLoading(false);
  }, [id, navigate]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const incidents = getData('incidents') || [];
    const updated = incidents.map(i => i.id === id ? { ...form, id } : i);
    upsertData('incidents', updated, true);
    navigate('/incidents');
  };

  if (loading || !form) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Edit Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <fieldset className="space-y-4">
          <legend className="text-lg font-medium text-gray-700 mb-2">Appointment Details</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Show patient dropdown only for admin */}
            {currentUser?.role === 'Admin' && (
              <div>
                <label className="block mb-1 text-gray-700">Patient</label>
                <select
                  name="patientId"
                  value={form.patientId || ''}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  required
                >
                  <option value="">Select patient</option>
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>
                      {[p.firstName, p.middleName, p.lastName].filter(Boolean).join(' ')}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div>
              <label className="block mb-1 text-gray-700">Appointment Type</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                required
              >
                <option value="">Select appointment type</option>
                {APPOINTMENT_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Appointment Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                required
              >
                <option value="">Select status</option>
                {STATUS_OPTIONS.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Date</label>
              <input
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Time</label>
              <select
                name="time"
                value={form.time}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                required
              >
                <option value="">Select time slot</option>
                {TIME_SLOTS.map(slot => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Duration (minutes)</label>
              <input
                name="duration"
                type="number"
                min="1"
                value={form.duration}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Reason for Visit</label>
              <input
                name="reason"
                placeholder="Reason for visit"
                value={form.reason}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-1 text-gray-700">Select Doctor</label>
              <select
                name="doctor"
                value={form.doctor}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                required
              >
                <option value="">Choose a doctor</option>
                {doctors.length === 0 && <option disabled>No doctors available</option>}
                {doctors.map(doc => (
                  <option key={doc.id} value={doc.name || `${doc.firstName} ${doc.lastName}`.trim()}>
                    {doc.name || `${doc.firstName} ${doc.lastName}`.trim()}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>
        <div className="flex justify-end">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditIncident;
