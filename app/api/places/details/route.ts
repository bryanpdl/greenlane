import { NextResponse } from 'next/server';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const PLACES_API_BASE_URL = 'https://maps.googleapis.com/maps/api/place';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const placeId = searchParams.get('placeId');

    if (!placeId) {
      return NextResponse.json({ error: 'Place ID is required' }, { status: 400 });
    }

    if (!GOOGLE_MAPS_API_KEY) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    // Request specific fields including videos
    const fields = [
      'name',
      'formatted_address',
      'formatted_phone_number',
      'website',
      'rating',
      'user_ratings_total',
      'photos',
      'opening_hours',
      'reviews'
    ].join(',');

    const url = `${PLACES_API_BASE_URL}/details/json?place_id=${placeId}&fields=${fields}&key=${GOOGLE_MAPS_API_KEY}`;
    console.log('Fetching place details from:', url.replace(GOOGLE_MAPS_API_KEY, 'REDACTED'));

    const response = await fetch(url);
    const data = await response.json();

    console.log('Google Places API response:', {
      status: data.status,
      errorMessage: data.error_message,
      hasResult: !!data.result,
      resultFields: data.result ? Object.keys(data.result) : []
    });

    if (data.status !== 'OK') {
      throw new Error(`Google Places API error: ${data.status} - ${data.error_message || 'Unknown error'}`);
    }

    // Transform the response to match our PlaceDetails type
    const placeDetails = {
      name: data.result.name,
      formattedAddress: data.result.formatted_address,
      phoneNumber: data.result.formatted_phone_number,
      website: data.result.website,
      rating: data.result.rating,
      userRatingsTotal: data.result.user_ratings_total,
      photos: data.result.photos?.map((photo: any) => 
        `${PLACES_API_BASE_URL}/photo?maxwidth=800&photo_reference=${photo.photo_reference}&key=${GOOGLE_MAPS_API_KEY}`
      ) || [],
      openingHours: data.result.opening_hours ? {
        weekdayText: data.result.opening_hours.weekday_text,
        periods: data.result.opening_hours.periods
      } : undefined,
      reviews: data.result.reviews?.map((review: any) => ({
        authorName: review.author_name,
        rating: review.rating,
        text: review.text,
        time: review.time
      }))
    };

    console.log('Transformed place details:', {
      ...placeDetails,
      photos: placeDetails.photos.length + ' photos'
    });

    return NextResponse.json(placeDetails);
  } catch (error) {
    console.error('Error in place details API:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to get place details' },
      { status: 500 }
    );
  }
} 