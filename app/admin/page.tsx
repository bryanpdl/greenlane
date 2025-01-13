'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import { Shop, getShops, updateShop, deleteShop } from '../utils/firestore';
import AddBusinessModal from '../components/AddBusinessModal';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AdminDashboard() {
  const router = useRouter();
  const { user, isAdmin } = useAuth();
  const [shops, setShops] = useState<Shop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin) {
      router.push('/');
    }
  }, [isAdmin, router]);

  // Fetch shops
  useEffect(() => {
    const fetchShops = async () => {
      try {
        const fetchedShops = await getShops();
        setShops(fetchedShops);
      } catch (error) {
        console.error('Error fetching shops:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShops();
  }, []);

  // Filter shops
  const filteredShops = shops.filter(shop => {
    const matchesSearch = shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || shop.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusToggle = async (shopId: string, newStatus: 'active' | 'inactive') => {
    try {
      await updateShop(shopId, { status: newStatus });
      setShops(shops.map(shop => 
        shop.id === shopId ? { ...shop, status: newStatus } : shop
      ));
    } catch (error) {
      console.error('Error updating shop status:', error);
    }
  };

  const handleDeleteShop = async (shopId: string) => {
    if (!window.confirm('Are you sure you want to delete this shop?')) return;

    try {
      await deleteShop(shopId);
      setShops(shops.filter(shop => shop.id !== shopId));
    } catch (error) {
      console.error('Error deleting shop:', error);
    }
  };

  const formatDate = (timestamp: any) => {
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-green-base">
      <Header />
      
      <main className="flex-grow">
        {/* Dashboard Header */}
        <div className="bg-green-base/50 py-12">
          <div className="max-w-7xl mx-auto px-4 mt-12 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-4">
              Admin Dashboard
            </h1>
            <p className="text-xl text-gray-300">
              Manage cannabis businesses and content
            </p>
          </div>
        </div>

        {/* Action Bar */}
        <div className="sticky top-16 z-40 bg-green-base/95 backdrop-blur-sm border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center gap-4">
              <div className="flex items-center gap-4 flex-grow">
                <input
                  type="text"
                  placeholder="Search businesses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full max-w-xs px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-accent focus:border-transparent"
                />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-accent focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2 bg-green-accent text-black rounded-xl font-medium hover:bg-opacity-90 transition-colors"
              >
                Add New Business
              </button>
            </div>
          </div>
        </div>

        {/* Businesses Table */}
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="text-gray-300">Loading businesses...</div>
            </div>
          ) : (
            <div className="bg-white/5 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Business</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Location</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Last Updated</th>
                    <th className="px-6 py-3 text-right text-sm font-medium text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredShops.map((shop) => (
                    <tr key={shop.id} className="border-b border-white/5 last:border-0">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={shop.image || '/images/mari.png'}
                            alt={shop.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div>
                            <div className="font-medium">{shop.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-300">{shop.location}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleStatusToggle(
                            shop.id,
                            shop.status === 'active' ? 'inactive' : 'active'
                          )}
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            shop.status === 'active'
                              ? 'bg-green-accent/10 text-green-accent'
                              : 'bg-gray-500/10 text-gray-500'
                          }`}
                        >
                          {shop.status.charAt(0).toUpperCase() + shop.status.slice(1)}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {formatDate(shop.lastUpdated)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDeleteShop(shop.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      <Footer />

      <AddBusinessModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={() => {
          // Refresh the shops list
          getShops().then(setShops);
        }}
      />
    </div>
  );
} 