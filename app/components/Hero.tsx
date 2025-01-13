"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import FloatingLeaves from './FloatingLeaves';

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div 
        className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(21, 24, 23, 0.8), rgba(21, 24, 23, 0.95)), url('/hero-bg.jpg')`
        }}
      />

      {/* Floating Leaves Background */}
      <FloatingLeaves />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="flex items-center justify-center mb-4">
            <span className="px-4 py-1.5 rounded-full border border-green-accent text-green-accent text-sm font-medium">
              Thailand's Premier Cannabis Network
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Connect with the Best
            <br />
            <span className="text-green-accent">Cannabis Businesses</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Join Thailand's exclusive platform connecting cannabis businesses with enthusiasts. Discover deals, share experiences, and grow your network.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center sm:gap-4 mt-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto mb-4 sm:mb-0"
            >
              <Link
                href="/explore"
                className="inline-block w-full sm:w-auto px-8 py-4 bg-green-accent text-white rounded-full text-lg font-semibold hover:bg-opacity-90 transition-colors"
              >
                Explore Shops
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Link
                href="/register"
                className="inline-block w-full sm:w-auto px-8 py-4 border-2 border-green-accent text-white rounded-full text-lg font-semibold hover:bg-green-accent transition-colors"
              >
                List Your Business
              </Link>
            </motion.div>
          </div>

          {/* Stats Section */}
          <div className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {[
              { label: 'Active Shops', value: '50+' },
              { label: 'Monthly Users', value: '2.5K+' },
              { label: 'Exclusive Deals', value: '100+' },
              { label: 'Reviews', value: '1K+' }
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-accent mb-2">{stat.value}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-base to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      />
    </div>
  );
} 