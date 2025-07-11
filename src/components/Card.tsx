'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView, Variants } from 'framer-motion';

interface CardProps {
  title: string;
  description: string;
  avatar: string;
  onClick: () => void;
}

const colors = [
  'from-purple-500 via-pink-500 to-red-500',
  'from-blue-500 via-cyan-500 to-teal-500',
  'from-green-500 via-emerald-500 to-lime-500',
  'from-amber-500 via-orange-500 to-red-500',
  'from-fuchsia-500 via-purple-500 to-indigo-500',
];

export default function Card({ title, description, avatar, onClick }: CardProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const colorClass = colors[Math.floor(Math.random() * colors.length)];

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setPosition({
          x: (Math.random() - 0.5) * 8,
          y: (Math.random() - 0.5) * 8,
        });
        setRotation((Math.random() - 0.5) * 10);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isHovered]);

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    hover: {
      scale: 1.03,
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    tap: {
      scale: 0.98,
    },
  };

  const avatarVariants: Variants = {
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-2xl cursor-pointer"
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 from-indigo-500/20 to-purple-500/20" />
      
      <div className="relative z-10 p-8 flex flex-col md:flex-row items-center">
        <motion.div
          className={`w-32 h-32 rounded-2xl mb-6 md:mb-0 md:mr-8 flex-shrink-0 flex items-center justify-center text-6xl shadow-lg bg-gradient-to-br ${colorClass}`}
          animate={{
            x: position.x,
            y: position.y,
            rotate: rotation,
          }}
          variants={avatarVariants}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        >
          {avatar}
        </motion.div>

        <div className="text-center md:text-left">
          <motion.h3 
            className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400"
            whileHover={{ scale: 1.02 }}
          >
            {title}
          </motion.h3>
          <motion.p 
            className="text-gray-300 mb-4"
            initial={{ opacity: 0.8 }}
            whileHover={{ opacity: 1 }}
          >
            {description}
          </motion.p>
          <motion.button
            className="px-6 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(6, 182, 212, 0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </div>
      </div>

      {/* Animated background elements */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/5"
          style={{
            width: Math.random() * 200 + 100,
            height: Math.random() * 200 + 100,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, (Math.random() - 0.5) * 100],
            y: [0, (Math.random() - 0.5) * 100],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      ))}
    </motion.div>
  );
}
