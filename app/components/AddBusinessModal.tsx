"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlaceSearchResult, PlaceDetails, searchPlaces, getPlaceDetails, convertPlaceToShop } from '../utils/googlePlaces';
import { addShop } from '../utils/firestore';

type AddBusinessModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function AddBusinessModal({ isOpen, onClose, onSuccess }: AddBusinessModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<PlaceSearchResult[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<PlaceDetails | null>(null);
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Reset all state
  const resetState = () => {
    setSearchQuery('');
    setSearchResults([]);
    setSelectedPlace(null);
    setDescription('');
    setError('');
  };

  // Handle modal close
  const handleClose = () => {
    resetState();
    onClose();
  };

  // Debounced search
  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const results = await searchPlaces(searchQuery);
        setSearchResults(results);
      } catch (error) {
        console.error('Error searching places:', error);
        setError('Failed to search places');
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handlePlaceSelect = async (placeId: string) => {
    setIsLoading(true);
    setError('');
    try {
      const details = await getPlaceDetails(placeId);
      setSelectedPlace(details);
      setSearchResults([]);
    } catch (error) {
      console.error('Error getting place details:', error);
      setError('Failed to get place details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedPlace) return;
    
    setIsLoading(true);
    setError('');
    try {
      const shopData = convertPlaceToShop(selectedPlace);
      // Add the description from the form
      const shopWithDescription = {
        ...shopData,
        description,
      };
      
      console.log('Adding shop with data:', shopWithDescription); // Debug log
      
      const shopId = await addShop(shopWithDescription);
      console.log('Successfully added shop with ID:', shopId); // Debug log
      
      onSuccess();
      handleClose();
    } catch (error) {
      console.error('Error adding shop:', error);
      setError(error instanceof Error ? error.message : 'Failed to add business');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-2xl bg-green-base p-6 rounded-2xl shadow-xl max-h-[90vh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-6">Add New Business</h2>

            {/* Search Input */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search for a business..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-accent focus:border-transparent"
              />

              {/* Search Results - Now Scrollable */}
              {searchResults.length > 0 && (
                <div className="mt-2 bg-white/5 border border-white/10 rounded-xl overflow-hidden max-h-60">
                  <div className="overflow-y-auto max-h-60 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent hover:scrollbar-thumb-white/20">
                    {searchResults.map((result) => (
                      <button
                        key={result.placeId}
                        onClick={() => handlePlaceSelect(result.placeId)}
                        className="w-full px-4 py-3 text-left hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                      >
                        <div className="font-medium">{result.name}</div>
                        <div className="text-sm text-gray-400">{result.formattedAddress}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Selected Place Details - Now Scrollable */}
            <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent hover:scrollbar-thumb-white/20">
              {selectedPlace && (
                <div className="mt-6 space-y-4">
                  <h3 className="text-lg font-semibold">Selected Business</h3>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-medium">{selectedPlace.name}</h4>
                    <p className="text-sm text-gray-300">{selectedPlace.formattedAddress}</p>
                    
                    {/* Image Preview */}
                    {selectedPlace && (
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">Images</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          {selectedPlace.photos?.map((photo, index) => (
                            <div key={index} className="relative aspect-w-16 aspect-h-9">
                              <img
                                src={photo}
                                alt={`${selectedPlace.name} - Photo ${index + 1}`}
                                className="object-cover rounded-lg"
                              />
                            </div>
                          ))}
                        </div>
                        {selectedPlace.photos?.length === 1 && (
                          <p className="mt-2 text-yellow-500">
                            Only one image available. It will be duplicated to meet the minimum requirement.
                          </p>
                        )}
                        {(!selectedPlace.photos || selectedPlace.photos.length === 0) && (
                          <p className="mt-2 text-yellow-500">
                            No images available. Default placeholder images will be used.
                          </p>
                        )}
                      </div>
                    )}

                    {/* Description Input */}
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2">
                        Description
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 bg-white/5 rounded-lg border border-white/10 focus:border-green-accent focus:ring-1 focus:ring-green-accent"
                        rows={4}
                        placeholder="Enter business description..."
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {error && (
              <div className="mt-4 text-red-500 text-sm">
                {error}
              </div>
            )}

            {/* Footer Actions - Fixed at Bottom */}
            <div className="mt-6 flex justify-end gap-4 pt-4 border-t border-white/10">
              <button
                onClick={handleClose}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!selectedPlace || !description || isLoading}
                className="px-4 py-2 bg-green-accent text-black rounded-xl font-medium hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Adding...' : 'Add Business'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 