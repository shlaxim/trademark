#!/bin/bash

# Exit on error
set -e

echo "Setting up Trademark Registration System..."

# Create environment files from examples if they don't exist
if [ ! -f backend/.env ]; then
  echo "Creating backend .env file from example..."
  cp backend/.env.example backend/.env
fi

if [ ! -f frontend/.env ]; then
  echo "Creating frontend .env file from example..."
  cp frontend/.env.example frontend/.env
fi

# Start Docker services
echo "Starting Docker services..."
docker-compose up -d

# Wait for database to be ready
echo "Waiting for database to be ready..."
sleep 5

# Run database migrations
echo "Running database migrations..."
docker-compose exec backend alembic -c /app/migrations/alembic.ini upgrade head

echo "Setup complete! The application is now running at:"
echo "- Frontend: http://localhost:3000"
echo "- Backend API: http://localhost:8000"
echo "- API Documentation: http://localhost:8000/docs"

echo "To stop the application, run: docker-compose down"