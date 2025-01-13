"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Shop, getShops } from '../utils/firestore';

export default function ExplorePage() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const fetchShops = async () => {
      try {
        console.log('Fetching shops...'); // Debug log
        const fetchedShops = await getShops();
        console.log('Fetched shops:', fetchedShops); // Debug log
        setShops(fetchedShops);
      } catch (error) {
        console.error('Error fetching shops:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShops();
  }, []);

  // Filter and sort shops
  const filteredShops = shops.filter(shop => {
    console.log('Filtering shop:', shop); // Debug log
    if (activeFilter === 'all') return true; // Show all shops for now
    return false; // Add more filter conditions as needed
  }).sort((a, b) => {
    if (sortBy === 'newest') {
      return b.lastUpdated.seconds - a.lastUpdated.seconds;
    }
    if (sortBy === 'rating') {
      return (b.rating || 0) - (a.rating || 0);
    }
    if (sortBy === 'reviews') {
      return (b.totalRatings || 0) - (a.totalRatings || 0);
    }
    return 0;
  });

  return (
    <div className="min-h-screen flex flex-col bg-green-base">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-green-base/50 py-12">
          <div className="max-w-7xl mx-auto px-4 mt-12 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-4">
              Explore Shops
            </h1>
            <p className="text-xl text-gray-300">
              Discover the best cannabis in Thailand
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
                  All Shops
                </button>
                {/* Add more filter buttons as needed */}
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-accent focus:border-transparent"
              >
                <option value="newest">Newest</option>
                <option value="rating">Top Rated</option>
                <option value="reviews">Most Reviews</option>
              </select>
            </div>
          </div>
        </div>

        {/* Shop Grid */}
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="text-gray-300">Loading shops...</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredShops.map((shop) => (
                <motion.div
                  key={shop.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-colors group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={shop.image}
                      alt={shop.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <div>
                      <h3 className="text-lg font-semibold mb-1 line-clamp-1">{shop.name}</h3>
                      <p className="text-gray-300 text-sm line-clamp-1">{shop.location}</p>
                    </div>
                    
                    {shop.rating > 0 && (
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <div className="flex items-center">
                          <span className="text-yellow-400">★</span>
                          <span className="ml-1">{shop.rating.toFixed(1)}</span>
                        </div>
                        <span>•</span>
                        <span>{shop.totalRatings} reviews</span>
                      </div>
                    )}

                    <p className="text-gray-400 text-sm line-clamp-2">
                      {shop.description}
                    </p>

                    <button 
                      onClick={() => window.location.href = `/shops/${shop.id}`}
                      className="w-full px-4 py-2.5 bg-green-accent text-black rounded-xl font-medium hover:bg-opacity-90 transition-colors"
                    >
                      View Shop
                    </button>
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