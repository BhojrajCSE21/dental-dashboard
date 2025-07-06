import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getData, setData, updateData } from '../../utils/localStorageUtils';

const PatientForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [form, setForm] = useState({ name: '', dob: '', contact: '', healthInfo: '' });

  useEffect(() => {
    if (isEdit) {
      const patient = getData('patients').find(p => p.id === id);
      if (patient) setForm(patient);
    }
  }, [id, isEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) updateData('patients', form);
    else setData('patients', { ...form, id: Date.now().toString() });
    navigate('/patients');
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">{isEdit ? 'Edit' : 'Add'} Patient</h1>
      <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded">
        <input type="text" placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border p-2 mb-3" required />
        <input type="date" placeholder="DOB" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} className="w-full border p-2 mb-3" required />
        <input type="text" placeholder="Contact" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} className="w-full border p-2 mb-3" required />
        <textarea placeholder="Health Info" value={form.healthInfo} onChange={(e) => setForm({ ...form, healthInfo: e.target.value })} className="w-full border p-2 mb-3" required />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">{isEdit ? 'Update' : 'Save'}</button>
      </form>
    </div>
  );
};

export default PatientForm;
