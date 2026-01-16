# Design System SaaS Landing Page

This is a code bundle for Design System SaaS Landing Page. The original project is available at https://www.figma.com/design/bg1d6Mp38Yy7YrZYd2gkIo/Design-System-SaaS-Landing-Page.

## Project Structure

```
├── src/                    # Frontend React application
│   ├── components/         # React components
│   ├── pages/              # Page components
│   ├── services/           # API service layer
│   └── contexts/           # React contexts
├── server/                 # Backend API server
│   ├── src/                # Backend source code
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic services
│   │   └── middleware/     # Express middleware
│   └── prisma/             # Database schema
└── .github/workflows/      # GitHub Actions workflows
```

## Features

- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Email**: Nodemailer integration
- **Deployment**: GitHub Pages (frontend) + Railway/Render (backend)

## Quick Start

### Frontend Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env and set VITE_API_URL=http://localhost:5000/api
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:3000`

### Backend Development

1. **Navigate to server directory**:
   ```bash
   cd server
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your database URL and other settings
   ```

4. **Set up database**:
   ```bash
   npm run db:generate
   npm run db:push
   ```

5. **Start development server**:
   ```bash
   npm run dev
   ```

The backend API will be available at `http://localhost:5000`

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to GitHub Pages

1. Push your code to GitHub
2. Enable GitHub Pages in repository settings
3. Set `VITE_API_URL` secret in GitHub Actions secrets (optional)
4. Push to `main` branch - deployment happens automatically!

### Backend Deployment Options

- **Railway** (Recommended): Easy PostgreSQL + Node.js deployment
- **Render**: Free tier available
- **Heroku**: Traditional PaaS option
- **Vercel**: Serverless deployment

## API Endpoints

- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `POST /api/contact/submit` - Submit contact form
- `POST /api/support/submit` - Create support ticket
- `GET /api/health` - Health check

See [server/README.md](./server/README.md) for complete API documentation.

## Environment Variables

### Frontend
- `VITE_API_URL` - Backend API URL (default: `http://localhost:5000/api`)

### Backend
See [server/.env.example](./server/.env.example) for all backend environment variables.

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Radix UI Components
- Sonner (Toast notifications)

### Backend
- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- Nodemailer
- Zod (Validation)
- Helmet (Security)
- CORS

## License

ISC
