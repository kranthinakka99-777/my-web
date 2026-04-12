import React from 'react';
import { motion } from 'framer-motion';

interface ClockCardProps {
  children: React.ReactNode;
  index: number;
}

const ClockCard: React.FC<ClockCardProps> = ({ children, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ scale: 1.04 }}
      className="
        relative rounded-2xl border border-yellow-400/40
        bg-gradient-to-br from-[#1a0533]/80 to-[#0d001a]/90
        p-6 cursor-default
        transition-all duration-300
        border-glow-gold card-hover
      "
    >
      {/* Corner accents */}
      <span className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-yellow-400 rounded-tl" />
      <span className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-purple-500 rounded-tr" />
      <span className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-purple-500 rounded-bl" />
      <span className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-yellow-400 rounded-br" />

      {children}
    </motion.div>
  );
};

export default ClockCard;
