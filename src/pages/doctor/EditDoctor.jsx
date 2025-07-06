import { useEffect, useState } from 'react';
import { getData, upsertData } from '../../utils/localStorageUtils';
import { useNavigate, useLocation } from 'react-router-dom';

const SPECIALTIES = [
  'Cardiology',
  'Dermatology',
  'Neurology',
  'Orthopedics',
  'Pediatrics',
  'Psychiatry',
  'General Medicine'
];

const EditDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState(null);
  const [photoError, setPhotoError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    const data = getData('doctors') || [];
    setDoctors(data);
    if (id) {
      const doctor = data.find(d => d.id === id);
      setForm(doctor ? { ...doctor } : null);
    }
  }, [location.search]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = e => {
    const file = e.target.files[0];
    if (file) {
      if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
        setPhotoError('Only JPG, PNG, or GIF files are allowed.');
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setPhotoError('File size must be less than 2MB.');
        return;
      }
      setPhotoError('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form) return;
    // Save as array, not single object
    const updatedDoctors = doctors.map(d => (d.id === form.id ? { ...form } : d));
    localStorage.setItem('doctors', JSON.stringify(updatedDoctors));
    navigate('/doctors');
  };

  if (!form) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Edit Doctor</h2>
        <p className="text-red-500">Doctor not found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Edit Doctor</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <fieldset className="space-y-4 border rounded p-4">
          <legend className="text-lg font-medium text-gray-700 mb-2">Personal Information</legend>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 text-gray-700">First Name</label>
              <input name="firstName" placeholder="Enter first name" value={form.firstName} onChange={handleChange} className="border p-2 rounded w-full" required />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Last Name</label>
              <input name="lastName" placeholder="Enter last name" value={form.lastName} onChange={handleChange} className="border p-2 rounded w-full" required />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Date of Birth</label>
              <input name="dob" type="date" value={form.dob} onChange={handleChange} className="border p-2 rounded w-full" required />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Gender</label>
              <select name="gender" value={form.gender} onChange={handleChange} className="border p-2 rounded w-full" required>
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Specialization</label>
              <select name="specialty" value={form.specialty} onChange={handleChange} className="border p-2 rounded w-full" required>
                <option value="">Select specialization</option>
                {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Year of Experience</label>
              <input name="experience" type="number" min="0" placeholder="Enter years of experience" value={form.experience} onChange={handleChange} className="border p-2 rounded w-full" required />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-1 text-gray-700">Address</label>
              <input name="address" placeholder="Enter address" value={form.address} onChange={handleChange} className="border p-2 rounded w-full" />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">City</label>
              <input name="city" placeholder="Enter city" value={form.city} onChange={handleChange} className="border p-2 rounded w-full" />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">State</label>
              <input name="state" placeholder="Enter state" value={form.state} onChange={handleChange} className="border p-2 rounded w-full" />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Zip Code</label>
              <input name="zipCode" placeholder="Enter zip code" value={form.zipCode} onChange={handleChange} className="border p-2 rounded w-full" />
            </div>
          </div>
        </fieldset>
        <fieldset className="space-y-4 border rounded p-4">
          <legend className="text-lg font-medium text-gray-700 mb-2">Contact Information</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-gray-700">Email</label>
              <input name="email" type="email" placeholder="Enter email address" value={form.email} onChange={handleChange} className="border p-2 rounded w-full" required />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Phone Number</label>
              <input name="phone" placeholder="Enter phone number" value={form.phone} onChange={handleChange} className="border p-2 rounded w-full" required />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Emergency Contact Name</label>
              <input name="emergencyContactName" placeholder="Enter emergency contact name" value={form.emergencyContactName} onChange={handleChange} className="border p-2 rounded w-full" />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Emergency Contact Phone</label>
              <input name="emergencyContactPhone" placeholder="Enter emergency contact phone" value={form.emergencyContactPhone} onChange={handleChange} className="border p-2 rounded w-full" />
            </div>
          </div>
        </fieldset>
        <fieldset className="space-y-4 border rounded p-4">
          <legend className="text-lg font-medium text-gray-700 mb-2">Profile Photo</legend>
          <div>
            <label className="block mb-1 text-gray-700">Upload Photo</label>
            <input type="file" accept="image/jpeg,image/png,image/gif" onChange={handlePhotoChange} className="border p-2 rounded w-full" />
            {photoError && <p className="text-red-500 text-sm mt-1">{photoError}</p>}
            {form.photo && (
              <img src={form.photo} alt="Preview" className="mt-2 h-24 w-24 object-cover rounded border" />
            )}
            <p className="text-xs text-gray-500 mt-1">JPG, PNG or GIF. Max 2MB.</p>
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

export default EditDoctor;
