"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap, initGSAP } from '../utils/gsap';

// Extended product type with more details
type Product = {
  id: number;
  name: string;
  type: 'Sativa' | 'Indica' | 'Hybrid';
  thc: string;
  cbd: string;
  price: number;
  image: string;
  popularity: number;
};

const products: Product[] = [
  {
    id: 1,
    name: 'Zsunami',
    type: 'Hybrid',
    thc: '18%',
    cbd: '1%',
    price: 12,
    popularity: 95,
    image: '/products/blue-dream.jpg'
  },
  {
    id: 2,
    name: 'Astroblast',
    type: 'Hybrid',
    thc: '22%',
    cbd: '0.5%',
    price: 15,
    popularity: 98,
    image: '/products/gsc.jpg'
  },
  {
    id: 3,
    name: 'Northern Lights',
    type: 'Indica',
    thc: '16%',
    cbd: '0.8%',
    price: 12,
    popularity: 92,
    image: '/products/northern-lights.jpg'
  },
  {
    id: 4,
    name: 'Sour Diesel',
    type: 'Sativa',
    thc: '20%',
    cbd: '0.3%',
    price: 14,
    popularity: 94,
    image: '/products/sour-diesel.jpg'
  },
  // Additional products
  {
    id: 5,
    name: 'Purple Haze',
    type: 'Sativa',
    thc: '19%',
    cbd: '0.4%',
    price: 13,
    popularity: 91,
    image: '/products/blue-dream.jpg'
  },
  {
    id: 6,
    name: 'OG Kush',
    type: 'Hybrid',
    thc: '21%',
    cbd: '0.6%',
    price: 15,
    popularity: 96,
    image: '/products/gsc.jpg'
  }
];

type ProductGridProps = {
  selectedType: string | null;
  sortBy: string;
};

export default function ProductGrid({ selectedType, sortBy }: ProductGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  // Initial animation on mount
  useEffect(() => {
    // Initialize GSAP
    initGSAP();
    
    const cards = cardsRef.current;
    
    gsap.fromTo(cards,
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  // Handle hover animations
  const handleMouseEnter = (card: HTMLDivElement) => {
    gsap.to(card, {
      scale: 1.03,
      duration: 0.2,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = (card: HTMLDivElement) => {
    gsap.to(card, {
      scale: 1,
      duration: 0.2,
      ease: "power2.out"
    });
  };

  const filteredAndSortedProducts = React.useMemo(() => {
    let filtered = products;
    
    if (selectedType && selectedType !== 'All') {
      filtered = filtered.filter(product => product.type === selectedType);
    }
    
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'thc':
          return parseInt(b.thc) - parseInt(a.thc);
        case 'popularity':
          return b.popularity - a.popularity;
        default:
          return 0;
      }
    });
  }, [selectedType, sortBy]);

  return (
    <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {filteredAndSortedProducts.map((product, index) => (
        <div
          key={product.id}
          ref={(el) => {
            if (el) cardsRef.current[index] = el;
          }}
          onMouseEnter={e => handleMouseEnter(e.currentTarget)}
          onMouseLeave={e => handleMouseLeave(e.currentTarget)}
          className="w-full max-w-[95%] sm:max-w-none mx-auto"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-3 sm:p-4 h-full transition-colors duration-300 hover:shadow-xl hover:shadow-[#0D0E0D]/20 hover:bg-white/10">
            <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-full"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <div className="text-right">
                  <span className="text-green-accent font-medium block">{product.thc} THC</span>
                  <span className="text-gray-400 text-sm">{product.cbd} CBD</span>
                </div>
              </div>
              
              <p className="text-gray-400">{product.type}</p>
              
              <div className="flex justify-between items-center pt-2">
                <span className="text-2xl font-bold">${product.price}/g</span>
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-accent rounded-full text-sm font-semibold hover:bg-opacity-90 transition-all hover:gap-3"
                >
                  Order Now
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.5 9L10 5.5 13.5 9H11v4H9V9H6.5zm11 6L14 18.5 10.5 15H13v-4h2v4h2.5z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 