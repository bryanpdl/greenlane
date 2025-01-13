"use client";

import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductGrid from '../components/ProductGrid';
import FilterHeader from '../components/FilterHeader';
import MobileFilters from '../components/MobileFilters';

export default function ProductsPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('popularity');

  return (
    <div className="min-h-screen flex flex-col bg-green-base">
      <Header />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Desktop/Tablet Filters */}
          <div className="hidden sm:block">
            <FilterHeader
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </div>

          {/* Product Grid */}
          <div className="pb-24 sm:pb-0">
            <ProductGrid
              selectedType={selectedType}
              sortBy={sortBy}
            />
          </div>

          {/* Mobile Filters */}
          <div className="sm:hidden">
            <MobileFilters
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
