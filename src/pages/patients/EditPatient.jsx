import { useEffect, useState } from 'react';
import { getData, upsertData } from '../../utils/localStorageUtils';
import { useNavigate, useLocation } from 'react-router-dom';

const EditPatient = () => {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Get patient id from query param
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    const data = getData('patients') || [];
    setPatients(data);
    if (id) {
      const patient = data.find(p => p.id === id);
      setForm(patient ? { ...patient } : null);
    }
  }, [location.search]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = e => {
    const file = e.target.files[0];
    if (file) {
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
    const updatedPatients = patients.map(p => (p.id === form.id ? form : p));
    upsertData('patients', updatedPatients, true); // overwrite array
    navigate('/patients');
  };

  if (!form) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Edit Patient</h2>
        <p className="text-red-500">Patient not found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Edit Patient</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <fieldset className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <legend className="col-span-full text-lg font-medium text-gray-700">Personal Information</legend>
          <div>
            <label className="block mb-1 text-gray-700">First Name</label>
            <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} className="border p-2 rounded w-full" required />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Middle Name (Optional)</label>
            <input name="middleName" placeholder="Middle Name" value={form.middleName} onChange={handleChange} className="border p-2 rounded w-full" />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Last Name</label>
            <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} className="border p-2 rounded w-full" required />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Date of Birth</label>
            <input name="dob" type="date" value={form.dob} onChange={handleChange} className="border p-2 rounded w-full" required />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Gender</label>
            <select name="gender" value={form.gender} onChange={handleChange} className="border p-2 rounded w-full" required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Age</label>
            <input
              name="age"
              type="number"
              min="0"
              placeholder="Age"
              value={form.age || ''}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div className="flex flex-col col-span-full">
            <label className="mb-1 text-gray-700 font-medium">Photo (optional)</label>
            <label
              htmlFor="photo-upload"
              className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded cursor-pointer p-4 hover:border-blue-400 transition"
              style={{ width: "120px", height: "120px" }}
            >
              {form.photo ? (
                <img
                  src={form.photo}
                  alt="Preview"
                  className="h-24 w-24 object-cover rounded"
                />
              ) : (
                <span className="text-gray-400 text-sm">Add Image</span>
              )}
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </label>
          </div>
          <div className="col-span-full">
            <label className="block mb-1 text-gray-700">Address</label>
            <input name="address" placeholder="Address" value={form.address} onChange={handleChange} className="border p-2 rounded w-full" />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">City</label>
            <input name="city" placeholder="City" value={form.city} onChange={handleChange} className="border p-2 rounded w-full" />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">State</label>
            <input name="state" placeholder="State" value={form.state} onChange={handleChange} className="border p-2 rounded w-full" />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Zip Code</label>
            <input name="zipCode" placeholder="Zip Code" value={form.zipCode} onChange={handleChange} className="border p-2 rounded w-full" />
          </div>
        </fieldset>
        <fieldset className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <legend className="col-span-full text-lg font-medium text-gray-700">Contact Information</legend>
          <div>
            <label className="block mb-1 text-gray-700">Email Address</label>
            <input name="email" placeholder="Email Address" value={form.email} onChange={handleChange} className="border p-2 rounded w-full" />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Phone Number</label>
            <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} className="border p-2 rounded w-full" />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Alternative Phone (Optional)</label>
            <input name="altPhone" placeholder="Alternative Phone (Optional)" value={form.altPhone} onChange={handleChange} className="border p-2 rounded w-full" />
          </div>
        </fieldset>
        <fieldset className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <legend className="col-span-full text-lg font-medium text-gray-700">Medical Information</legend>
          <div>
            <label className="block mb-1 text-gray-700">Blood Type</label>
            <select name="bloodType" value={form.bloodType} onChange={handleChange} className="border p-2 rounded w-full">
              <option value="">Select Blood Type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Height (cm)</label>
            <input name="height" placeholder="Height (cm)" value={form.height} onChange={handleChange} className="border p-2 rounded w-full" />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Weight (kg)</label>
            <input name="weight" placeholder="Weight (kg)" value={form.weight} onChange={handleChange} className="border p-2 rounded w-full" />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Condition</label>
            <input name="allergies" placeholder="Condition" value={form.allergies} onChange={handleChange} className="border p-2 rounded w-full" />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Health Info</label>
            <input name="healthInfo" placeholder="Health Info" value={form.healthInfo || ''} onChange={handleChange} className="border p-2 rounded w-full" />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Doctor</label>
            <input name="doctor" placeholder="Doctor" value={form.doctor} onChange={handleChange} className="border p-2 rounded w-full" />
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

export default EditPatient;