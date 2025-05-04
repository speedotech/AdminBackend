# Speedoloan NestJS

## Setup

1. Copy `.env.example` to `.env` and fill in your DB credentials.
2. Install dependencies:
   npm install
3. Run the app:
   npm run start:dev

## Endpoints

- GET    /api/leads
- GET    /api/leads/:id
- POST   /api/leads
- PUT    /api/leads/:id
- DELETE /api/leads/:id
- PATCH  /api/leads/:id/status

Supports pagination and filtering by status/source. 