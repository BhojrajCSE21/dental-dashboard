// File: src/pages/calendar/CalendarView.jsx
import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { getData } from '../../utils/localStorageUtils';

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const incidents = getData('incidents') || [];
    const mapped = incidents.map((inc) => ({
      id: inc.id,
      title: inc.title,
      start: new Date(inc.appointmentDate),
      end: new Date(inc.appointmentDate), // Assuming 1-hour slot
      allDay: false,
    }));
    setEvents(mapped);
  }, []);

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
        />
      </div>
    </div>
  );
};

export default CalendarView;
