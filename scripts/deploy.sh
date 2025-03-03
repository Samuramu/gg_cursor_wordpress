#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting deployment...${NC}"

# Build the React application
echo -e "${GREEN}Building React application...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}Build failed!${NC}"
    exit 1
fi

# Create directory on server if it doesn't exist
echo -e "${GREEN}Ensuring remote directory exists...${NC}"
ssh ubuntu@ggtude.com "mkdir -p /home/ubuntu/react-app/build"

# Deploy to EC2
echo -e "${GREEN}Deploying to EC2...${NC}"
scp -r build/* ubuntu@ggtude.com:/home/ubuntu/react-app/build/

if [ $? -ne 0 ]; then
    echo -e "${RED}Deployment failed!${NC}"
    exit 1
fi

# Deploy Apache configurations if they've changed
echo -e "${GREEN}Deploying Apache configurations...${NC}"
scp -r conf/apache/* ubuntu@ggtude.com:/home/ubuntu/react-app/conf/apache/
ssh ubuntu@ggtude.com "cd /home/ubuntu/react-app/conf/apache && chmod +x deploy-conf.sh && ./deploy-conf.sh"

echo -e "${GREEN}Deployment completed successfully!${NC}" 