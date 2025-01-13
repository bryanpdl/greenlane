import { 
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
  DocumentData
} from 'firebase/firestore';
import { db } from './firebase';

// Types
export type Shop = {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  images: string[];
  video?: string;
  status: 'active' | 'inactive';
  lastUpdated: Timestamp;
  createdAt: Timestamp;
  // Additional fields from Google Places
  phoneNumber: string;
  website: string;
  rating: number;
  totalRatings: number;
  openingHours: string[];
};

export type Post = {
  id: string;
  shopId: string;
  shopName: string;
  shopImage: string;
  content: string;
  images: string[];
  likes: number;
  comments: number;
  type: 'update' | 'promotion' | 'product';
  tags?: string[];
  createdAt: Timestamp;
};

export type Deal = {
  id: string;
  shopId: string;
  shopName: string;
  location: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed' | 'bogo';
  discountValue: number;
  startDate: Timestamp;
  endDate: Timestamp;
  status: 'active' | 'expired' | 'upcoming';
  createdAt: Timestamp;
};

// Shops
export const getShops = async (): Promise<Shop[]> => {
  try {
    console.log('Starting getShops function...');
    const shopsRef = collection(db, 'shops');
    const q = query(shopsRef, orderBy('lastUpdated', 'desc'));
    const snapshot = await getDocs(q);
    
    // Check and migrate shops that don't have images array
    const updates = snapshot.docs.map(async (doc) => {
      const data = doc.data();
      if (!data.images) {
        console.log(`Migrating images for shop ${doc.id}`);
        const images = data.image ? [data.image] : [];
        await updateShopImages(doc.id, images);
        data.images = images; // Update local data as well
      }
    });
    
    // Wait for all migrations to complete
    await Promise.all(updates);
    
    console.log('Raw snapshot data:', snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    const shops = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      lastUpdated: doc.data().lastUpdated,
      createdAt: doc.data().createdAt,
      // Ensure images is always an array even if migration hasn't completed
      images: doc.data().images || [doc.data().image]
    })) as Shop[];
    console.log('Processed shops data:', shops);
    return shops;
  } catch (error) {
    console.error('Error fetching shops:', error);
    throw error;
  }
};

export const addShop = async (shopData: Omit<Shop, 'id' | 'lastUpdated' | 'createdAt'>): Promise<string> => {
  try {
    const shopsRef = collection(db, 'shops');
    const now = Timestamp.now();
    const docRef = await addDoc(shopsRef, {
      ...shopData,
      lastUpdated: now,
      createdAt: now
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding shop:', error);
    throw error;
  }
};

export const updateShop = async (shopId: string, shopData: Partial<Shop>): Promise<void> => {
  try {
    const shopRef = doc(db, 'shops', shopId);
    await updateDoc(shopRef, {
      ...shopData,
      lastUpdated: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating shop:', error);
    throw error;
  }
};

export const deleteShop = async (shopId: string): Promise<void> => {
  try {
    const shopRef = doc(db, 'shops', shopId);
    await deleteDoc(shopRef);
  } catch (error) {
    console.error('Error deleting shop:', error);
    throw error;
  }
};

// Posts
export const getPosts = async (): Promise<Post[]> => {
  try {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt
    })) as Post[];
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const addPost = async (postData: Omit<Post, 'id' | 'createdAt'>): Promise<string> => {
  try {
    const postsRef = collection(db, 'posts');
    const docRef = await addDoc(postsRef, {
      ...postData,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding post:', error);
    throw error;
  }
};

export const deletePost = async (postId: string): Promise<void> => {
  try {
    const postRef = doc(db, 'posts', postId);
    await deleteDoc(postRef);
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

// Deals
export const getDeals = async (): Promise<Deal[]> => {
  try {
    const dealsRef = collection(db, 'deals');
    const q = query(dealsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      startDate: doc.data().startDate,
      endDate: doc.data().endDate,
      createdAt: doc.data().createdAt
    })) as Deal[];
  } catch (error) {
    console.error('Error fetching deals:', error);
    throw error;
  }
};

export const addDeal = async (dealData: Omit<Deal, 'id' | 'createdAt'>): Promise<string> => {
  try {
    const dealsRef = collection(db, 'deals');
    const docRef = await addDoc(dealsRef, {
      ...dealData,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding deal:', error);
    throw error;
  }
};

export const updateDeal = async (dealId: string, dealData: Partial<Deal>): Promise<void> => {
  try {
    const dealRef = doc(db, 'deals', dealId);
    await updateDoc(dealRef, dealData);
  } catch (error) {
    console.error('Error updating deal:', error);
    throw error;
  }
};

export const deleteDeal = async (dealId: string): Promise<void> => {
  try {
    const dealRef = doc(db, 'deals', dealId);
    await deleteDoc(dealRef);
  } catch (error) {
    console.error('Error deleting deal:', error);
    throw error;
  }
};

// Get shop by ID
export const getShopById = async (shopId: string): Promise<Shop> => {
  try {
    console.log('Fetching shop with ID:', shopId); // Debug log
    const shopRef = doc(db, 'shops', shopId);
    const shopDoc = await getDoc(shopRef);
    
    if (!shopDoc.exists()) {
      throw new Error('Shop not found');
    }
    
    const data = shopDoc.data();
    console.log('Raw shop data:', data); // Debug log
    console.log('Shop images from Firestore:', data.images); // Debug log
    
    const shop = {
      id: shopDoc.id,
      ...data,
      lastUpdated: data.lastUpdated,
      createdAt: data.createdAt,
      // Ensure images is always an array
      images: Array.isArray(data.images) ? data.images : [data.image]
    } as Shop;
    
    console.log('Processed shop data:', shop); // Debug log
    return shop;
  } catch (error) {
    console.error('Error fetching shop:', error);
    throw error;
  }
};

// Update shop images
export const updateShopImages = async (shopId: string, images: string[]): Promise<void> => {
  try {
    const shopRef = doc(db, 'shops', shopId);
    await updateDoc(shopRef, {
      images,
      lastUpdated: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating shop images:', error);
    throw error;
  }
};

// Update all shops to include images array
export const migrateShopsImages = async (): Promise<void> => {
  try {
    const shopsRef = collection(db, 'shops');
    const snapshot = await getDocs(shopsRef);
    
    const updates = snapshot.docs.map(async (doc) => {
      const data = doc.data();
      // If images array doesn't exist, create it from the main image
      if (!data.images) {
        console.log(`Migrating images for shop ${doc.id}`);
        const images = data.image ? [data.image] : [];
        await updateShopImages(doc.id, images);
      }
    });
    
    await Promise.all(updates);
    console.log('Successfully migrated all shops to include images array');
  } catch (error) {
    console.error('Error migrating shops:', error);
    throw error;
  }
}; 