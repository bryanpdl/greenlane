"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap, initGSAP } from '../utils/gsap';

type FilterHeaderProps = {
  selectedType: string | null;
  setSelectedType: (type: string | null) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
};

const types = ['All', 'Sativa', 'Indica', 'Hybrid'];
const sortOptions = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'price', label: 'Price: Low to High' },
  { value: 'thc', label: 'THC Level' }
];

export default function FilterHeader({ selectedType, setSelectedType, sortBy, setSortBy }: FilterHeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize GSAP
    initGSAP();
    
    // Fade in header on mount
    gsap.fromTo(headerRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );
  }, []);

  useEffect(() => {
    if (isDropdownOpen) {
      gsap.fromTo(dropdownRef.current,
        { 
          opacity: 0,
          y: -10,
          display: 'block'
        },
        { 
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        }
      );
    } else {
      gsap.to(dropdownRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          if (dropdownRef.current) {
            dropdownRef.current.style.display = 'none';
          }
        }
      });
    }
  }, [isDropdownOpen]);

  return (
    <div ref={headerRef} className="sticky top-0 mt-20 z-20 bg-green-base/95 backdrop-blur-sm py-4 mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type === 'All' ? null : type)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                (type === 'All' && selectedType === null) || type === selectedType
                  ? 'bg-green-accent text-white'
                  : 'bg-white/5 hover:bg-white/10 text-gray-300'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
            className="px-4 py-2 rounded-full text-sm font-medium bg-white/5 hover:bg-white/10 text-gray-300 transition-all inline-flex items-center gap-2"
          >
            <span>Sort by: {sortOptions.find(opt => opt.value === sortBy)?.label}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div
            ref={dropdownRef}
            style={{ display: 'none' }}
            className="absolute right-0 mt-2 w-48 rounded-xl bg-[#1a1a1a] shadow-lg py-2"
          >
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setSortBy(option.value);
                  setIsDropdownOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-white/5 transition-colors ${
                  sortBy === option.value ? 'text-green-accent' : 'text-gray-300'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 