'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Trash2, Download } from 'lucide-react';

interface CalendarProps {
  month?: number;
  year?: number;
}

interface DateRange {
  start: Date | null;
  end: Date | null;
}

const InteractiveCalendar: React.FC<CalendarProps> = ({ month, year }) => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(
    new Date(year || today.getFullYear(), month ?? today.getMonth(), 1)
  );
  const [dateRange, setDateRange] = useState<DateRange>({ start: null, end: null });
  const [notes, setNotes] = useState<string>('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Load notes from localStorage
  useEffect(() => {
    const storageKey = `calendar-notes-${currentDate.getFullYear()}-${currentDate.getMonth()}`;
    const rangeKey = `calendar-range-${currentDate.getFullYear()}-${currentDate.getMonth()}`;
    
    const savedNotes = localStorage.getItem(storageKey);
    const savedRange = localStorage.getItem(rangeKey);
    
    if (savedNotes) setNotes(savedNotes);
    if (savedRange) {
      const [startStr, endStr] = JSON.parse(savedRange);
      setDateRange({
        start: startStr ? new Date(startStr) : null,
        end: endStr ? new Date(endStr) : null,
      });
    }
  }, [currentDate]);

  // Save notes to localStorage
  useEffect(() => {
    const storageKey = `calendar-notes-${currentDate.getFullYear()}-${currentDate.getMonth()}`;
    localStorage.setItem(storageKey, notes);
  }, [notes, currentDate]);

  // Save date range to localStorage
  useEffect(() => {
    const rangeKey = `calendar-range-${currentDate.getFullYear()}-${currentDate.getMonth()}`;
    localStorage.setItem(rangeKey, JSON.stringify([dateRange.start?.toISOString(), dateRange.end?.toISOString()]));
  }, [dateRange, currentDate]);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isDateInRange = (date: Date): boolean => {
    if (!dateRange.start || !dateRange.end) return false;
    
    const start = new Date(dateRange.start);
    const end = new Date(dateRange.end);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    
    return date > start && date < end;
  };

  const isSameDate = (date1: Date, date2: Date | null): boolean => {
    if (!date2) return false;
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const isToday = (date: Date): boolean => {
    return isSameDate(date, today);
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    
    if (!dateRange.start) {
      setDateRange({ start: clickedDate, end: null });
    } else if (!dateRange.end) {
      if (clickedDate < dateRange.start) {
        setDateRange({ start: clickedDate, end: dateRange.start });
      } else {
        setDateRange({ ...dateRange, end: clickedDate });
      }
    } else {
      setDateRange({ start: clickedDate, end: null });
    }
  };

  const handleClearRange = () => {
    setDateRange({ start: null, end: null });
  };

  const handleClearNotes = () => {
    setNotes('');
  };

  const handleExportData = () => {
    const exportData = {
      month: currentDate.toLocaleString('default', { month: 'long', year: 'numeric' }),
      dateRange: {
        start: dateRange.start?.toLocaleDateString(),
        end: dateRange.end?.toLocaleDateString(),
      },
      notes,
    };
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `calendar-${currentDate.getFullYear()}-${currentDate.getMonth() + 1}.json`;
    link.click();
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  // Create calendar grid
  const calendarDays = [];
  
  // Add empty cells for days before month starts
  for (let i = firstDay; i > 0; i--) {
    const prevMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1 - i);
    calendarDays.push({
      date: prevMonthDate,
      day: prevMonthDate.getDate(),
      isCurrentMonth: false,
    });
  }

  // Add days of current month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    calendarDays.push({
      date,
      day,
      isCurrentMonth: true,
    });
  }

  // Add empty cells for days after month ends
  const remaining = 42 - calendarDays.length;
  for (let i = 1; i <= remaining; i++) {
    const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i);
    calendarDays.push({
      date: nextMonthDate,
      day: nextMonthDate.getDate(),
      isCurrentMonth: false,
    });
  }

  const bgGradients = [
    'from-blue-400 to-blue-600',
    'from-purple-400 to-purple-600',
    'from-pink-400 to-pink-600',
    'from-green-400 to-green-600',
    'from-orange-400 to-orange-600',
  ];

  const randomGradient = bgGradients[currentDate.getMonth() % bgGradients.length];

  return (
    <div className={`min-h-screen p-4 md:p-8 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-blue-50'}`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className={`text-4xl md:text-5xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Wall Calendar
            </h1>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Select dates and take notes
            </p>
          </div>
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              theme === 'light'
                ? 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>

        {/* Main Calendar Container */}
        <div className={`rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-3 h-auto lg:h-[600px]">
            {/* Hero Image Section */}
            <div className={`lg:col-span-1 bg-gradient-to-br ${randomGradient} relative overflow-hidden flex flex-col justify-between p-6 text-white`}>
              <div>
                <div className="text-6xl md:text-7xl font-bold mb-2">{currentDate.getMonth() + 1}</div>
                <div className="text-2xl md:text-3xl font-semibold">{currentDate.getFullYear()}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm opacity-75">
                  {dateRange.start && dateRange.end && (
                    <span>
                      {dateRange.start.toLocaleDateString()} - {dateRange.end.toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Calendar and Notes Section */}
            <div className="lg:col-span-2 flex flex-col">
              {/* Calendar Section */}
              <div className="flex-1 border-b border-gray-200 lg:border-r lg:border-b-0 dark:border-gray-700 p-6">
                {/* Month Navigation */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {monthName}
                  </h2>
                  <div className="flex gap-2">
                    <button
                      onClick={previousMonth}
                      className={`p-2 rounded-lg transition-colors ${
                        theme === 'dark'
                          ? 'bg-gray-700 hover:bg-gray-600 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={goToToday}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        theme === 'dark'
                          ? 'bg-blue-600 hover:bg-blue-500 text-white'
                          : 'bg-blue-500 hover:bg-blue-600 text-white'
                      }`}
                    >
                      Today
                    </button>
                    <button
                      onClick={nextMonth}
                      className={`p-2 rounded-lg transition-colors ${
                        theme === 'dark'
                          ? 'bg-gray-700 hover:bg-gray-600 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>

                {/* Day Names */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {days.map((day) => (
                    <div
                      key={day}
                      className={`text-center text-sm font-semibold ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                  {calendarDays.map((dayObj, index) => {
                    const isStart = isSameDate(dayObj.date, dateRange.start);
                    const isEnd = isSameDate(dayObj.date, dateRange.end);
                    const inRange = isDateInRange(dayObj.date);
                    const isTodayDate = isToday(dayObj.date);

                    return (
                      <button
                        key={index}
                        onClick={() => dayObj.isCurrentMonth && handleDateClick(dayObj.day)}
                        disabled={!dayObj.isCurrentMonth}
                        className={`
                          aspect-square rounded-lg font-semibold text-sm transition-all
                          ${!dayObj.isCurrentMonth
                            ? theme === 'dark'
                              ? 'text-gray-600 cursor-default'
                              : 'text-gray-300 cursor-default'
                            : ''
                          }
                          ${isStart || isEnd
                            ? 'bg-blue-500 text-white shadow-lg hover:bg-blue-600'
                            : ''
                          }
                          ${inRange && !isStart && !isEnd
                            ? theme === 'dark'
                              ? 'bg-blue-900 text-blue-100'
                              : 'bg-blue-100 text-blue-900'
                            : ''
                          }
                          ${isTodayDate && !isStart && !isEnd
                            ? theme === 'dark'
                              ? 'ring-2 ring-orange-400'
                              : 'ring-2 ring-orange-500'
                            : ''
                          }
                          ${!isStart && !isEnd && !inRange && dayObj.isCurrentMonth
                            ? `hover:${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} cursor-pointer`
                            : ''
                          }
                        `}
                      >
                        {dayObj.day}
                      </button>
                    );
                  })}
                </div>

                {/* Range Selection Info */}
                <div className="mt-4 text-center">
                  {dateRange.start && dateRange.end && (
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {Math.ceil(
                        (dateRange.end.getTime() - dateRange.start.getTime()) / (1000 * 60 * 60 * 24)
                      )}{' '}
                      days selected
                    </p>
                  )}
                </div>
              </div>

              {/* Notes Section */}
              <div className="flex-shrink-0 p-6 bg-opacity-50">
                <div className="flex justify-between items-center mb-4">
                  <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    📝 Notes
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={handleExportData}
                      title="Export data"
                      className={`p-2 rounded-lg transition-colors ${
                        theme === 'dark'
                          ? 'bg-gray-700 hover:bg-gray-600 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      <Download size={18} />
                    </button>
                    <button
                      onClick={handleClearNotes}
                      title="Clear notes"
                      className={`p-2 rounded-lg transition-colors ${
                        theme === 'dark'
                          ? 'bg-red-900 hover:bg-red-800 text-white'
                          : 'bg-red-100 hover:bg-red-200 text-red-700'
                      }`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add your notes here..."
                  className={`w-full p-4 rounded-lg border-2 border-transparent resize-none focus:outline-none focus:border-blue-500 transition-all h-24 md:h-32 ${
                    theme === 'dark'
                      ? 'bg-gray-700 text-white placeholder-gray-400'
                      : 'bg-gray-50 text-gray-900 placeholder-gray-400'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={handleClearRange}
            className="px-6 py-3 rounded-lg font-medium transition-all bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl"
          >
            Clear Selection
          </button>
        </div>

        {/* Info Footer */}
        <div className={`mt-8 p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-blue-50 text-gray-700'}`}>
          <p className="text-sm">
            💡 <strong>Tip:</strong> Click on dates to select a range. Your selections and notes are automatically saved to your browser's local storage.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InteractiveCalendar;
