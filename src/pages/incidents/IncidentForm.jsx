import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getData, saveData, upsertData } from '../../utils/localStorageUtils';

const IncidentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [form, setForm] = useState({
    title: '',
    description: '',
    comments: '',
    appointmentDate: '',
    cost: '',
    treatment: '',
    status: '',
    nextDate: '',
    files: [],
    patientId: ''
  });

  useEffect(() => {
    if (isEdit) {
      const inc = getData('incidents').find(i => i.id === id);
      if (inc) setForm(inc);
    }
  }, [id, isEdit]);

  const handleFileUpload = async (e) => {
  const files = Array.from(e.target.files);

  const MAX_FILE_SIZE_MB = 0.2; // 200 KB per file
  const MAX_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

  const fileData = await Promise.all(
    files.map(file => {
      return new Promise((resolve) => {
        if (file.size > MAX_SIZE_BYTES) {
          alert(`❌ "${file.name}" exceeds ${MAX_FILE_SIZE_MB}MB and was skipped.`);
          return resolve(null);
        }

        const reader = new FileReader();
        reader.onload = () => {
          resolve({ name: file.name, url: reader.result });
        };
        reader.readAsDataURL(file); // Convert to base64
      });
    })
  );

  const validFiles = fileData.filter(f => f !== null);
  setForm(prev => ({ ...prev, files: [...prev.files, ...validFiles] }));
};


  const handleSubmit = (e) => {
    e.preventDefault();
    const newIncident = isEdit ? form : { ...form, id: Date.now().toString() };
    upsertData('incidents', newIncident);
    navigate('/incidents');
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">{isEdit ? 'Edit' : 'Add'} Incident</h1>
      <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded space-y-3">
        <input type="text" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full border p-2 rounded" required />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full border p-2 rounded" required />
        <input type="text" placeholder="Comments" value={form.comments} onChange={(e) => setForm({ ...form, comments: e.target.value })} className="w-full border p-2 rounded" />
        <input type="datetime-local" value={form.appointmentDate} onChange={(e) => setForm({ ...form, appointmentDate: e.target.value })} className="w-full border p-2 rounded" required />
        <input type="text" placeholder="Cost" value={form.cost} onChange={(e) => setForm({ ...form, cost: e.target.value })} className="w-full border p-2 rounded" />
        <input type="text" placeholder="Treatment" value={form.treatment} onChange={(e) => setForm({ ...form, treatment: e.target.value })} className="w-full border p-2 rounded" />
        <input type="text" placeholder="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full border p-2 rounded" />
        <input type="date" placeholder="Next Appointment" value={form.nextDate} onChange={(e) => setForm({ ...form, nextDate: e.target.value })} className="w-full border p-2 rounded" />
        <input type="file" multiple onChange={handleFileUpload} className="w-full border p-2 rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {isEdit ? 'Update' : 'Save'}
        </button>
      </form>
    </div>
  );
};

export default IncidentForm;