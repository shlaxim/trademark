# Trademark Registration System

A full-stack web application for trademark registration and management, providing a streamlined process for searching, filing, and monitoring trademark applications across multiple jurisdictions including Greek National Office (OBI), EUIPO, and WIPO (Madrid System).

## Key Features

### Eligibility & Form Mapping
- **Greek National Office (OBI)**: Standard national application (Form TM-1)
- **EUIPO**: CTM/EU mark application (Form MM1), class selection per Nice Classification
- **WIPO (Madrid System)**: International application (MM2) routed via OBI as Office of Origin

### Search & Clearance
- Integration with **TMview API** (covers EU, GR, WIPO) for preliminary availability checks
- "Similarity Report" (descriptive + phonetic) to reduce rejection risk
- Comprehensive trademark search across multiple jurisdictions

### Document & Evidence Collection
- Structured intake forms for:
  - Applicant data (natural/legal person; address; nationality)
  - Representation details (power of attorney upload)
  - Mark files (image or word mark; vector/logo support)
  - Goods & services (by class + sub-class selectors)

### Fee Calculation & Payment
- Dynamic fee engine:
  - Greek flat fees per class (OBI schedule)
  - EUIPO basic fee + €50/class
  - WIPO basic fee + per-designated-office surcharges
- Stripe integration for card and bank-transfer payments

### Attorney Review & E-Signature
- On-screen summary PDF for client approval
- e-Signature capture (DocuSign or equivalent)
- Audit trail of changes and timestamps

## Architecture Overview

### Frontend
- **Technology**: Next.js with React and TypeScript
- **UI Framework**: Tailwind CSS
- **Form Handling**: Formik or React Hook Form for validation
- **Features**:
  - Responsive UI for desktop and mobile
  - User authentication and profile management
  - Trademark search interface
  - Application submission forms
  - Payment processing with Stripe
  - Dashboard for monitoring application status
  - Document management and PDF preview

### Backend
- **Technology**: FastAPI with Python
- **Features**:
  - RESTful API endpoints
  - JWT authentication and authorization
  - Integration with trademark databases (TMview, EUIPO, OBI)
  - WIPO/Madrid Protocol support
  - Document generation and management
  - Payment processing with Stripe
  - Future integration with Memex MCP server for legal templates

### Database
- **Technology**: PostgreSQL
- **Migration Tool**: Alembic
- **Schema**:
  - Users and authentication
  - Trademark applications
  - Payments and invoices
  - Documents and templates
  - Application status tracking

### Storage
- PostgreSQL for structured data
- S3 (or equivalent) for uploaded files and documents

### Security
- OAuth 2.0 or JWT authentication
- TLS encryption
- GDPR-compliant data processing
- Secure storage of sensitive information

### Infrastructure
- **Containerization**: Docker with docker-compose for local development
- **CI/CD**: GitHub Actions for testing and deployment
- **Deployment Options**: 
  - Vercel (frontend)
  - DigitalOcean/AWS (backend + DB)

## Key User Journeys

### Search → Select Classes
- Type mark name or upload logo → instant availability score
- Select desired classes with real-time fee update

### Application Drafting
- Auto-populate form fields from user profile
- Preview PDF at each step; "back" edits

### Checkout & Signature
- Show detailed fee breakdown
- Secure payment page + immediate confirmation email

### Filing & Tracking
- Backend agent submits via API or robotic submission
- Poll office status (using APIs or headless scraping)
- Push status updates to user dashboard and email

## External Integrations

### Trademark Databases
- **TMview**: For searching existing trademarks across multiple jurisdictions
- **EUIPO**: For European Union trademark data
- **OBI**: Greek National Office for trademark registration
- **WIPO/Madrid System**: For international registration system

### Payment Processing
- **Stripe**: For secure payment processing and invoice management

### Legal Document Generation
- **Memex MCP Server**: Future integration for legal template management and document generation
- **DocuSign**: For e-signature capabilities

## Project Structure

```
trademark/
├── frontend/                # Next.js frontend application
│   ├── public/              # Static assets
│   ├── src/                 # Source code
│   │   ├── app/             # Next.js app directory
│   │   ├── components/      # React components
│   │   │   ├── auth/        # Authentication components
│   │   │   ├── dashboard/   # Dashboard components
│   │   │   ├── forms/       # Form components
│   │   │   ├── search/      # Search components
│   │   │   ├── payment/     # Payment components
│   │   │   └── shared/      # Shared components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utility functions
│   │   ├── services/        # API service functions
│   │   └── types/           # TypeScript type definitions
│   ├── .env.example         # Example environment variables
│   └── ...                  # Configuration files
│
├── backend/                 # FastAPI backend application
│   ├── app/                 # Application code
│   │   ├── api/             # API endpoints
│   │   ├── core/            # Core functionality
│   │   ├── db/              # Database
│   │   ├── models/          # Database models
│   │   ├── schemas/         # Pydantic schemas
│   │   ├── services/        # Business logic
│   │   │   ├── tmview_service.py    # TMview API integration
│   │   │   ├── euipo_service.py     # EUIPO API integration
│   │   │   ├── obi_service.py       # Greek OBI integration
│   │   │   ├── wipo_service.py      # WIPO/Madrid integration
│   │   │   ├── stripe_service.py    # Payment processing
│   │   │   └── ...                  # Other services
│   │   └── main.py          # Application entry point
│   └── ...                  # Configuration files
│
├── database/                # Database migrations
├── infrastructure/          # Infrastructure configuration
├── scripts/                 # Utility scripts
├── docs/                    # Documentation
└── ...                      # Root configuration files
```

## Getting Started

### Prerequisites
- Docker and docker-compose
- Node.js (for local frontend development)
- Python 3.9+ (for local backend development)
- PostgreSQL (for local database development without Docker)

### Development Setup
1. Clone the repository
2. Run `docker-compose up` to start all services
3. Access the frontend at http://localhost:3000
4. Access the API documentation at http://localhost:8000/docs

### Environment Variables
See `.env.example` files in both frontend and backend directories for required environment variables.

## Project Roadmap

### Phase 1: Core Functionality
- User authentication and profile management
- Basic trademark search functionality
- Simple application submission process
- Database schema and migrations

### Phase 2: Enhanced Features
- Integration with TMview and EUIPO APIs
- Stripe payment processing
- Document generation and management
- Application status tracking

### Phase 3: Advanced Features
- WIPO/Madrid Protocol support
- Integration with Memex MCP server for legal templates
- Advanced search and analytics
- Multi-language support

## License
[MIT License](LICENSE)