'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  title: string;
  description: string;
  avatar: string;
  onClick: () => void;
}

export default function Card({ title, description, avatar, onClick }: CardProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    // Animate the avatar position slightly
    const interval = setInterval(() => {
      setPosition({
        x: (Math.random() - 0.5) * 5,
        y: (Math.random() - 0.5) * 5,
      });
      setRotation((Math.random() - 0.5) * 5);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {/* Left side - Avatar */}
      <div className="flex items-center justify-center p-6 bg-gray-100">
        <motion.div
          className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-4xl"
          animate={{
            x: position.x,
            y: position.y,
            rotate: rotation,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        >
          {avatar}
        </motion.div>
      </div>

      {/* Right side - Info */}
      <div className="p-6 flex-1">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
}
