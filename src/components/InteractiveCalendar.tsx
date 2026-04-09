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
    const x = (clientX - innerWidth / 2) / 60; // Less aggressive tilt
    const y = (clientY - innerHeight / 2) / 60;
    setTilt({ x: -y, y: x });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const storageKey = `calendar-v2-${currentDate.getFullYear()}-${currentDate.getMonth()}`;

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
      // Don't reset selectedDate if it's from another month, just let it exist in state
    }
  }, [currentDate, storageKey]);

  useEffect(() => {
    if (notes || selectedDate) {
      const dataToSave = {
        notes,
        selectedDate: selectedDate ? selectedDate.toISOString() : null
      };
      localStorage.setItem(storageKey, JSON.stringify(dataToSave));
    }
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

  const monthQuotes: {[key: number]: string} = {
    0: "New year, new peaks to conquer.",
    1: "Persistence is the steep path to success.",
    2: "Every small step brings you closer to the top.",
    3: "Focus on the climb, not the obstacles.",
    4: "Growth happens outside your comfort zone.",
    5: "Reach for the clouds with both hands.",
    6: "The view is better from the summit.",
    7: "Great things take time and a lot of grit.",
    8: "Never look down, only look forward.",
    9: "Strength grows in the thin air of challenge.",
    10: "Climb until you're proud of the progress.",
    11: "Finish the year at your highest point yet."
  };

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
        fontFamily: 'system-ui, -apple-system, sans-serif',
        perspective: '1200px'
      }}
    >
      <style>{`
        @keyframes sway {
          0% { transform: rotate(-0.4deg); }
          50% { transform: rotate(0.4deg); }
          100% { transform: rotate(-0.4deg); }
        }
        @keyframes snowfall {
          0% { transform: translateY(-10px) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(300px) translateX(20px); opacity: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
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
        animation: Math.abs(tilt.x) < 0.1 ? 'sway 5s ease-in-out infinite' : 'none'
      }}>
        
        {/* Dynamic Quote Overlay */}
        <div key={currentDate.getMonth()} style={{
          position: 'absolute',
          top: '30%',
          left: '28%',
          width: '30%',
          color: 'rgba(255,255,255,0.85)',
          fontSize: 'min(1.2vw, 13px)',
          fontStyle: 'italic',
          fontWeight: '500',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)',
          zIndex: 6,
          animation: 'fadeIn 0.8s ease-out',
          pointerEvents: 'none'
        }}>
          "{monthQuotes[currentDate.getMonth()]}"
        </div>

        {/* Mouse Glow Light on Mountain */}
        <div style={{
          position: 'absolute',
          top: '25%',
          left: '26.8%',
          width: '46.4%',
          height: '22%',
          background: `radial-gradient(circle at ${(tilt.y * 5) + 50}% ${(tilt.x * -5) + 50}%, rgba(255,255,255,0.15) 0%, transparent 40%)`,
          zIndex: 5,
          pointerEvents: 'none'
        }} />

        {/* Snow Effect */}
        <div style={{ position: 'absolute', top: '25%', left: '26.8%', width: '46.4%', height: '22%', overflow: 'hidden', pointerEvents: 'none' }}>
           {[...Array(20)].map((_, i) => (
             <div 
               key={i} 
               className="snow-particle"
               style={{
                 left: `${Math.random() * 100}%`,
                 width: `${Math.random() * 3 + 2}px`,
                 height: `${Math.random() * 3 + 2}px`,
                 animationDuration: `${Math.random() * 4 + 2}s`,
                 animationDelay: `${Math.random() * 10}s`,
                 opacity: Math.random() * 0.7 + 0.3
               }}
             />
           ))}
        </div>

        {/* Notes Overlay */}
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
            color: '#444',
            zIndex: 10,
            padding: '2px'
          }}
        />

        {/* Calendar Grid Overlay */}
        <div style={{
          position: 'absolute',
          top: '59.1%',
          right: '28.3%',
          width: '24.9%',
          height: '16.8%',
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gridTemplateRows: 'repeat(6, 1fr)',
          zIndex: 10
        }}>
          {calendarDays.map((dateObj, i) => {
            // Check if this date is selected
            const isSelected = selectedDate && 
                             selectedDate.getFullYear() === dateObj.date.getFullYear() &&
                             selectedDate.getMonth() === dateObj.date.getMonth() &&
                             selectedDate.getDate() === dateObj.date.getDate();

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
                  transition: 'background-color 0.2s ease',
                  userSelect: 'none',
                  position: 'relative'
                }}
              >
                {isSelected ? dateObj.day : ''}
                {!isSelected && (
                  <div 
                    title={dateObj.date.toDateString()}
                    style={{ position: 'absolute', inset: 0, backgroundColor: 'transparent' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(41, 171, 226, 0.12)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Navigation Overlays */}
        <div style={{
          position: 'absolute',
          top: '35%', // Higher up on the climber image
          right: '28%',
          display: 'flex',
          gap: '15px',
          zIndex: 20
        }}>
          <button 
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
            style={{ padding: '10px', fontSize: '18px', cursor: 'pointer', opacity: 0.15, border: 'none', background: 'transparent', transition: 'opacity 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '0.15'}
          >
            ←
          </button>
          <button 
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
            style={{ padding: '10px', fontSize: '18px', cursor: 'pointer', opacity: 0.15, border: 'none', background: 'transparent', transition: 'opacity 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '0.15'}
          >
            →
          </button>
        </div>

        {/* Date Display indicator at the bottom */}
        {selectedDate && (
          <div style={{
            position: 'absolute',
            bottom: '12.5%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(255,255,255,0.95)',
            padding: '3px 12px',
            borderRadius: '15px',
            fontSize: '11px',
            fontWeight: '600',
            color: '#29abe2',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            border: '1px solid #eee',
            zIndex: 30,
            pointerEvents: 'none'
          }}>
            {selectedDate.toLocaleDateString('default', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveCalendar;
