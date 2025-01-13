"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Slider from 'react-slick';
import { getShops, Shop } from '../utils/firestore';

// Import slick styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute bottom-[-4.5rem] right-0 z-10 p-3 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/30 transition-all"
    >
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/>
      </svg>
    </button>
  );
}

function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute bottom-[-4.5rem] left-0 z-10 p-3 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/30 transition-all rotate-180"
    >
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/>
      </svg>
    </button>
  );
}

export default function FeaturedShops() {
  const [featuredShops, setFeaturedShops] = useState<Shop[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedShops = async () => {
      try {
        const allShops = await getShops();
        console.log('All shops fetched:', allShops);
        
        // Sort shops by totalRatings (if available) or just take first 4
        const featured = allShops
          .sort((a, b) => {
            const ratingA = a.totalRatings || 0;
            const ratingB = b.totalRatings || 0;
            return ratingB - ratingA;
          })
          .slice(0, 4); // Show only top 4 shops

        console.log('Featured shops selected:', featured);
        setFeaturedShops(featured);
      } catch (error) {
        console.error('Error fetching featured shops:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedShops();
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    adaptiveHeight: true
  };

  return (
    <section className="py-20 bg-green-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Featured Shops
          </h2>
          <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            Discover Phuket's top-rated cannabis businesses, each offering exclusive deals and unique experiences.
          </p>
        </motion.div>

        <div className="relative">
          {isLoading ? (
            // Loading skeleton for single wide card
            <div className="animate-pulse bg-white/5 rounded-2xl p-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-2/3">
                  <div className="bg-white/10 rounded-xl aspect-video mb-6"></div>
                </div>
                <div className="w-full md:w-1/3 space-y-4">
                  <div className="h-8 bg-white/10 rounded w-3/4"></div>
                  <div className="h-6 bg-white/10 rounded w-1/2"></div>
                  <div className="h-24 bg-white/10 rounded w-full"></div>
                  <div className="h-6 bg-white/10 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          ) : (
            <Slider {...sliderSettings}>
              {featuredShops.map((shop, index) => (
                <div key={shop.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-[#0D0E0D]/20 hover:bg-white/10"
                  >
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="w-full md:w-2/3">
                        <div className="relative aspect-video rounded-xl overflow-hidden">
                          <img
                            src={shop.image || '/images/mari.png'}
                            alt={shop.name}
                            className="object-cover w-full h-full transform transition-transform duration-300 hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                            <div className="absolute bottom-4 left-4">
                              <div className="flex items-center text-sm bg-black/40 backdrop-blur-sm rounded-full px-3 py-1 w-fit">
                                <span className="text-yellow-400">★</span>
                                <span className="ml-1 font-medium">{shop.rating?.toFixed(1) || 'New'}</span>
                                {shop.totalRatings > 0 && (
                                  <>
                                    <span className="mx-1">·</span>
                                    <span className="text-gray-300">{shop.totalRatings} reviews</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="w-full md:w-1/3 space-y-6">
                        <div>
                          <h3 className="text-3xl font-bold mb-3">{shop.name}</h3>
                          <p className="text-gray-400 text-lg">{shop.description}</p>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-gray-400 flex items-center">
                            <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <span>{shop.location}</span>
                          </p>
                          
                          {shop.phoneNumber && (
                            <p className="text-gray-400 flex items-center">
                              <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                              </svg>
                              <span>{shop.phoneNumber}</span>
                            </p>
                          )}
                        </div>
                        
                        <Link
                          href={`/shops/${shop.id}`}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-green-accent rounded-full text-base font-semibold hover:bg-opacity-90 transition-all hover:gap-3 w-full justify-center"
                        >
                          View Shop
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </Slider>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-28"
        >
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-full text-base font-semibold transition-all hover:gap-3"
          >
            View All Shops
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/>
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 