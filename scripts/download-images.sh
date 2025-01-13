#!/bin/bash

# Create directories if they don't exist
mkdir -p public/products
mkdir -p public/images

# Download hero background image
curl -o public/hero-bg.jpg "https://images.unsplash.com/photo-1536819114556-1c7b419a1902?q=80&w=2000"

# Download product images
curl -o public/products/blue-dream.jpg "https://images.unsplash.com/photo-1603034203013-d532350372c6?q=80&w=800"
curl -o public/products/gsc.jpg "https://images.unsplash.com/photo-1603033172872-c2525115c7b9?q=80&w=800"
curl -o public/products/northern-lights.jpg "https://images.unsplash.com/photo-1603033421050-49cc1913d4bb?q=80&w=800"
curl -o public/products/sour-diesel.jpg "https://images.unsplash.com/photo-1603033017563-cc1f61ac5697?q=80&w=800"

echo "Images downloaded successfully!" 