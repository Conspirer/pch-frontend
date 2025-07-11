'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the Card component with no SSR
const Card = dynamic(() => import('@/components/Card'), { ssr: false });

// Type definition for avatar data
interface AvatarData {
  id: number;
  title: string;
  description: string;
  avatar: string;
}

// Sample data for the cards
const avatarData: AvatarData[] = [
  {
    id: 1,
    title: 'Interactive Avatar 1',
    description: 'This is a description for the first interactive avatar. Click to learn more about its features and capabilities.',
    avatar: '👋',
  },
  {
    id: 2,
    title: 'Dynamic Avatar 2',
    description: 'Experience the smooth animations and interactive elements of our second avatar. Perfect for engaging user experiences.',
    avatar: '🤖',
  },
  {
    id: 3,
    title: 'Creative Avatar 3',
    description: 'Our most creative avatar yet, with unique animations that respond to user interactions in real-time.',
    avatar: '🎨',
  },
  {
    id: 4,
    title: 'Friendly Avatar 4',
    description: 'A friendly companion that adds personality to your application. Watch it come to life with smooth animations.',
    avatar: '😊',
  },
];

export default function Home() {
  const handleCardClick = (id: number) => {
    console.log(`Card ${id} clicked`);
    // You can add navigation or other actions here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Centered Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Interactive Avatar Showcase</h1>
          <p className="text-xl text-gray-600">Click on any card to learn more about our interactive avatars</p>
        </div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {avatarData.map((item: AvatarData) => (
            <Card
              key={item.id}
              title={item.title}
              description={item.description}
              avatar={item.avatar}
              onClick={() => handleCardClick(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
