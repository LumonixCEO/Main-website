# Deployment Guide

This guide covers deploying both the frontend (to GitHub Pages) and backend (to a hosting service).

## Frontend Deployment (GitHub Pages)

### Prerequisites
- GitHub account
- Repository on GitHub

### Steps

1. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "GitHub Actions" as the source

2. **Set Environment Variable** (Optional):
   - Go to repository Settings → Secrets and variables → Actions
   - Add a new secret: `VITE_API_URL` with your backend API URL
   - Example: `https://your-backend.railway.app/api`

3. **Push to Main Branch**:
   ```bash
   git add .
   git commit -m "Setup deployment"
   git push origin main
   ```

4. **Monitor Deployment**:
   - Go to the "Actions" tab in your repository
   - Watch the deployment workflow run
   - Once complete, your site will be live at: `https://yourusername.github.io/repository-name/`

### Custom Domain (Optional)
- Add a `CNAME` file to the `public` folder with your domain name
- Configure DNS settings with your domain provider

## Backend Deployment

The backend needs to be deployed separately. Here are options:

### Option 1: Railway (Recommended)

1. **Sign up**: Go to [railway.app](https://railway.app)
2. **Create Project**: Click "New Project"
3. **Deploy from GitHub**: Connect your repository and select the `server` folder
4. **Add PostgreSQL**: Click "New" → "Database" → "PostgreSQL"
5. **Set Environment Variables**:
   - `DATABASE_URL` (automatically set by Railway)
   - `NODE_ENV=production`
   - `PORT` (automatically set)
   - `FRONTEND_URL` (your GitHub Pages URL)
   - `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` (for email)
   - `JWT_SECRET` (generate a random string)
6. **Deploy**: Railway will automatically deploy on push

### Option 2: Render

1. **Sign up**: Go to [render.com](https://render.com)
2. **Create Web Service**: Connect your GitHub repository
3. **Settings**:
   - Root Directory: `server`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
4. **Add PostgreSQL Database**: Create a new PostgreSQL database
5. **Set Environment Variables**: Same as Railway
6. **Deploy**: Render will deploy automatically

### Option 3: Heroku

1. **Install Heroku CLI**: [heroku.com](https://devcenter.heroku.com/articles/heroku-cli)
2. **Login**: `heroku login`
3. **Create App**: `heroku create your-app-name`
4. **Add PostgreSQL**: `heroku addons:create heroku-postgresql:hobby-dev`
5. **Set Environment Variables**:
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set FRONTEND_URL=https://yourusername.github.io/repository-name
   heroku config:set SMTP_HOST=smtp.gmail.com
   heroku config:set SMTP_USER=your-email@gmail.com
   heroku config:set SMTP_PASS=your-app-password
   heroku config:set JWT_SECRET=your-secret-key
   ```
6. **Deploy**: `git push heroku main`

### Option 4: Vercel (Serverless)

1. **Sign up**: Go to [vercel.com](https://vercel.com)
2. **Import Project**: Connect your GitHub repository
3. **Configure**:
   - Root Directory: `server`
   - Framework Preset: Other
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. **Add Environment Variables**: Same as above
5. **Deploy**: Vercel will deploy automatically

## Database Setup

After deploying the backend:

1. **Run Migrations**:
   ```bash
   # SSH into your server or use Railway/Render CLI
   npm run db:push
   # Or for production migrations:
   npm run db:migrate
   ```

2. **Verify Connection**: Check the `/api/health` endpoint

## Email Configuration

### Gmail Setup
1. Enable 2-Factor Authentication
2. Generate App Password: [Google Account Settings](https://myaccount.google.com/apppasswords)
3. Use the app password in `SMTP_PASS`

### Other Providers
- **SendGrid**: Use SMTP settings from SendGrid dashboard
- **Mailgun**: Use SMTP settings from Mailgun dashboard
- **AWS SES**: Use AWS SES SMTP credentials

## Environment Variables Summary

### Frontend (.env)
```
VITE_API_URL=https://your-backend-url.com/api
```

### Backend (.env)
```
PORT=5000
NODE_ENV=production
DATABASE_URL=postgresql://...
FRONTEND_URL=https://yourusername.github.io/repository-name
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@lumonixlabsai.com
JWT_SECRET=your-secret-key
```

## Post-Deployment Checklist

- [ ] Frontend deployed and accessible
- [ ] Backend deployed and accessible
- [ ] Database migrations run successfully
- [ ] Health check endpoint working (`/api/health`)
- [ ] CORS configured correctly
- [ ] Environment variables set
- [ ] Email service configured (optional)
- [ ] Test newsletter subscription
- [ ] Test contact form
- [ ] Test support ticket creation

## Troubleshooting

### Frontend Issues
- **404 on refresh**: Ensure `base` in `vite.config.ts` matches your GitHub Pages path
- **API calls failing**: Check `VITE_API_URL` is set correctly
- **CORS errors**: Verify `FRONTEND_URL` in backend matches frontend URL

### Backend Issues
- **Database connection**: Verify `DATABASE_URL` is correct
- **Port issues**: Most platforms set `PORT` automatically
- **Build failures**: Check Node.js version (18+ required)

## Support

For issues or questions, check:
- Backend logs in your hosting platform
- GitHub Actions logs for frontend deployment
- Browser console for frontend errors

