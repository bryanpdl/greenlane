"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type CreatePostProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (post: {
    content: string;
    type: 'update' | 'promotion' | 'product';
    images?: File[];
    tags: string[];
  }) => void;
};

export default function CreatePost({ isOpen, onClose, onSubmit }: CreatePostProps) {
  const [content, setContent] = useState('');
  const [postType, setPostType] = useState<'update' | 'promotion' | 'product'>('update');
  const [images, setImages] = useState<File[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      content,
      type: postType,
      images,
      tags
    });
    resetForm();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const resetForm = () => {
    setContent('');
    setPostType('update');
    setImages([]);
    setTags([]);
    setTagInput('');
    onClose();
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
            className="bg-green-base w-full max-w-2xl rounded-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 border-b border-white/10">
              <h2 className="text-2xl font-bold">Create Post</h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Post Type Selection */}
              <div className="flex gap-2">
                {(['update', 'promotion', 'product'] as const).map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setPostType(type)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      postType === type
                        ? 'bg-green-accent text-black'
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>

              {/* Content Input */}
              <div>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What's new with your business?"
                  className="w-full h-32 px-4 py-3 bg-white/5 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-green-accent"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Add Images
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="block w-full text-sm text-gray-300
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-medium
                    file:bg-white/10 file:text-white
                    hover:file:bg-white/20
                    file:cursor-pointer"
                />
                {images.length > 0 && (
                  <div className="mt-2 text-sm text-gray-400">
                    {images.length} image(s) selected
                  </div>
                )}
              </div>

              {/* Tags Input */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Add Tags
                </label>
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagInput}
                  placeholder="Type and press Enter to add tags"
                  className="w-full px-4 py-2 bg-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-accent"
                />
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-sm bg-white/10 rounded-full flex items-center gap-1"
                      >
                        #{tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="hover:text-red-400"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!content.trim()}
                  className="px-6 py-2 bg-green-accent text-black rounded-xl font-medium hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Post
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 