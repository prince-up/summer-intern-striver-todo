'use client';

import React, { useState, useEffect } from 'react';

const InteractiveCalendar: React.FC = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [currentDate, setCurrentDate] = useState<Date>(new Date(2022, 0, 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [notes, setNotes] = useState<string>('');
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Mouse Move Handler for 3D Tilt
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX - innerWidth / 2) / 50;
    const y = (clientY - innerHeight / 2) / 50;
    setTilt({ x: -y, y: x });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const storageKey = `calendar-${currentDate.getFullYear()}-${currentDate.getMonth()}`;

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
    return day === 0 ? 6 : day - 1;
  }

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);

  const calendarDays: Array<{ date: Date; day: number; isCurrentMonth: boolean }> = [];
  const prevMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
  const prevMonthDays = prevMonthDate.getDate();
  for (let i = firstDay; i > 0; i--) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, prevMonthDays - i + 1);
    calendarDays.push({ date, day: date.getDate(), isCurrentMonth: false });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
    calendarDays.push({ date: monthDate, day: i, isCurrentMonth: true });
  }
  const remaining = 42 - calendarDays.length;
  for (let i = 1; i <= remaining; i++) {
    const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i);
    calendarDays.push({ date: nextMonthDate, day: i, isCurrentMonth: false });
  }

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        width: '100vw', 
        height: '100vh', 
        backgroundColor: '#e5e7eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontFamily: 'sans-serif',
        perspective: '1000px'
      }}
    >
      <style>{`
        @keyframes sway {
          0% { transform: rotate(-0.5deg); }
          50% { transform: rotate(0.5deg); }
          100% { transform: rotate(-0.5deg); }
        }
        @keyframes snowfall {
          0% { transform: translateY(-10px) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(300px) translateX(20px); opacity: 0; }
        }
        .snow-particle {
          position: absolute;
          background: white;
          border-radius: 50%;
          pointer-events: none;
          z-index: 5;
          filter: blur(1px);
          animation: snowfall linear infinite;
        }
      `}</style>

      <div style={{ 
        position: 'relative',
        height: '95vh',
        aspectRatio: '1 / 1',
        backgroundImage: 'url("/striverimage.png")',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        transition: 'transform 0.1s ease-out',
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        animation: tilt.x === 0 ? 'sway 4s ease-in-out infinite' : 'none'
      }}>
        
        <div style={{ position: 'absolute', top: '25%', left: '26.8%', width: '46.4%', height: '22%', overflow: 'hidden', pointerEvents: 'none' }}>
           {[...Array(20)].map((_, i) => (
             <div 
               key={i} 
               className="snow-particle"
               style={{
                 left: `${Math.random() * 100}%`,
                 width: `${Math.random() * 4 + 2}px`,
                 height: `${Math.random() * 4 + 2}px`,
                 animationDuration: `${Math.random() * 3 + 2}s`,
                 animationDelay: `${Math.random() * 5}s`,
                 opacity: Math.random()
               }}
             />
           ))}
        </div>

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

        <div style={{
          position: 'absolute',
          top: '59.1%',
          right: '28.3%',
          width: '24.9%',
          height: '16.8%',
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gridTemplateRows: 'repeat(6, 1fr)',
          columnGap: 'min(0.2vw, 2px)',
          rowGap: 'min(0.1vw, 2px)',
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
                  fontSize: 'min(1.1vw, 13px)',
                  fontWeight: '700',
                  cursor: 'pointer',
                  color: isSelected ? 'white' : 'transparent',
                  backgroundColor: isSelected ? '#29abe2' : 'transparent',
                  borderRadius: '1px',
                  transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                  userSelect: 'none',
                  position: 'relative',
                  boxShadow: isSelected ? '0 4px 10px rgba(41, 171, 226, 0.4)' : 'none'
                }}
              >
                {isSelected ? dateObj.day : ''}
                {!isSelected && (
                  <div 
                    title={dateObj.date.toDateString()}
                    style={{ position: 'absolute', inset: 0, backgroundColor: 'transparent' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(41, 171, 226, 0.15)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  />
                )}
              </div>
            );
          })}
        </div>

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
            style={{ padding: '8px', fontSize: '14px', cursor: 'pointer', opacity: 0.3, border: 'none', background: 'transparent', transition: 'opacity 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '0.3'}
          >
            ←
          </button>
          <button 
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
            style={{ padding: '8px', fontSize: '14px', cursor: 'pointer', opacity: 0.3, border: 'none', background: 'transparent', transition: 'opacity 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '0.3'}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default InteractiveCalendar;
