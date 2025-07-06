import React, { useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, Phone, FileText, Download, Eye, User, Activity, Heart, Droplets, TestTube } from 'lucide-react';

const PatientDashboard = () => {
  // KPI Cards Data
  const kpiCards = [
    {
      label: 'Blood Pressure',
      value: '110/70',
      description: '10% Higher Than Last Month',
      icon: <Heart className="w-8 h-8 text-red-500" />,
      trend: 'up',
      color: 'red'
    },
    {
      label: 'Blood Pressure',
      value: '650',
      description: '67% Less Than Last Month',
      icon: <Heart className="w-8 h-8 text-red-500" />,
      trend: 'down',
      color: 'red'
    },
    {
      label: 'Glucose Level',
      value: '88-75',
      description: '12% Higher Than Last Month',
      icon: <TestTube className="w-8 h-8 text-yellow-500" />,
      trend: 'up',
      color: 'yellow'
    },
    {
      label: 'Blood Count',
      value: '9,456/mL',
      description: '22% Less Than Last Month',
      icon: <Droplets className="w-8 h-8 text-blue-500" />,
      trend: 'down',
      color: 'blue'
    }
  ];

  // Chart Data
  const restingHeartRateData = [
    { name: 'Sun', value: 65 },
    { name: 'Mon', value: 70 },
    { name: 'Tue', value: 72 },
    { name: 'Wed', value: 68 },
    { name: 'Thu', value: 75 },
    { name: 'Fri', value: 80 },
    { name: 'Sat', value: 85 }
  ];

  const performanceHeartRateData = [
    { name: 'Sun', value: 113 },
    { name: 'Mon', value: 120 },
    { name: 'Tue', value: 135 },
    { name: 'Wed', value: 130 },
    { name: 'Thu', value: 125 },
    { name: 'Fri', value: 132 },
    { name: 'Sat', value: 118 }
  ];

  // Appointments Data
  const upcomingAppointments = [
    {
      doctor: 'Dr.Cara Stevens',
      specialty: 'Radiologist',
      date: '12 June \'20',
      time: '09:00-10:00',
      treatment: 'CT scans',
      contact: '+123 676545655',
      avatar: '👩‍⚕️'
    },
    {
      doctor: 'Dr.John Doe',
      specialty: 'Cardiologist',
      date: '13 June \'20',
      time: '11:00-12:00',
      treatment: 'heart checkup',
      contact: '+123 434456764',
      avatar: '👨‍⚕️'
    },
    {
      doctor: 'Dr.Alif Satou',
      specialty: 'Otolaryngologist',
      date: '12 June \'20',
      time: '09:15-10:15',
      treatment: 'Diseases Of The Ear',
      contact: '+123 453454573',
      avatar: '👨‍⚕️'
    }
  ];

  const pastAppointments = [
    {
      doctor: 'Dr.Angelica Ramos',
      specialty: 'Dentist',
      date: '12 June \'20',
      time: '11:00-12:00',
      treatment: 'Root Canal',
      contact: '+123 876545553',
      avatar: '👩‍⚕️'
    },
    {
      doctor: 'Dr.Jens Brincker',
      specialty: 'Endocrinologist',
      date: '23 June \'20',
      time: '04:00-05:00',
      treatment: 'Diabetes',
      contact: '+123 456789345',
      avatar: '👨‍⚕️'
    }
  ];

  // Medications Data
  const medications = [
    { name: 'Econochlor (chloramphenicol)', dosage: '1 - 0 - 1', color: 'green' },
    { name: 'Desmopressin tabs', dosage: '1 - 1 - 1', color: 'red' },
    { name: 'Abciximab-injection', dosage: '1 Daily', color: 'blue' },
    { name: 'Kevzara sarilumab', dosage: '0 - 0 - 1', color: 'orange' },
    { name: 'Gentamicin-topical', dosage: '1 - 0 - 1', color: 'purple' },
    { name: 'Paliperidone palmitate', dosage: '1 - 1 - 1', color: 'teal' },
    { name: 'Sermorelin-', dosage: '1 - 0 - 1', color: 'indigo' }
  ];

  // Reports Data
  const reports = [
    { name: 'Blood Report', type: 'pdf', color: 'red' },
    { name: 'Mediclaim Documents', type: 'doc', color: 'blue' },
    { name: 'Doctor Prescription', type: 'doc', color: 'blue' },
    { name: 'X-Ray Files', type: 'img', color: 'gray' },
    { name: 'Urine Report', type: 'pdf', color: 'red' },
    { name: 'Scanned Documents', type: 'doc', color: 'green' }
  ];

  const [activeTab, setActiveTab] = useState('upcoming');

  return (
    <div className="min-h-screen bg-gray-50 p-6 ">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-100 p-6 rounded-2xl shadow-sm mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-lg mb-2">Welcome back</p>
            <h1 className="text-3xl font-bold text-blue-900 mb-3">Cara Stevens!</h1>
            <p className="text-gray-700 max-w-2xl">
              We would like to take this opportunity to welcome you to our practice and to thank you for choosing our 
              physicians to participate in your healthcare. We look forward to providing you with personalized, 
              comprehensive health care focusing on wellness and prevention.
            </p>
          </div>
          <div className="hidden lg:block">
            <div className="text-8xl">👩‍⚕️👨‍⚕️👩‍⚕️</div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiCards.map((card, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-${card.color}-50`}>
                {card.icon}
              </div>
              <div className={`flex items-center text-sm ${card.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                <span className={`mr-1 ${card.trend === 'up' ? '↗️' : '↘️'}`}></span>
                {card.description.split(' ')[0]}
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">{card.label}</h3>
            <p className="text-xl font-bold text-gray-900 mb-2">{card.value}</p>
            <p className="text-xs text-gray-500">{card.description}</p>
          </div>
        ))}
      </div>

      {/* Charts and Medications Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Resting Heart Rate Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Resting Heart Rate</h3>
            <span className="text-sm text-gray-500">72 bmp (Average)</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={restingHeartRateData}>
              <Line type="monotone" dataKey="value" stroke="#F59E0B" strokeWidth={3} dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }} />
              <CartesianGrid stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Heart Rate Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Performance Heart Rate</h3>
            <span className="text-sm text-gray-500">129 bmp (Average)</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={performanceHeartRateData}>
              <Line type="monotone" dataKey="value" stroke="#6B7280" strokeWidth={3} dot={{ fill: '#6B7280', strokeWidth: 2, r: 4 }} />
              <CartesianGrid stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Medications */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Medications</h3>
            <button className="text-blue-600 text-sm hover:underline">View All</button>
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm font-medium text-gray-600 pb-2 border-b">
              <span>Medicine</span>
              <span>Dosage</span>
            </div>
            {medications.slice(0, 6).map((med, index) => (
              <div key={index} className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full bg-${med.color}-500 mr-2`}></div>
                  <span className="truncate">{med.name}</span>
                </div>
                <span className="text-gray-600">{med.dosage}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Appointments and Reports Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Appointments */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b">
            <div className="flex items-center space-x-8">
              <button 
                className={`pb-2 text-sm font-medium ${activeTab === 'upcoming' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('upcoming')}
              >
                Upcoming Appointment
              </button>
              <button 
                className={`pb-2 text-sm font-medium ${activeTab === 'past' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('past')}
              >
                Past Appointment
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {(activeTab === 'upcoming' ? upcomingAppointments : pastAppointments).map((appointment, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{appointment.avatar}</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{appointment.doctor}</h4>
                      <p className="text-sm text-gray-600">{appointment.specialty}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{appointment.date}</p>
                    <p className="text-sm text-gray-600">{appointment.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Treatment</p>
                    <p className="font-medium">{appointment.treatment}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Contact Number</p>
                    <p className="font-medium">{appointment.contact}</p>
                  </div>
                  <button className="p-2 text-red-500 hover:bg-red-50 rounded-full">
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reports/Documents */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Reports/Documents</h3>
            <button className="text-blue-600 text-sm hover:underline">View All</button>
          </div>
          <div className="space-y-3">
            {reports.map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded bg-${report.color}-100`}>
                    <FileText className={`w-4 h-4 text-${report.color}-600`} />
                  </div>
                  <span className="text-sm font-medium">{report.name}</span>
                </div>
                <div className="flex space-x-2">
                  <button className="p-1 text-gray-500 hover:text-gray-700">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-500 hover:text-gray-700">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;