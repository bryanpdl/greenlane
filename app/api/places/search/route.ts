import { NextResponse } from 'next/server';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const PLACES_API_BASE_URL = 'https://maps.googleapis.com/maps/api/place';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query) {
      return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }

    if (!GOOGLE_MAPS_API_KEY) {
      return NextResponse.json({ error: 'Google Maps API key is not configured' }, { status: 500 });
    }

    // First, search for places
    const searchResponse = await fetch(
      `${PLACES_API_BASE_URL}/textsearch/json?query=${encodeURIComponent(query)}&key=${GOOGLE_MAPS_API_KEY}`
    );

    const searchData = await searchResponse.json();

    if (searchData.status !== 'OK') {
      throw new Error(`Google Places API error: ${searchData.status}`);
    }

    // Transform the response to match our PlaceSearchResult type
    const results = searchData.results.map((place: any) => ({
      placeId: place.place_id,
      name: place.name,
      formattedAddress: place.formatted_address,
      photos: place.photos?.map((photo: any) => 
        `${PLACES_API_BASE_URL}/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${GOOGLE_MAPS_API_KEY}`
      ),
    }));

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error in places search:', error);
    return NextResponse.json({ error: 'Failed to search places' }, { status: 500 });
  }
} 