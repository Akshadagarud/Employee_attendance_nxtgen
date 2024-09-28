import React, { useState, useCallback } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './leave_calendar.css';

const localizer = momentLocalizer(moment);

const CustomToolbar = ({ date, onNavigate, onView, view }) => {
  const [currentDate, setCurrentDate] = useState(date);

  const goToToday = () => {
    onNavigate('TODAY');
    setCurrentDate(new Date());
  };

  const goToPrev = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    onNavigate('PREV');
    setCurrentDate(newDate);
  };

  const goToNext = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    onNavigate('NEXT');
    setCurrentDate(newDate);
  };

  const handleMonthChange = (e) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(parseInt(e.target.value));
    onNavigate('DATE', newDate);
    setCurrentDate(newDate);
  };

  const handleYearChange = (e) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(parseInt(e.target.value));
    onNavigate('DATE', newDate);
    setCurrentDate(newDate);
  };

  const months = moment.months();
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 101 }, (_, i) => currentYear - 50 + i);

  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button type="button" onClick={goToToday}>Today</button>
        <button type="button" onClick={goToPrev}>Back</button>
        <button type="button" onClick={goToNext}>Next</button>
      </span>
      <span className="rbc-toolbar-label">
        {/* This span can be used for a title or left empty */}
      </span>
      <span className="rbc-toolbar-select-group">
        <select value={currentDate.getMonth()} onChange={handleMonthChange}>
          {months.map((month, index) => (
            <option key={month} value={index}>{month}</option>
          ))}
        </select>
        <select value={currentDate.getFullYear()} onChange={handleYearChange}>
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </span>
    </div>
  );
};

const LeaveModal = ({ event, onClose }) => {
  if (!event) return null;

  return (
    <div className="leave-modal-overlay" onClick={onClose}>
      <div className="leave-modal" onClick={e => e.stopPropagation()}>
        <h3>{event.title}</h3>
        <p><strong>Date:</strong> {moment(event.start).format('MMMM D, YYYY')}</p>
        <p><strong>Employees on Leave:</strong> {event.employeesOnLeave}</p>
        <ul>
          {event.employees.map((emp, index) => (
            <li key={index}>
              <strong>{emp.name}</strong> - {emp.reason}
            </li>
          ))}
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const CustomEvent = ({ event }) => (
  <div 
    className={`custom-event ${event.employeesOnLeave > 3 ? 'high-leave-count' : ''}`}
    data-tooltip={`${event.employeesOnLeave} on leave`}
  >
    <span className="event-count">{event.employeesOnLeave}</span>
  </div>
);

const leave_calendar = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Static data for employee leaves in September
  const leaveData = [
    { start: new Date(2024, 8, 1), end: new Date(2024, 8, 5), employee: "John Doe", reason: "Vacation" },
    { start: new Date(2024, 8, 3), end: new Date(2024, 8, 3), employee: "Jane Smith", reason: "Sick Leave" },
    { start: new Date(2024, 8, 5), end: new Date(2024, 8, 7), employee: "Mike Johnson", reason: "Personal Leave" },
    { start: new Date(2024, 8, 10), end: new Date(2024, 8, 14), employee: "Emily Brown", reason: "Work from Home" },
    { start: new Date(2024, 8, 15), end: new Date(2024, 8, 15), employee: "David Wilson", reason: "Doctor's Appointment" },
    { start: new Date(2024, 8, 18), end: new Date(2024, 8, 22), employee: "Sarah Davis", reason: "Conference" },
    { start: new Date(2024, 8, 20), end: new Date(2024, 8, 20), employee: "Tom Harris", reason: "Family Emergency" },
    { start: new Date(2024, 8, 25), end: new Date(2024, 8, 29), employee: "Lisa Martinez", reason: "Training" },
    { start: new Date(2024, 8, 28), end: new Date(2024, 8, 28), employee: "Robert Taylor", reason: "Jury Duty" },
  ];

  const events = useCallback(() => {
    const eventMap = {};
    leaveData.forEach(leave => {
      const start = moment(leave.start);
      const end = moment(leave.end);
      const duration = moment.duration(end.diff(start));
      const days = duration.asDays() + 1;

      for (let i = 0; i < days; i++) {
        const date = moment(start).add(i, 'days').format('YYYY-MM-DD');
        if (!eventMap[date]) {
          eventMap[date] = {
            start: new Date(date),
            end: new Date(date),
            title: "Employees on Leave",
            employeesOnLeave: 0,
            employees: []
          };
        }
        eventMap[date].employeesOnLeave++;
        eventMap[date].employees.push({ name: leave.employee, reason: leave.reason });
      }
    });
    return Object.values(eventMap);
  }, [leaveData]);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div className="leave-calendar-container">
      <h2>Leave Calendar</h2>
      <Calendar
        localizer={localizer}
        events={events()}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        components={{
          toolbar: CustomToolbar,
          event: CustomEvent
        }}
        views={[Views.MONTH]}
        defaultView={Views.MONTH}
        onSelectEvent={handleSelectEvent}
        defaultDate={new Date(2024, 8, 1)}
      />
      {selectedEvent && (
        <LeaveModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  );
};

export default leave_calendar;