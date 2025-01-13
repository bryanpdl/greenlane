"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Deal, getDeals } from '../utils/firestore';
import { useAuth } from '../contexts/AuthContext';

export default function DealsPage() {
  const { isAdmin } = useAuth();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('active');

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const fetchedDeals = await getDeals();
        setDeals(fetchedDeals);
      } catch (error) {
        console.error('Error fetching deals:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDeals();
  }, []);

  // Filter deals
  const filteredDeals = deals.filter(deal => {
    if (activeFilter === 'all') return true;
    return deal.status === activeFilter;
  });

  const formatDate = (timestamp: any) => {
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const formatDiscount = (deal: Deal) => {
    switch (deal.discountType) {
      case 'percentage':
        return `${deal.discountValue}% OFF`;
      case 'fixed':
        return `฿${deal.discountValue} OFF`;
      case 'bogo':
        return 'Buy 1 Get 1';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-green-base">
      <Header />
      
      <main className="flex-grow">
        {/* Deals Header */}
        <div className="bg-green-base/50 py-12">
          <div className="max-w-7xl mx-auto px-4 mt-12 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-4">
              Exclusive Deals
            </h1>
            <p className="text-xl text-gray-300">
              Special offers from cannabis businesses in Phuket
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="sticky top-16 z-40 bg-green-base/95 backdrop-blur-sm border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    activeFilter === 'all'
                      ? 'bg-green-accent text-black'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  All Deals
                </button>
                <button
                  onClick={() => setActiveFilter('active')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    activeFilter === 'active'
                      ? 'bg-green-accent text-black'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => setActiveFilter('upcoming')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    activeFilter === 'upcoming'
                      ? 'bg-green-accent text-black'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  Upcoming
                </button>
              </div>
              {isAdmin && (
                <button className="px-4 py-2 bg-green-accent text-black rounded-xl font-medium hover:bg-opacity-90 transition-colors">
                  Add New Deal
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Deals Grid */}
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="text-gray-300">Loading deals...</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDeals.map((deal) => (
                <motion.div
                  key={deal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-colors"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-12 w-12 flex-shrink-0">
                        <img
                          src="/images/mari.png"
                          alt={deal.shopName}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{deal.shopName}</h3>
                        <p className="text-sm text-gray-400">{deal.location}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-2xl font-bold text-green-accent mb-2">
                        {formatDiscount(deal)}
                      </div>
                      <h4 className="text-lg font-medium mb-2">{deal.title}</h4>
                      <p className="text-gray-300 text-sm">{deal.description}</p>
                    </div>

                    <div className="flex justify-between items-center text-sm text-gray-400">
                      <div>
                        Valid: {formatDate(deal.startDate)} - {formatDate(deal.endDate)}
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        deal.status === 'active'
                          ? 'bg-green-accent/10 text-green-accent'
                          : deal.status === 'upcoming'
                          ? 'bg-blue-500/10 text-blue-500'
                          : 'bg-gray-500/10 text-gray-500'
                      }`}>
                        {deal.status.charAt(0).toUpperCase() + deal.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
} 