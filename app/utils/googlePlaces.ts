import { Shop } from './firestore';
import { Timestamp } from 'firebase/firestore';

// Types
export type PlaceSearchResult = {
  placeId: string;
  name: string;
  formattedAddress: string;
  photos?: string[];
};

export type PlaceDetails = {
  name: string;
  formattedAddress: string;
  phoneNumber?: string;
  website?: string;
  rating?: number;
  userRatingsTotal?: number;
  photos: string[];
  openingHours?: {
    weekdayText: string[];
    periods: {
      open: { day: number; time: string };
      close: { day: number; time: string };
    }[];
  };
  reviews?: {
    authorName: string;
    rating: number;
    text: string;
    time: number;
  }[];
};

// Function to search for places by query
export const searchPlaces = async (query: string): Promise<PlaceSearchResult[]> => {
  try {
    const response = await fetch(`/api/places/search?query=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Failed to search places');
    return await response.json();
  } catch (error) {
    console.error('Error searching places:', error);
    throw error;
  }
};

// Function to get place details by placeId
export const getPlaceDetails = async (placeId: string): Promise<PlaceDetails> => {
  try {
    const response = await fetch(`/api/places/details?placeId=${encodeURIComponent(placeId)}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to get place details');
    }
    
    console.log('Place details response:', {
      success: response.ok,
      status: response.status,
      hasData: !!data,
      fields: data ? Object.keys(data) : []
    });
    
    return data;
  } catch (error) {
    console.error('Error getting place details:', error);
    throw error;
  }
};

// Function to convert Google Place details to Shop format
export const convertPlaceToShop = (placeDetails: PlaceDetails): Omit<Shop, 'id'> => {
  const now = Timestamp.now();
  
  // Get up to 6 images from the place details
  const images = placeDetails.photos?.slice(0, 6) || [];
  
  // If we have less than 2 images, use the main image twice
  if (images.length === 1) {
    images.push(images[0]);
  }
  
  return {
    name: placeDetails.name,
    location: placeDetails.formattedAddress,
    description: '', // This will be overwritten by the form input
    image: images[0] || '/images/mari.png',
    images: images.length > 0 ? images : ['/images/mari.png', '/images/mari.png'],
    status: 'inactive' as const,
    lastUpdated: now,
    createdAt: now,
    phoneNumber: placeDetails.phoneNumber || '',
    website: placeDetails.website || '',
    rating: placeDetails.rating || 0,
    totalRatings: placeDetails.userRatingsTotal || 0,
    openingHours: placeDetails.openingHours?.weekdayText || []
  };
}; 