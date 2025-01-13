"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const benefits = [
  {
    id: 1,
    title: 'For Businesses',
    description: 'Increase visibility and customer reach with a premium shop profile.',
    icon: (
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M21 13v10h-6v-6h-6v6h-6v-10h-3l12-12 12 12h-3zm-1-5.907v-5.093h-3v2.093l3 3z" />
      </svg>
    ),
    features: [
      'Premium shop profile',
      'Social media integration',
      'Customer analytics',
      'Exclusive promotions'
    ]
  },
  {
    id: 2,
    title: 'For Users',
    description: 'Discover and connect with the best cannabis shops in Phuket.',
    icon: (
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z"/>
      </svg>
    ),
    features: [
      'Exclusive discounts',
      'Verified reviews',
      'Real-time updates',
      'Shop recommendations'
    ]
  },
  {
    id: 3,
    title: 'Community',
    description: 'Join a thriving community of cannabis enthusiasts and businesses.',
    icon: (
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.019 10.13c-.282-.293-.268-.751.024-1.035l2.974-2.884c.145-.14.332-.211.517-.211.188 0 .375.073.518.22l-4.033 3.91zm-4.888 7.348c-.062.059-.093.139-.093.218 0 .167.136.304.304.304.076 0 .152-.029.212-.086l.499-.486-.422-.433-.5.483zm4.219-5.617l-1.71 1.657c-.918.891-1.387 1.753-1.819 2.958l.754.774c1.217-.395 2.094-.836 3.013-1.728l1.709-1.658-1.947-2.003zm4.688-5.691c.078-.076.12-.179.12-.288 0-.217-.177-.394-.394-.394-.111 0-.213.042-.288.119l-3.828 3.713 1.947 2.003 3.829-3.713 1.014.983c.146.142.333.213.521.213.186 0 .372-.072.516-.213.286-.277.286-.729 0-1.006l-1.014-.983.394-.383c.078-.076.119-.178.119-.288 0-.217-.177-.394-.394-.394-.11 0-.212.042-.288.119l-.394.383-.799-.775.394-.383c.078-.076.119-.178.119-.288 0-.217-.177-.394-.394-.394-.11 0-.212.042-.288.119l-.394.383-.799-.775.394-.383zm-5 14.83c-.062.059-.093.139-.093.218 0 .167.136.304.304.304.076 0 .152-.029.212-.086l.499-.486-.422-.433-.5.483z"/>
      </svg>
    ),
    features: [
      'Social feed',
      'Business networking',
      'Community events',
      'Industry insights'
    ]
  }
];

export default function HowItWorks() {
  return (
    <section className="py-40 bg-green-base/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Platform Benefits</h2>
          <p className="text-xl text-gray-300">Connecting cannabis businesses with enthusiasts in Phuket</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/10 transition-colors h-full">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-accent/20 text-green-accent mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
                <p className="text-gray-300 mb-6">{benefit.description}</p>
                <ul className="space-y-3 text-left">
                  {benefit.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-300">
                      <svg className="w-5 h-5 mr-3 text-green-accent" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 