import React, { useState } from 'react';

const CalendarWidget = ({ 
  availableDates = [], 
  unavailableDates = [],
  onDateSelect,
  selectedDate = null,
  maxQuantity = 1
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevMonth = new Date(year, month - 1, 0);
      const dayNum = prevMonth.getDate() - startingDayOfWeek + i + 1;
      days.push({
        date: new Date(year, month - 1, dayNum),
        isCurrentMonth: false,
        dayNumber: dayNum
      });
    }

    // Add days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        date: new Date(year, month, day),
        isCurrentMonth: true,
        dayNumber: day
      });
    }

    // Add empty cells for days after the last day of the month
    const remainingCells = 42 - days.length; // 6 rows × 7 days = 42 cells
    for (let day = 1; day <= remainingCells; day++) {
      days.push({
        date: new Date(year, month + 1, day),
        isCurrentMonth: false,
        dayNumber: day
      });
    }

    return days;
  };

  const formatDateKey = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const isDateAvailable = (date) => {
    const dateKey = formatDateKey(date);
    return availableDates.includes(dateKey);
  };

  const isDateUnavailable = (date) => {
    const dateKey = formatDateKey(date);
    return unavailableDates.includes(dateKey);
  };

  const isDateSelected = (date) => {
    return selectedDate && formatDateKey(date) === formatDateKey(new Date(selectedDate));
  };

  const handleDateClick = (day) => {
    if (!day.isCurrentMonth) return;
    
    const dateKey = formatDateKey(day.date);
    
    if (isDateUnavailable(day.date)) {
      return; // Don't allow selection of unavailable dates
    }
    
    if (onDateSelect) {
      onDateSelect(dateKey, selectedQuantity);
    }
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const adjustQuantity = (change) => {
    setSelectedQuantity(prev => Math.max(1, Math.min(maxQuantity, prev + change)));
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="calendar-widget">
      {/* Calendar Header */}
      <div className="calendar-header">
        <button
          className="calendar-nav-btn"
          onClick={goToPreviousMonth}
          aria-label="Previous month"
        >
          ◀
        </button>
        <div className="calendar-month">
          {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </div>
        <button
          className="calendar-nav-btn"
          onClick={goToNextMonth}
          aria-label="Next month"
        >
          ▶
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="calendar-grid">
        {/* Day headers */}
        {daysOfWeek.map(day => (
          <div key={day} className="calendar-day-header">
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {days.map((day, index) => {
          const isAvailable = isDateAvailable(day.date);
          const isUnavailable = isDateUnavailable(day.date);
          const isSelected = isDateSelected(day.date);
          
          let dayClasses = 'calendar-day';
          
          if (!day.isCurrentMonth) {
            dayClasses += ' other-month';
          } else if (isSelected) {
            dayClasses += ' selected';
          } else if (isUnavailable) {
            dayClasses += ' unavailable';
          } else if (isAvailable) {
            dayClasses += ' available';
          }

          return (
            <button
              key={index}
              className={dayClasses}
              onClick={() => handleDateClick(day)}
              disabled={!day.isCurrentMonth || isUnavailable}
              title={
                isUnavailable 
                  ? 'Not available' 
                  : isAvailable 
                    ? 'Available for rental' 
                    : 'Select date'
              }
            >
              {day.dayNumber}
            </button>
          );
        })}
      </div>

      {/* Quantity Selector */}
      {maxQuantity > 1 && (
        <div className="quantity-selector">
          <span className="quantity-label">Quantity:</span>
          <div className="quantity-controls">
            <button
              className="quantity-btn"
              onClick={() => adjustQuantity(-1)}
              disabled={selectedQuantity <= 1}
            >
              -
            </button>
            <input
              type="number"
              className="quantity-input"
              value={selectedQuantity}
              min="1"
              max={maxQuantity}
              onChange={(e) => setSelectedQuantity(Math.max(1, Math.min(maxQuantity, parseInt(e.target.value) || 1)))}
            />
            <button
              className="quantity-btn"
              onClick={() => adjustQuantity(1)}
              disabled={selectedQuantity >= maxQuantity}
            >
              +
            </button>
          </div>
        </div>
      )}

      {/* Legend */}
      <div style={{ marginTop: 'var(--space-lg)', fontSize: '0.85rem', color: '#666' }}>
        <div style={{ display: 'flex', gap: 'var(--space-lg)', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
            <div style={{ width: '12px', height: '12px', background: 'var(--gold-light)', borderRadius: '2px' }}></div>
            Available
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
            <div style={{ width: '12px', height: '12px', background: 'var(--soft-black)', borderRadius: '2px' }}></div>
            Unavailable
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
            <div style={{ width: '12px', height: '12px', background: 'var(--gold-primary)', borderRadius: '2px' }}></div>
            Selected
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarWidget;