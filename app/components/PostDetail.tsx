"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

type Comment = {
  id: string;
  userId: string;
  userName: string;
  userImage: string;
  content: string;
  timestamp: string;
  likes: number;
};

type PostDetailProps = {
  isOpen: boolean;
  onClose: () => void;
  post: {
    id: string;
    shopId: string;
    shopName: string;
    shopImage: string;
    content: string;
    images?: string[];
    likes: number;
    comments: number;
    timestamp: string;
    type: 'update' | 'promotion' | 'product';
    tags?: string[];
  };
};

// Mock comments data
const mockComments: Comment[] = [
  {
    id: '1',
    userId: 'user1',
    userName: 'John D.',
    userImage: '/images/avatar1.jpg',
    content: 'This strain sounds amazing! Cannot wait to try it out. 🔥',
    timestamp: '1 hour ago',
    likes: 5
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'Sarah M.',
    userImage: '/images/avatar2.jpg',
    content: 'Your shop always has the best selection! See you this weekend.',
    timestamp: '2 hours ago',
    likes: 3
  }
];

export default function PostDetail({ isOpen, onClose, post }: PostDetailProps) {
  const [comments, setComments] = useState(mockComments);
  const [newComment, setNewComment] = useState('');

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: String(Date.now()),
      userId: 'currentUser',
      userName: 'You',
      userImage: '/images/avatar3.jpg',
      content: newComment,
      timestamp: 'Just now',
      likes: 0
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-green-base w-full max-w-3xl h-[80vh] rounded-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-xl font-bold">Post Details</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                {/* Original Post */}
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-center space-x-3 mb-4">
                    <Link href={`/explore/${post.shopId}`}>
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img
                          src={post.shopImage}
                          alt={post.shopName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Link>
                    <div>
                      <Link href={`/explore/${post.shopId}`}>
                        <h3 className="font-semibold hover:text-green-accent">
                          {post.shopName}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-400">{post.timestamp}</p>
                    </div>
                  </div>

                  <p className="text-gray-200 whitespace-pre-line mb-4">{post.content}</p>

                  {post.images && post.images.length > 0 && (
                    <div className="mb-4">
                      <img
                        src={post.images[0]}
                        alt="Post content"
                        className="w-full rounded-xl"
                      />
                    </div>
                  )}

                  {post.tags && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map(tag => (
                        <span
                          key={tag}
                          className="text-green-accent text-sm hover:underline cursor-pointer"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 text-gray-300 hover:text-green-accent">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span>{post.likes}</span>
                    </button>
                    <div className="flex items-center gap-2 text-gray-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span>{comments.length} comments</span>
                    </div>
                  </div>
                </div>

                {/* Comments Section */}
                <div className="p-6 space-y-6">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                        <img
                          src={comment.userImage}
                          alt={comment.userName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="bg-white/5 rounded-xl p-3">
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-medium">{comment.userName}</span>
                            <span className="text-sm text-gray-400">{comment.timestamp}</span>
                          </div>
                          <p className="text-gray-200">{comment.content}</p>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <button className="text-gray-400 hover:text-green-accent">Like</button>
                          <button className="text-gray-400 hover:text-green-accent">Reply</button>
                          {comment.likes > 0 && (
                            <span className="text-gray-400">{comment.likes} likes</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comment Input */}
              <div className="p-4 border-t border-white/10">
                <form onSubmit={handleSubmitComment} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src="/images/avatar3.jpg"
                      alt="Your avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-1 bg-white/5 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-accent"
                  />
                  <button
                    type="submit"
                    disabled={!newComment.trim()}
                    className="px-4 py-2 bg-green-accent text-black rounded-full font-medium hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Post
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 