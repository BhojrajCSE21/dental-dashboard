import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { getData } from '../../utils/localStorageUtils';

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [selectedIncidents, setSelectedIncidents] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const updateEvents = () => {
      const incidents = getData('incidents') || [];
      const mapped = incidents
        .filter(inc => inc.appointmentDate)
        .map((inc) => ({
          id: inc.id,
          title: inc.title || inc.reason || 'Appointment',
          start: new Date(inc.appointmentDate),
          end: new Date(inc.appointmentDate),
          allDay: false,
          ...inc
        }));
      setEvents(mapped);
    };
    updateEvents();
    window.addEventListener('storage', updateEvents);
    return () => window.removeEventListener('storage', updateEvents);
  }, []);

  // Handler for clicking a day
  const handleSelectSlot = ({ start }) => {
    
    const dayIncidents = events.filter(ev =>
      moment(ev.start).isSame(start, 'day')
    );
    setSelectedIncidents(dayIncidents);
    setShowModal(true);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-blue-800 mb-4">Calendar View</h1>
      <div className="bg-white shadow rounded-xl p-4">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          popup
          selectable
          onSelectSlot={handleSelectSlot}
        />
      </div>
      {/* Simple Modal for Day's Appointments with the paient */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg min-w-[300px]">
            <h2 className="text-lg font-bold mb-2">Appointments for Selected Day</h2>
            {selectedIncidents.length === 0 ? (
              <p>No appointments.</p>
            ) : (
              <ul>
                {selectedIncidents.map(inc => (
                  <li key={inc.id} className="mb-2">
                    <strong>{inc.title}</strong> <br />
                    {moment(inc.start).format('hh:mm A')} - {inc.doctor}
                  </li>
                ))}
              </ul>
            )}
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;
