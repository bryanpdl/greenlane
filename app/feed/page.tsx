"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Post, getPosts } from '../utils/firestore';
import { useAuth } from '../contexts/AuthContext';

export default function FeedPage() {
  const { isAdmin } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts
  const filteredPosts = posts.filter(post => {
    if (activeFilter === 'all') return true;
    return post.type === activeFilter;
  });

  const formatDate = (timestamp: any) => {
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="min-h-screen flex flex-col bg-green-base">
      <Header />
      
      <main className="flex-grow">
        {/* Feed Header */}
        <div className="bg-green-base/50 py-12">
          <div className="max-w-7xl mx-auto px-4 mt-12 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-4">
              Social Feed
            </h1>
            <p className="text-xl text-gray-300">
              Stay updated with the latest from cannabis businesses
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
                  All Posts
                </button>
                <button
                  onClick={() => setActiveFilter('update')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    activeFilter === 'update'
                      ? 'bg-green-accent text-black'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  Updates
                </button>
                <button
                  onClick={() => setActiveFilter('promotion')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    activeFilter === 'promotion'
                      ? 'bg-green-accent text-black'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  Promotions
                </button>
                <button
                  onClick={() => setActiveFilter('product')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    activeFilter === 'product'
                      ? 'bg-green-accent text-black'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  Products
                </button>
              </div>
              {isAdmin && (
                <button className="px-4 py-2 bg-green-accent text-black rounded-xl font-medium hover:bg-opacity-90 transition-colors">
                  Create Post
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="max-w-3xl mx-auto px-4 py-8">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="text-gray-300">Loading posts...</div>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 rounded-xl overflow-hidden"
                >
                  {/* Post Header */}
                  <div className="p-6 flex items-center space-x-4">
                    <img
                      src={post.shopImage}
                      alt={post.shopName}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-medium">{post.shopName}</h3>
                      <p className="text-sm text-gray-400">{formatDate(post.createdAt)}</p>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="px-6 pb-4">
                    <p className="text-gray-300 whitespace-pre-wrap">{post.content}</p>
                  </div>

                  {/* Post Images */}
                  {post.images && post.images.length > 0 && (
                    <div className="px-6 pb-4">
                      <div className="grid grid-cols-2 gap-2">
                        {post.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Post image ${index + 1}`}
                            className="rounded-lg w-full h-48 object-cover"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Post Footer */}
                  <div className="px-6 py-4 border-t border-white/10 flex justify-between items-center">
                    <div className="flex items-center space-x-6">
                      <button className="flex items-center space-x-2 text-gray-300 hover:text-white">
                        <span>♥</span>
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-2 text-gray-300 hover:text-white">
                        <span>💬</span>
                        <span>{post.comments}</span>
                      </button>
                    </div>
                    {post.tags && (
                      <div className="flex gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-sm text-gray-400"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
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