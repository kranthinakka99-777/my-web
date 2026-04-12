import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ClockCard from './ClockCard';

interface ClockProps {
  timezone: string;
  label: string;
  offset: string;
  index: number;
  use24Hour: boolean;
}

const getTimeInTimezone = (timezone: string): Date => {
  // Use Intl to get UTC time adjusted to timezone offset represented as a Date
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
  const parts = formatter.formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '00';
  return new Date(
    `${get('year')}-${get('month')}-${get('day')}T${get('hour')}:${get('minute')}:${get('second')}`
  );
};

const Clock: React.FC<ClockProps> = ({ timezone, label, offset, index, use24Hour }) => {
  const [time, setTime] = React.useState<Date>(() => getTimeInTimezone(timezone));

  React.useEffect(() => {
    const id = setInterval(() => setTime(getTimeInTimezone(timezone)), 1000);
    return () => clearInterval(id);
  }, [timezone]);

  const hours = use24Hour
    ? String(time.getHours()).padStart(2, '0')
    : String(time.getHours() % 12 || 12).padStart(2, '0');
  const minutes = String(time.getMinutes()).padStart(2, '0');
  const seconds = String(time.getSeconds()).padStart(2, '0');
  const ampm = use24Hour ? null : time.getHours() < 12 ? 'AM' : 'PM';

  const dateStr = time.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <ClockCard index={index}>
      {/* Timezone header */}
      <div className="text-center mb-4">
        <motion.h2
          className="text-xl font-bold tracking-widest glow-gold text-yellow-400 uppercase"
          animate={{ opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {label}
        </motion.h2>
        <p className="text-purple-400 text-xs tracking-wider mt-1 glow-purple">{offset}</p>
      </div>

      {/* Digital time display */}
      <div className="flex items-center justify-center gap-1 font-mono">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={`h-${hours}`}
            initial={{ opacity: 0.4, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.15 }}
            className="text-4xl md:text-5xl text-yellow-400 glow-gold tabular-nums"
          >
            {hours}
          </motion.span>
        </AnimatePresence>

        <motion.span
          className="text-4xl md:text-5xl text-yellow-400 glow-gold"
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          :
        </motion.span>

        <AnimatePresence mode="popLayout">
          <motion.span
            key={`m-${minutes}`}
            initial={{ opacity: 0.4, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.15 }}
            className="text-4xl md:text-5xl text-yellow-400 glow-gold tabular-nums"
          >
            {minutes}
          </motion.span>
        </AnimatePresence>

        <motion.span
          className="text-4xl md:text-5xl text-yellow-400 glow-gold"
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          :
        </motion.span>

        <AnimatePresence mode="popLayout">
          <motion.span
            key={`s-${seconds}`}
            initial={{ opacity: 0.4, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.15 }}
            className="text-4xl md:text-5xl text-purple-400 glow-purple tabular-nums"
          >
            {seconds}
          </motion.span>
        </AnimatePresence>

        {ampm && (
          <span className="text-lg text-yellow-400/70 ml-1 self-end mb-1 tracking-widest">
            {ampm}
          </span>
        )}
      </div>

      {/* Date */}
      <div className="text-center mt-4">
        <p className="text-gray-400 text-xs tracking-widest">{dateStr}</p>
      </div>
    </ClockCard>
  );
};

export default Clock;
