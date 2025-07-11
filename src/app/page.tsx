'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';

// Dynamically import the Card component with no SSR
const Card = dynamic(() => import('@/components/Card'), { ssr: false });

// Type definition for avatar data
interface AvatarData {
  id: number;
  title: string;
  description: string;
  avatar: string;
  tags: string[];
}

// Sample data for the cards
const avatarData: AvatarData[] = [
  {
    id: 1,
    title: 'Interactive Avatar',
    description: 'Experience the next generation of digital interaction with our AI-powered avatar that responds to your every move with lifelike precision and charm.',
    avatar: '✨',
    tags: ['AI-Powered', 'Responsive', 'Interactive']
  },
  {
    id: 2,
    title: 'Dynamic Companion',
    description: 'Meet your new digital companion, designed to engage and assist with natural, flowing conversations and intuitive interactions.',
    avatar: '🤖',
    tags: ['Conversational', 'Intelligent', 'Engaging']
  },
  {
    id: 3,
    title: 'Creative Assistant',
    description: 'Unleash your creativity with an avatar that understands and enhances your artistic vision through intuitive collaboration.',
    avatar: '🎨',
    tags: ['Creative', 'Collaborative', 'Inspiring']
  },
  {
    id: 4,
    title: 'Friendly Guide',
    description: 'Navigate complex tasks with ease, guided by an avatar that makes learning and discovery both fun and rewarding.',
    avatar: '😊',
    tags: ['Helpful', 'Educational', 'Friendly']
  },
  {
    id: 5,
    title: 'Tech Enthusiast',
    description: 'Dive into the world of technology with an avatar that stays on the cutting edge of digital innovation.',
    avatar: '💻',
    tags: ['Technical', 'Innovative', 'Modern']
  },
  {
    id: 6,
    title: 'Wellness Partner',
    description: 'Your personal wellness journey starts here, with gentle guidance and supportive interactions.',
    avatar: '🧘',
    tags: ['Health', 'Wellness', 'Supportive']
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('All');
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const handleCardClick = (id: number) => {
    console.log(`Card ${id} clicked`);
    // You can add navigation or other actions here
  };

  // Get all unique tags
  const allTags = useMemo(() => ['All', ...new Set(avatarData.flatMap(avatar => avatar.tags))], []);

  // Filter avatars based on active filter
  const filteredAvatars = useMemo(() => {
    const filtered = activeFilter === 'All' 
      ? [...avatarData]
      : avatarData.filter(avatar => avatar.tags.includes(activeFilter));
    
    // Force a new reference to ensure animations reset
    return JSON.parse(JSON.stringify(filtered));
  }, [activeFilter, JSON.stringify(avatarData)])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {useMemo(() => {
          const elements = [];
          for (let i = 0; i < 20; i++) {
            const width = Math.random() * 250 + 50;
            const height = Math.random() * 250 + 50;
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const x1 = (Math.random() - 0.5) * 200;
            const y1 = (Math.random() - 0.5) * 200;
            const duration = 20 + Math.random() * 40;
            
            elements.push(
              <motion.div
                key={`bg-${i}`}
                className="absolute rounded-full bg-white/5"
                initial={{
                  width: `${width}px`,
                  height: `${height}px`,
                  left: `${left}%`,
                  top: `${top}%`,
                  x: 0,
                  y: 0,
                  opacity: 0.1
                }}
                animate={{
                  x: [0, x1, 0],
                  y: [0, y1, 0],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'easeInOut',
                }}
              />
            );
          }
          return elements;
        }, [])}
      </div>

      <main className="relative z-10 min-h-screen p-4 sm:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <motion.header 
            className="text-center py-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Discover Your Perfect Avatar
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Explore our collection of beautifully animated avatars. Each one is designed to bring personality and engagement to your digital experience.
            </motion.p>
          </motion.header>

          {/* Filter Buttons */}
          <motion.div 
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {allTags.map((tag: string) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === tag
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {tag}
              </button>
            ))}
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredAvatars.map((avatar: AvatarData, index: number) => (
              <motion.div
                key={`${avatar.id}-${activeFilter}`}
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                custom={index}
              >
                <Card
                  title={avatar.title}
                  description={avatar.description}
                  avatar={avatar.avatar}
                  onClick={() => handleCardClick(avatar.id)}
                />
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied users who have already enhanced their digital experience with our avatars.
            </p>
            <motion.button
              className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium text-lg shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(6, 182, 212, 0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              Create Your Avatar Now
            </motion.button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
