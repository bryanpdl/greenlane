#!/bin/bash

# Create directory if it doesn't exist
mkdir -p public/images

# Download placeholder QR codes
curl -o public/images/whatsapp-qr.png "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://wa.me/66123456789"
curl -o public/images/line-qr.png "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://line.me/ti/p/@greenlane"

echo "QR codes downloaded successfully!" 