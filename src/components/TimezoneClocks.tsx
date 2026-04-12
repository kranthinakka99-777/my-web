import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Clock from './Clock';

interface TimezoneConfig {
  label: string;
  timezone: string;
  offset: string;
}

const TIMEZONES: TimezoneConfig[] = [
  { label: 'UTC',  timezone: 'UTC',                  offset: 'UTC+0'    },
  { label: 'EST',  timezone: 'America/New_York',      offset: 'UTC-5'    },
  { label: 'CST',  timezone: 'America/Chicago',       offset: 'UTC-6'    },
  { label: 'PST',  timezone: 'America/Los_Angeles',   offset: 'UTC-8'    },
  { label: 'IST',  timezone: 'Asia/Kolkata',          offset: 'UTC+5:30' },
  { label: 'JST',  timezone: 'Asia/Tokyo',            offset: 'UTC+9'    },
  { label: 'AEST', timezone: 'Australia/Sydney',      offset: 'UTC+10'   },
  { label: 'CET',  timezone: 'Europe/Paris',          offset: 'UTC+1'    },
];

const TimezoneClocks: React.FC = () => {
  const [use24Hour, setUse24Hour] = useState(true);

  return (
    <div className="min-h-screen px-4 py-10 flex flex-col items-center">
      {/* Header */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1
          className="text-5xl md:text-6xl font-bold tracking-widest uppercase glow-gold text-yellow-400 mb-3"
          style={{ fontFamily: "'Share Tech Mono', monospace" }}
        >
          ⏱ World Clock
        </h1>
        <p className="text-purple-400 glow-purple text-sm tracking-widest">
          Real-time digital clocks across the globe
        </p>

        {/* 12/24-hour toggle */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <span className="text-gray-400 text-sm tracking-wider">12H</span>
          <button
            onClick={() => setUse24Hour((v) => !v)}
            className={`
              relative w-14 h-7 rounded-full border transition-all duration-300
              ${use24Hour
                ? 'bg-yellow-400/20 border-yellow-400'
                : 'bg-purple-500/20 border-purple-500'}
            `}
            aria-label="Toggle 12/24 hour format"
          >
            <motion.div
              layout
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className={`
                absolute top-0.5 w-6 h-6 rounded-full shadow-lg
                ${use24Hour ? 'bg-yellow-400 left-7' : 'bg-purple-500 left-0.5'}
              `}
            />
          </button>
          <span className="text-gray-400 text-sm tracking-wider">24H</span>
        </div>
      </motion.div>

      {/* Clock grid */}
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {TIMEZONES.map((tz, i) => (
          <Clock
            key={tz.label}
            label={tz.label}
            timezone={tz.timezone}
            offset={tz.offset}
            index={i}
            use24Hour={use24Hour}
          />
        ))}
      </div>

      {/* Footer */}
      <motion.p
        className="mt-12 text-gray-600 text-xs tracking-widest"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        Updates every second · Legendary World Clock
      </motion.p>
    </div>
  );
};

export default TimezoneClocks;
