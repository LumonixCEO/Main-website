# Pre-Deployment Checklist

Before hosting your website publicly, complete these steps:

## ✅ Critical Steps (Required)

### 1. Deploy Backend First ⚠️
**IMPORTANT**: Your frontend forms (newsletter, contact, support) won't work without a deployed backend!

**Options:**
- **Railway** (Recommended - easiest): https://railway.app
- **Render**: https://render.com  
- **Heroku**: https://heroku.com
- **Vercel**: https://vercel.com

**Steps:**
1. Sign up for a hosting service
2. Create a new project/service
3. Connect your GitHub repository
4. Set root directory to `server/`
5. Add PostgreSQL database
6. Set environment variables (see below)
7. Deploy

**Backend Environment Variables:**
```
DATABASE_URL=<provided-by-hosting-service>
NODE_ENV=production
FRONTEND_URL=https://yourusername.github.io/your-repo-name
SMTP_HOST=smtp.gmail.com (optional)
SMTP_USER=your-email@gmail.com (optional)
SMTP_PASS=your-app-password (optional)
JWT_SECRET=<generate-random-string>
```

### 2. Set Up Database
After backend is deployed:
```bash
# SSH into your server or use hosting platform's terminal
cd server
npm run db:push
```

### 3. Configure GitHub Secrets
1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Add secret: `VITE_API_URL`
4. Value: `https://your-backend-url.com/api` (from step 1)

### 4. Update Backend CORS
Make sure your backend `.env` has:
```
FRONTEND_URL=https://yourusername.github.io/your-repo-name
```
Or if using custom domain:
```
FRONTEND_URL=https://yourdomain.com
```

### 5. Test Backend Health
Visit: `https://your-backend-url.com/api/health`
Should return: `{"success": true, "message": "Server is healthy", ...}`

## ✅ Optional Steps (Recommended)

### 6. Email Configuration
Set up email service for notifications:
- **Gmail**: Enable 2FA, create App Password
- **SendGrid**: Free tier available
- **Mailgun**: Free tier available

### 7. Custom Domain (Optional)
- Add `CNAME` file to `public/` folder
- Configure DNS with your domain provider
- Update `FRONTEND_URL` in backend

### 8. SSL/HTTPS
- GitHub Pages: Automatic HTTPS ✅
- Backend hosting: Usually automatic ✅
- Verify both URLs use `https://`

## 🚀 Deployment Steps

### Frontend (GitHub Pages)
1. Push code to GitHub
2. Go to repository Settings → Pages
3. Source: Select "GitHub Actions"
4. Push to `main` branch
5. Wait for deployment (check Actions tab)
6. Site will be live at: `https://yourusername.github.io/repo-name`

### Backend
1. Deploy using your chosen platform
2. Set environment variables
3. Run database migrations
4. Verify health endpoint works
5. Test API endpoints

## 🧪 Testing Checklist

After deployment, test:

- [ ] Frontend loads correctly
- [ ] Newsletter subscription form works
- [ ] Contact form submits successfully
- [ ] Support ticket creation works
- [ ] No CORS errors in browser console
- [ ] Backend health check returns success
- [ ] Email notifications work (if configured)
- [ ] All pages load correctly
- [ ] Mobile responsive design works

## ⚠️ Common Issues

### Forms Not Working
- **Cause**: Backend not deployed or wrong API URL
- **Fix**: Deploy backend, set `VITE_API_URL` secret

### CORS Errors
- **Cause**: Backend `FRONTEND_URL` doesn't match frontend URL
- **Fix**: Update backend `.env` with correct frontend URL

### Database Errors
- **Cause**: Migrations not run
- **Fix**: Run `npm run db:push` on backend

### 404 on Page Refresh
- **Cause**: GitHub Pages routing issue
- **Fix**: Ensure `base` in `vite.config.ts` matches your repo path

## 📝 Quick Reference

**Frontend URL**: `https://yourusername.github.io/repo-name`  
**Backend URL**: `https://your-backend.railway.app` (or your hosting service)  
**API URL**: `https://your-backend.railway.app/api`  
**Health Check**: `https://your-backend.railway.app/api/health`

## ✅ Ready to Deploy?

Once you've completed:
- ✅ Backend deployed and healthy
- ✅ Database set up
- ✅ GitHub secret `VITE_API_URL` configured
- ✅ Backend CORS configured

You're ready! Push to GitHub and your site will deploy automatically.

