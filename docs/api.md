# Trademark Registration API Documentation

## Authentication

### Register a new user

```
POST /api/v1/auth/register
```

Request body:
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "full_name": "John Doe"
}
```

### Login

```
POST /api/v1/auth/login/access-token
```

Request body (form data):
```
username=user@example.com
password=securepassword
```

Response:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

## Trademarks

### List user's trademarks

```
GET /api/v1/trademarks/
```

Headers:
```
Authorization: Bearer {access_token}
```

### Create a new trademark

```
POST /api/v1/trademarks/
```

Headers:
```
Authorization: Bearer {access_token}
```

Request body:
```json
{
  "name": "Example Trademark",
  "description": "A description of the trademark",
  "type": "word",
  "jurisdiction": "US",
  "nice_classes": [9, 42],
  "goods_services": "Computer software; SaaS services"
}
```

### Get trademark details

```
GET /api/v1/trademarks/{id}
```

Headers:
```
Authorization: Bearer {access_token}
```

### Update a trademark

```
PUT /api/v1/trademarks/{id}
```

Headers:
```
Authorization: Bearer {access_token}
```

Request body:
```json
{
  "description": "Updated description",
  "nice_classes": [9, 35, 42]
}
```

## Payments

### Create payment intent

```
POST /api/v1/payments/create-intent
```

Headers:
```
Authorization: Bearer {access_token}
```

Request body:
```json
{
  "trademark_id": "tm-123456",
  "amount": 299.99,
  "currency": "usd",
  "type": "filing_fee",
  "description": "Filing fee for trademark application"
}
```

Response:
```json
{
  "client_secret": "pi_3NqF8J2eZvKYlo2C1gNWgQT3_secret_vMQGBQzTJZW2UQnJkTfNrIpLx",
  "payment_id": "pay-123456"
}
```

### Confirm payment

```
POST /api/v1/payments/confirm/{payment_id}
```

Headers:
```
Authorization: Bearer {access_token}
```

Request body:
```json
{
  "payment_method_id": "pm_1NqF8J2eZvKYlo2C1gNWgQT3"
}
```

## Trademark Search

### Search TMview database

```
GET /api/v1/search/tmview?query=example&jurisdiction=US&nice_classes=9,42
```

Headers:
```
Authorization: Bearer {access_token}
```

### Search EUIPO database

```
GET /api/v1/search/euipo?query=example&nice_classes=9,42
```

Headers:
```
Authorization: Bearer {access_token}
```

### Combined search

```
GET /api/v1/search/combined?query=example&jurisdiction=US&nice_classes=9,42
```

Headers:
```
Authorization: Bearer {access_token}
```