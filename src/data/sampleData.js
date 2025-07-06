export const sampleUsers = [
  { id: '1', role: 'Admin', email: 'admin@entnt.in', password: 'admin123' },
  { id: '2', role: 'Patient', email: 'john@entnt.in', password: 'patient123', patientId: 'p1' }
];

export const samplePatients = [
  {
    id: 'p1',
    name: 'John Doe',
    dob: '1990-05-10',
    contact: '1234567890',
    healthInfo: 'No allergies'
  }
];

export const sampleIncidents = [
  {
    id: 'i1',
    patientId: 'p1',
    title: 'Toothache',
    description: 'Upper molar pain', 
    comments: 'Sensitive to cold',
    appointmentDate: '2025-07-01T10:00:00',
    cost: 80,
    treatment: 'Root canal',
    status: 'Completed',
    nextDate: '',
    files: [
      { name: 'invoice.pdf', url: 'data:application/pdf;base64,...' },
      { name: 'xray.png', url: 'data:image/png;base64,...' }
    ]
  }
];
