#!/bin/bash

# Finance Tracker - Quick Setup Script
# This script helps set up the MERN application

echo "🚀 Finance Tracker - Setup Script"
echo "=================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"

# Setup Backend
echo ""
echo "📦 Setting up Backend..."
cd server
npm install
echo "✅ Backend dependencies installed"

# Setup Frontend
echo ""
echo "📦 Setting up Frontend..."
cd ../client
npm install
echo "✅ Frontend dependencies installed"

# Return to root
cd ..

echo ""
echo "=================================="
echo "✅ Setup Complete!"
echo "=================================="
echo ""
echo "📝 Next Steps:"
echo "1. Configure .env file with your credentials"
echo "   - MongoDB URI"
echo "   - JWT Secret"
echo "   - Gmail credentials"
echo ""
echo "2. Start the backend (Terminal 1):"
echo "   cd server && npm run dev"
echo ""
echo "3. Start the frontend (Terminal 2):"
echo "   cd client && npm run dev"
echo ""
echo "4. Open browser: http://localhost:5173"
echo ""
echo "📚 For detailed setup: Read QUICKSTART.md"
echo "📖 For full documentation: Read README.md"
