#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting development setup...${NC}"

# Check if we need to do a fresh install
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Fresh install needed. Installing dependencies...${NC}"
    npm install
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}Failed to install dependencies!${NC}"
        exit 1
    fi
fi

# Create necessary directories if they don't exist
echo -e "${GREEN}Creating project structure...${NC}"
mkdir -p src/types src/api src/pages conf/apache

# Check if .env.development exists
if [ ! -f ".env.development" ]; then
    echo -e "${YELLOW}Creating .env.development...${NC}"
    echo "REACT_APP_API_URL=https://ggtude.com/wp-json/wp/v2" > .env.development
fi

# Start development server
echo -e "${GREEN}Starting development server...${NC}"
echo -e "${YELLOW}The app will be available at http://localhost:3000/app${NC}"
npm start 