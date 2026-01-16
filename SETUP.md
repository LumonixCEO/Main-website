# Quick Setup Guide

Follow these steps to get your project running locally.

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (or use SQLite for quick testing)
- Git

## Step 1: Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd "Design System SaaS Landing Page"

# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

## Step 2: Database Setup

### Option A: PostgreSQL (Recommended for Production)

1. Install PostgreSQL: https://www.postgresql.org/download/
2. Create a database:
   ```sql
   CREATE DATABASE lumonix_labs;
   ```
3. Update `server/.env` with your database URL:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/lumonix_labs?schema=public"
   ```

### Option B: SQLite (Quick Testing)

1. Update `server/.env`:
   ```
   DATABASE_URL="file:./dev.db"
   ```
2. Update `server/prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "sqlite"
     url      = env("DATABASE_URL")
   }
   ```

## Step 3: Configure Environment Variables

### Frontend

```bash
cp .env.example .env
```

Edit `.env`:
```
VITE_API_URL=http://localhost:5000/api
```

### Backend

```bash
cd server
cp .env.example .env
```

Edit `server/.env` with your settings:
- `DATABASE_URL` (from Step 2)
- `FRONTEND_URL=http://localhost:3000`
- `SMTP_*` (optional, for email functionality)

## Step 4: Initialize Database

```bash
cd server

# Generate Prisma Client
npm run db:generate

# Create database tables
npm run db:push

# (Optional) Seed database
npm run db:seed
```

## Step 5: Start Development Servers

### Terminal 1 - Backend
```bash
cd server
npm run dev
```
Backend runs on: http://localhost:5000

### Terminal 2 - Frontend
```bash
npm run dev
```
Frontend runs on: http://localhost:3000

## Step 6: Verify Everything Works

1. Open http://localhost:3000
2. Try subscribing to the newsletter (footer)
3. Try submitting the contact form
4. Try creating a support ticket

Check backend logs to see API requests being processed.

## Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running: `pg_isready`
- Check database URL in `.env`
- Ensure database exists

### Port Already in Use
- Change `PORT` in `server/.env` (backend)
- Change `port` in `vite.config.ts` (frontend)

### CORS Errors
- Ensure `FRONTEND_URL` in backend `.env` matches frontend URL
- Check browser console for specific errors

### Prisma Issues
```bash
cd server
npm run db:generate
npm run db:push
```

## Next Steps

- Read [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment
- Check [server/README.md](./server/README.md) for API documentation
- Review [README.md](./README.md) for project overview

