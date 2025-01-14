"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col bg-green-base">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-green-base/50 py-20">
          <div className="max-w-7xl mb-[-5rem] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl mt-16 md:text-5xl font-bold mb-6">
                Grow Your Cannabis Business with GreenLane
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Join Thailand's premier cannabis directory and reward platform. Connect with customers, boost loyalty, and increase your revenue.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Benefits Section */}
        <section className="py-20 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm">
                <div className="w-12 h-12 bg-green-accent/20 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Enhanced Visibility</h3>
                <p className="text-gray-400">
                  Get discovered by thousands of cannabis enthusiasts actively searching for quality dispensaries in Thailand.
                </p>
              </div>

              <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm">
                <div className="w-12 h-12 bg-green-accent/20 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Reward Program</h3>
                <p className="text-gray-400">
                  Build customer loyalty with our integrated reward system. Customers earn points and unlock exclusive discounts.
                </p>
              </div>

              <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm">
                <div className="w-12 h-12 bg-green-accent/20 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Analytics & Insights</h3>
                <p className="text-gray-400">
                  Track customer engagement, reward redemptions, and business performance with detailed analytics.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-4">How GreenLane Rewards Work</h2>
              <p className="text-xl text-gray-300">Simple, effective customer retention for your business</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-green-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Get Your Unique QR Code</h3>
                    <p className="text-gray-400">
                      Upon registration, you'll receive a custom QR code and URL for your business. Display these in your store to make it easy for customers to join your rewards program.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-green-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Customer Joins Instantly</h3>
                    <p className="text-gray-400">
                      Customers scan your QR code or visit your link to sign up. They're automatically connected to your shop's reward program - no extra steps needed.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-green-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Rewards & Redemption</h3>
                    <p className="text-gray-400">
                      Members start earning points immediately. They can view and redeem rewards directly through your shop's page on GreenLane.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm"
              >
                <h3 className="text-2xl font-bold mb-6">Platform Fees</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Monthly Listing Fee</h4>
                    <p className="text-gray-400 mb-2">฿1,499/month</p>
                    <ul className="text-gray-400 space-y-2">
                      <li className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-green-accent" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Premium business listing
                      </li>
                      <li className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-green-accent" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Reward program access
                      </li>
                      <li className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-green-accent" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Analytics dashboard
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold mb-2">Transaction Fee</h4>
                    <p className="text-gray-400 mb-2">2.5% per reward redemption</p>
                    <ul className="text-gray-400 space-y-2">
                      <li className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-green-accent" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Only charged on discounted transactions
                      </li>
                      <li className="flex items-center">
                        <svg className="w-5 h-5 mr-2 text-green-accent" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        No fee on regular transactions
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl font-bold mb-6">Ready to Grow Your Business?</h2>
              <p className="text-xl text-gray-300 mb-8">
                Join GreenLane today and start building lasting relationships with your customers.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-green-accent text-black rounded-full text-lg font-semibold hover:bg-opacity-90 transition-all"
              >
                Get Started
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/>
                </svg>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
} 