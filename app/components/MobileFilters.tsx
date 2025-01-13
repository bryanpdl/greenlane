"use client";

import React, { useState, useEffect, useRef } from 'react';
import { gsap, initGSAP } from '../utils/gsap';

type MobileFiltersProps = {
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

export default function MobileFilters({ selectedType, setSelectedType, sortBy, setSortBy }: MobileFiltersProps) {
  const [isOpen, setIsOpen] = useState<'filter' | 'sort' | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize GSAP
    initGSAP();
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Animate overlay
      gsap.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );

      // Animate panel
      gsap.fromTo(panelRef.current,
        { y: '100%' },
        { 
          y: 0, 
          duration: 0.5, 
          ease: "power2.out"
        }
      );
    } else {
      // Animate out
      const timeline = gsap.timeline();
      
      timeline
        .to(panelRef.current, {
          y: '100%',
          duration: 0.4,
          ease: "power2.inOut"
        })
        .to(overlayRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut"
        }, "-=0.2");
    }
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          ref={overlayRef}
          onClick={() => setIsOpen(null)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 sm:hidden"
        />
      )}

      {/* Filter/Sort Panels */}
      {isOpen && (
        <div
          ref={panelRef}
          className="fixed bottom-[72px] left-4 right-4 bg-[#1a1a1a] rounded-2xl p-4 z-50 sm:hidden"
        >
          {isOpen === 'filter' ? (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold mb-4">Filter by Type</h3>
              <div className="flex flex-wrap gap-2">
                {types.map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setSelectedType(type === 'All' ? null : type);
                      setIsOpen(null);
                    }}
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
            </div>
          ) : (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold mb-4">Sort by</h3>
              <div className="space-y-2">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value);
                      setIsOpen(null);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-colors ${
                      sortBy === option.value
                        ? 'bg-green-accent text-white'
                        : 'bg-white/5 hover:bg-white/10 text-gray-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Sticky Bottom Buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-green-base/95 backdrop-blur-sm border-t border-white/10 sm:hidden z-40">
        <div className="flex gap-4">
          <button
            onClick={() => setIsOpen(isOpen === 'filter' ? null : 'filter')}
            className={`flex-1 px-4 py-3 rounded-full text-sm font-medium transition-all ${
              isOpen === 'filter'
                ? 'bg-green-accent text-white'
                : 'bg-white/5 hover:bg-white/10 text-gray-300'
            }`}
          >
            Filter
          </button>
          <button
            onClick={() => setIsOpen(isOpen === 'sort' ? null : 'sort')}
            className={`flex-1 px-4 py-3 rounded-full text-sm font-medium transition-all ${
              isOpen === 'sort'
                ? 'bg-green-accent text-white'
                : 'bg-white/5 hover:bg-white/10 text-gray-300'
            }`}
          >
            Sort
          </button>
        </div>
      </div>
    </>
  );
} 