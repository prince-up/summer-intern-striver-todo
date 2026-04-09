'use client';

import React, { useState, useEffect } from 'react';

const InteractiveCalendar: React.FC = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Set to January 2022 to match the background image
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2022, 0, 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [notes, setNotes] = useState<string>('');

  // Key for storage based on month/year
  const storageKey = `calendar-${currentDate.getFullYear()}-${currentDate.getMonth()}`;

  // Load data from localStorage on mount and month change
  useEffect(() => {
    const savedData = localStorage.getItem(storageKey);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setNotes(parsedData.notes || '');
      if (parsedData.selectedDate) {
        setSelectedDate(new Date(parsedData.selectedDate));
      } else {
        setSelectedDate(null);
      }
    } else {
      setNotes('');
      setSelectedDate(null);
    }
  }, [currentDate, storageKey]);

  // Save data to localStorage whenever notes or selectedDate change
  useEffect(() => {
    const dataToSave = {
      notes,
      selectedDate: selectedDate ? selectedDate.toISOString() : null
    };
    localStorage.setItem(storageKey, JSON.stringify(dataToSave));
  }, [notes, selectedDate, storageKey]);

  function getDaysInMonth(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  function getFirstDayOfMonth(date: Date): number {
    const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return day === 0 ? 6 : day - 1; // Monday start
  }

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);

  const calendarDays: Array<{ date: Date; day: number; isCurrentMonth: boolean }> = [];
  
  // Previous month padding
  const prevMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
  const prevMonthDays = prevMonthDate.getDate();
  for (let i = firstDay; i > 0; i--) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, prevMonthDays - i + 1);
    calendarDays.push({ date, day: date.getDate(), isCurrentMonth: false });
  }

  // Current month
  for (let i = 1; i <= daysInMonth; i++) {
    const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
    calendarDays.push({ date: monthDate, day: i, isCurrentMonth: true });
  }

  // Next month padding
  const remaining = 42 - calendarDays.length;
  for (let i = 1; i <= remaining; i++) {
    const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i);
    calendarDays.push({ date: nextMonthDate, day: i, isCurrentMonth: false });
  }

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      backgroundColor: '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      fontFamily: 'sans-serif'
    }}>
      {/* Root Container that matches image aspect ratio */}
      <div style={{ 
        position: 'relative',
        height: '95vh',
        aspectRatio: '1 / 1',
        backgroundImage: 'url("/striverimage.png")',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
      }}>
        
        {/* INTERACTIVE LAYER: NOTES AREA */}
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Type notes here..."
          style={{
            position: 'absolute',
            top: '57.5%',
            left: '28.8%',
            width: '14.5%',
            height: '15%',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            resize: 'none',
            fontSize: 'min(0.9vw, 11px)',
            lineHeight: 'min(1.6vw, 20px)',
            color: '#333',
            zIndex: 10,
            padding: '2px'
          }}
        />

        {/* INTERACTIVE LAYER: CALENDAR GRID */}
        <div style={{
          position: 'absolute',
          top: '59.8%',
          right: '28.5%',
          width: '24.8%',
          height: '16.5%',
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gridTemplateRows: 'repeat(6, 1fr)',
          columnGap: 'min(0.2vw, 2px)',
          rowGap: 'min(0.1vw, 1px)',
          zIndex: 10
        }}>
          {calendarDays.map((dateObj, i) => {
            const isSelected = selectedDate && selectedDate.getTime() === dateObj.date.getTime();

            return (
              <div
                key={i}
                onClick={() => setSelectedDate(dateObj.date)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'min(1.0vw, 12px)',
                  fontWeight: '700',
                  cursor: 'pointer',
                  color: isSelected ? 'white' : 'transparent', // Transparent to let image numbers show, unless selected
                  backgroundColor: isSelected ? '#29abe2' : 'transparent',
                  borderRadius: '2px',
                  transition: 'background 0.2s',
                  userSelect: 'none',
                  // Using a slight overlay for hover effect
                  position: 'relative'
                }}
              >
                {/* We only show the number if it's selected to override the image number with a highlighted version */}
                {isSelected ? dateObj.day : ''}
                
                {/* Invisible hover area always active */}
                {!isSelected && (
                  <div 
                    title={dateObj.date.toDateString()}
                    style={{ 
                      position: 'absolute', 
                      inset: 0, 
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(41, 171, 226, 0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* NAVIGATION CONTROLS - Positioned near the month text or bottom */}
        <div style={{
          position: 'absolute',
          top: '41%',
          right: '30.5%',
          display: 'flex',
          gap: '10px',
          zIndex: 20
        }}>
          <button 
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
            style={{ padding: '4px 8px', fontSize: '10px', cursor: 'pointer', opacity: 0.5, border: 'none', background: 'transparent' }}
          >
            ←
          </button>
          <button 
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
            style={{ padding: '4px 8px', fontSize: '10px', cursor: 'pointer', opacity: 0.5, border: 'none', background: 'transparent' }}
          >
            →
          </button>
        </div>

        {/* DATE INDICATOR HOVER AREA (Informational) */}
        {selectedDate && (
          <div style={{
            position: 'absolute',
            bottom: '18%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(255,255,255,0.9)',
            padding: '5px 15px',
            borderRadius: '20px',
            fontSize: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            zIndex: 20
          }}>
            Selected: {selectedDate.toDateString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveCalendar;
