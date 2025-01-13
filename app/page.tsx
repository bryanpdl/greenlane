import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedShops from './components/FeaturedProducts';
import HowItWorks from './components/HowItWorks';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-green-base">
      <Header />
      <Hero />
      <FeaturedShops />
      <HowItWorks />
      <Contact />
      <Footer />
    </main>
  );
}
