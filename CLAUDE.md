# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a full-stack trademark registration system built with FastAPI (backend) and Next.js (frontend). It enables users to search for trademarks, submit applications, and manage their trademark portfolio across multiple jurisdictions including Greek National Office (OBI), EUIPO, and WIPO.

## Architecture

### Backend (FastAPI)
- **Location**: `/backend/`
- **Entry point**: `backend/app/main.py`
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Authentication**: JWT-based authentication
- **API**: RESTful API with automatic OpenAPI/Swagger documentation at `/docs`

**Key directories**:
- `app/api/endpoints/`: API route handlers (auth, trademarks, payments, search, users)
- `app/models/`: SQLAlchemy database models
- `app/schemas/`: Pydantic request/response schemas
- `app/services/`: Business logic and external API integrations
- `app/core/`: Core configuration and security

**External integrations**:
- TMview API for trademark search
- EUIPO API for EU trademark data
- WIPO API for international registration (future)
- Stripe for payment processing
- Memex MCP Server for legal templates (future)

### Frontend (Next.js)
- **Location**: `/frontend/`
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Entry point**: `frontend/src/app/layout.tsx`

**Key directories**:
- `src/app/`: Next.js app router pages
- `src/components/`: React components organized by feature
- `src/services/`: API client functions
- `src/types/`: TypeScript type definitions

## Development Commands

### Full Stack Development
```bash
# Start all services (recommended for development)
docker-compose up -d

# Stop all services
docker-compose down

# Setup from scratch
./scripts/setup.sh
```

### Backend Development
```bash
cd backend

# Run development server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Run database migrations
alembic -c database/migrations/alembic.ini upgrade head

# Run tests
pytest
```

### Frontend Development
```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```

## Database

- **Primary database**: PostgreSQL
- **Migration tool**: Alembic
- **Models**: User, Trademark, Payment, Document

Key models:
- `User`: Authentication and user profiles
- `Trademark`: Core trademark data with status tracking
- `Payment`: Stripe payment integration
- `Document`: File uploads and generated documents

## Key Features

### Trademark Search
- Integration with TMview API for multi-jurisdiction search
- Real-time availability scoring
- Nice classification system integration

### Application Process
1. Search and class selection with real-time fee calculation
2. Form completion with auto-population from user profile
3. Document upload and PDF preview
4. Payment processing with Stripe
5. E-signature capture
6. Status tracking and notifications

### External Services
- **TMview**: Trademark search across multiple jurisdictions
- **EUIPO**: EU trademark data
- **Stripe**: Payment processing
- **WIPO**: International registration (planned)
- **Memex MCP**: Legal templates (planned)

## Environment Variables

Backend requires:
- Database connection (PostgreSQL)
- JWT secret key
- Stripe API keys
- External API credentials (TMview, EUIPO, etc.)

Frontend requires:
- Next.js API URL configuration
- Stripe public key

## Testing

- Backend: pytest with async support
- Frontend: Use Next.js testing conventions
- Database: Test migrations with Alembic

## User Journeys

1. **Search → Select Classes**: Trademark search with real-time fee updates
2. **Application Drafting**: Multi-step form with auto-population
3. **Checkout & Signature**: Payment processing and e-signature
4. **Filing & Tracking**: Application submission and status monitoring
5. **Portfolio Management**: Trademark portfolio overview and renewal tracking

## API Documentation

Backend API documentation is automatically generated and available at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`
- OpenAPI spec: `http://localhost:8000/api/v1/openapi.json`

## Current Implementation Status

### ✅ Completed Features
- **Authentication System**: JWT-based auth with user registration/login
- **Database Models**: User, Trademark, Payment, Document models with relationships
- **Trademark Search**: Local database search and TMview API integration (mock)
- **CRUD Operations**: Full trademark management (create, read, update, delete)
- **API Endpoints**: RESTful endpoints for authentication, trademarks, and search

### 🔄 In Progress
- Frontend React components for authentication and search
- Stripe payment integration
- File upload handling for trademark images

### 📋 Next Steps
1. **Frontend Implementation**: Create React components for search and application forms
2. **Payment Integration**: Complete Stripe payment processing
3. **Real API Integration**: Connect to actual TMview, EUIPO, and WIPO APIs
4. **Document Management**: File upload and storage system
5. **Application Workflow**: Multi-step trademark application process

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login/access-token` - User login

### Trademarks
- `GET /api/v1/trademarks/` - List user's trademarks
- `POST /api/v1/trademarks/` - Create new trademark
- `GET /api/v1/trademarks/{id}` - Get trademark details
- `PUT /api/v1/trademarks/{id}` - Update trademark
- `DELETE /api/v1/trademarks/{id}` - Delete trademark

### Search
- `GET /api/v1/search/tmview` - Search TMview database
- `GET /api/v1/search/local` - Search local database
- `GET /api/v1/search/combined` - Combined search (local + TMview)

## Common Development Patterns

- Follow FastAPI conventions for backend development
- Use Pydantic schemas for request/response validation
- Implement proper error handling and logging
- Use TypeScript strictly in frontend development
- Follow Next.js App Router patterns
- Use Tailwind CSS for consistent styling
- All search operations return `TrademarkSearchResponse` schema
- CRUD operations use the base CRUD class pattern
- External API services are in `app/services/` directory