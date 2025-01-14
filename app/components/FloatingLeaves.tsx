"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const FloatingLeaf = ({ size, initialX, initialY, duration }: { 
  size: number;
  initialX: number;
  initialY: number;
  duration: number;
}) => {
  return (
    <motion.div
      className="absolute pointer-events-none"
      initial={{ x: `${initialX}vw`, y: initialY, opacity: 0 }}
      animate={{
        y: [initialY, initialY - 2000],
        opacity: [0, 0.55, 0],
        rotate: [0, 720],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "linear",
        delay: Math.random() * 10,
      }}
      style={{
        width: size,
        height: size,
      }}
    >
      <Image
        src="/images/mari.png"
        alt=""
        width={size}
        height={size}
        className="w-full h-full opacity-30"
      />
    </motion.div>
  );
};

const leafConfigs = [
  { size: 40, initialX: 10, initialY: 800, duration: 35 },
  { size: 45, initialX: 30, initialY: 600, duration: 40 },
  { size: 35, initialX: 50, initialY: 900, duration: 38 },
  { size: 50, initialX: 70, initialY: 700, duration: 42 },
  { size: 38, initialX: 90, initialY: 1000, duration: 37 },
  { size: 42, initialX: 20, initialY: 850, duration: 39 },
  { size: 48, initialX: 40, initialY: 750, duration: 41 },
  { size: 32, initialX: 60, initialY: 950, duration: 36 },
  { size: 44, initialX: 80, initialY: 650, duration: 43 },
  { size: 36, initialX: 15, initialY: 880, duration: 38 },
  { size: 46, initialX: 35, initialY: 720, duration: 40 },
  { size: 34, initialX: 55, initialY: 930, duration: 37 }
];

export default function FloatingLeaves() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {leafConfigs.map((config, index) => (
        <FloatingLeaf
          key={index}
          size={config.size}
          initialX={config.initialX}
          initialY={config.initialY}
          duration={config.duration}
        />
      ))}
    </div>
  );
} 