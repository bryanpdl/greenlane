"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Shop, getShopById } from '../../utils/firestore';

export default function ShopPage() {
  const params = useParams();
  const [shop, setShop] = useState<Shop | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShop = async () => {
      if (!params.shopId) return;
      
      try {
        const shopData = await getShopById(params.shopId as string);
        console.log('Fetched shop data:', shopData);
        console.log('Shop images:', shopData.images);
        setShop(shopData);
      } catch (error) {
        console.error('Error fetching shop:', error);
        setError('Failed to load shop details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchShop();
  }, [params.shopId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-green-base">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-gray-300">Loading shop details...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !shop) {
    return (
      <div className="min-h-screen flex flex-col bg-green-base">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center gap-4">
          <div className="text-xl text-red-400">{error || 'Shop not found'}</div>
          <a href="/explore" className="text-green-accent hover:underline">
            Return to Explore
          </a>
        </div>
        <Footer />
      </div>
    );
  }

  const shopImages = shop.images?.length ? shop.images : [shop.image];
  console.log('Processed shop images:', shopImages);

  return (
    <div className="min-h-screen flex flex-col bg-green-base">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-[300px] lg:h-[400px]">
          <div className="absolute inset-0">
            <img
              src={shop.image}
              alt={shop.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          </div>
          
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h1 className="text-4xl font-bold">{shop.name}</h1>
              <div className="flex items-center gap-4 text-gray-300">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">★</span>
                  <span>{shop.rating.toFixed(1)}</span>
                  <span>({shop.totalRatings} reviews)</span>
                </div>
                <span>•</span>
                <span>{shop.location}</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 rounded-xl p-6"
              >
                <h2 className="text-xl font-semibold mb-4">About</h2>
                <p className="text-gray-300 whitespace-pre-line">{shop.description}</p>
              </motion.section>

              {/* Gallery Section */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 rounded-xl p-6 space-y-6"
              >
                <h2 className="text-xl font-semibold mb-4">Gallery</h2>
                {/* Images Grid */}
                {shopImages.length > 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    {shopImages.map((image, index) => (
                      <div 
                        key={index}
                        className="relative aspect-[4/3] rounded-xl overflow-hidden bg-white/5"
                      >
                        <img
                          src={image}
                          alt={`${shop.name} - Image ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Video Section (if available) */}
                {shop.video && (
                  <div className="aspect-video rounded-xl overflow-hidden bg-white/5 mt-4">
                    <video
                      src={shop.video}
                      controls
                      className="w-full h-full object-cover"
                      poster={shop.image}
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
              </motion.section>

              {/* Add more sections as needed (e.g., Products, Reviews) */}
            </div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Opening Hours */}
              <div className="bg-white/5 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Opening Hours</h3>
                <div className="space-y-2 text-gray-300">
                  {shop.openingHours.map((hours, index) => (
                    <div key={index} className="text-sm">{hours}</div>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-white/5 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <div className="space-y-3 text-gray-300">
                  {shop.phoneNumber && (
                    <div className="text-sm">
                      <div className="font-medium mb-1">Phone</div>
                      <a href={`tel:${shop.phoneNumber}`} className="hover:text-green-accent">
                        {shop.phoneNumber}
                      </a>
                    </div>
                  )}
                  {shop.website && (
                    <div className="text-sm">
                      <div className="font-medium mb-1">Website</div>
                      <a 
                        href={shop.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-green-accent break-all"
                      >
                        {shop.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 