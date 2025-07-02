# External API Integrations

## TMview API

TMview is a trademark search platform that provides access to trademark data from multiple intellectual property offices worldwide.

### Authentication

To access the TMview API, you need to obtain API credentials from the TMview service. Once obtained, add them to your `.env` file:

```
TMVIEW_API_URL=https://api.tmview.org
TMVIEW_API_KEY=your_api_key_here
```

### Endpoints

#### Search Trademarks

```
GET /api/v1/search/tmview
```

Query parameters:
- `query`: The trademark text to search for
- `jurisdiction`: Optional. The jurisdiction code (country) to search in
- `nice_classes`: Optional. Comma-separated list of Nice classification classes

## EUIPO API

The European Union Intellectual Property Office (EUIPO) API provides access to EU trademark data.

### Authentication

To access the EUIPO API, you need to obtain API credentials from the EUIPO. Once obtained, add them to your `.env` file:

```
EUIPO_API_URL=https://api.euipo.europa.eu
EUIPO_API_KEY=your_api_key_here
```

### Endpoints

#### Search Trademarks

```
GET /api/v1/search/euipo
```

Query parameters:
- `query`: The trademark text to search for
- `nice_classes`: Optional. Comma-separated list of Nice classification classes

## WIPO/Madrid System API (Future Integration)

The World Intellectual Property Organization (WIPO) Madrid System allows for international trademark registration.

### Authentication

To access the WIPO API, you will need to obtain API credentials from WIPO. Once obtained, add them to your `.env` file:

```
WIPO_API_URL=https://api.wipo.int
WIPO_API_KEY=your_api_key_here
```

### Endpoints

This integration is planned for a future release.

## Stripe API

Stripe is used for payment processing within the application.

### Authentication

To use Stripe, you need to obtain API keys from your Stripe dashboard. Add them to your `.env` file:

```
STRIPE_API_KEY=sk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

### Endpoints

#### Create Payment Intent

```
POST /api/v1/payments/create-intent
```

#### Confirm Payment

```
POST /api/v1/payments/confirm/{payment_id}
```

## Memex MCP Server (Future Integration)

Memex MCP Server will be used for legal template management and document generation.

### Authentication

To access the Memex MCP Server, you will need to obtain API credentials. Once obtained, add them to your `.env` file:

```
MEMEX_MCP_URL=https://api.memex.com
MEMEX_MCP_API_KEY=your_api_key_here
```

### Endpoints

This integration is planned for a future release.