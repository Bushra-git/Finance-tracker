# 🚀 Deployment Guide

## Deployment Checklist

Before deploying to production, ensure:

- [ ] All environment variables are configured
- [ ] Database is set up on MongoDB Atlas
- [ ] Email service is properly configured
- [ ] JWT_SECRET is a strong, random string
- [ ] NODE_ENV is set to 'production'
- [ ] CORS is configured with production domain
- [ ] Frontend build is generated
- [ ] All tests pass

---

## 📋 Backend Deployment

### Option 1: Heroku (Recommended for beginners)

**Prerequisites:**

- Heroku account (https://www.heroku.com)
- Heroku CLI installed

**Steps:**

1. **Login to Heroku**

   ```bash
   heroku login
   ```

2. **Create Heroku App**

   ```bash
   cd server
   heroku create your-app-name
   ```

3. **Set Environment Variables**

   ```bash
   heroku config:set MONGO_URI=your_mongo_uri
   heroku config:set JWT_SECRET=your_secret
   heroku config:set EMAIL_USER=your_email
   heroku config:set EMAIL_PASS=your_app_password
   heroku config:set CLIENT_URL=https://your-frontend-url.com
   heroku config:set NODE_ENV=production
   ```

4. **Create Procfile**

   ```
   web: node server.js
   ```

5. **Deploy**

   ```bash
   git push heroku main
   ```

6. **Check Logs**
   ```bash
   heroku logs --tail
   ```

---

### Option 2: Render.com

**Prerequisites:**

- Render account (https://render.com)
- GitHub repository

**Steps:**

1. Push code to GitHub

2. Visit render.com and create new Web Service

3. Connect your GitHub repository

4. Configure:
   - Build Command: `npm install`
   - Start Command: `node server.js`

5. Add environment variables in Render dashboard

6. Deploy (automatic on push)

---

### Option 3: Railway.app

**Prerequisites:**

- Railway account (https://railway.app)
- GitHub repository

**Steps:**

1. Push code to GitHub

2. Create new project on Railway

3. Connect GitHub repository

4. Add environment variables

5. Deploy

---

## 🎨 Frontend Deployment

### Option 1: Vercel (Recommended)

**Prerequisites:**

- Vercel account (https://vercel.com)
- GitHub repository

**Steps:**

1. Push code to GitHub

2. Visit vercel.com and click "New Project"

3. Import your GitHub repository

4. Configure:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

5. Add environment variable:

   ```
   VITE_API_URL=https://your-backend-url.com/api
   ```

6. Deploy (automatic on push)

---

### Option 2: Netlify

**Prerequisites:**

- Netlify account (https://netlify.com)
- GitHub repository

**Steps:**

1. Connect GitHub repository

2. Configure build:
   - Build command: `npm run build`
   - Publish directory: `dist`

3. Add environment variables

4. Deploy

---

### Option 3: GitHub Pages

**Steps:**

1. Update `vite.config.js`:

   ```javascript
   export default defineConfig({
     base: "/finance-tracker/", // Replace with your repo name
     plugins: [react()],
   });
   ```

2. Build and push:

   ```bash
   npm run build
   git add dist
   git commit -m "Build"
   git push
   ```

3. Enable GitHub Pages in settings

---

## 🔧 Environment Variables for Production

### Backend (.env)

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/finance-tracker
JWT_SECRET=generate_strong_random_string_here
JWT_EXPIRES_IN=7d
EMAIL_USER=your_production_email@gmail.com
EMAIL_PASS=your_app_specific_password
CLIENT_URL=https://your-frontend-domain.com
PORT=5000
NODE_ENV=production
```

### Frontend (.env.production)

```
VITE_API_URL=https://your-backend-domain.com/api
```

---

## 🛡️ Security Checklist

### Before Production:

- [ ] JWT_SECRET is strong (use: `openssl rand -base64 32`)
- [ ] CORS is restricted to production domain only
- [ ] Environment variables are not in code
- [ ] Node environment is set to 'production'
- [ ] Error messages don't leak sensitive info
- [ ] All dependencies are up to date (`npm audit`)
- [ ] HTTPS is enforced
- [ ] MongoDB IP whitelist includes server IP
- [ ] Password reset tokens are secure

### Code Security:

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

---

## 📊 Database Migration

### MongoDB Atlas Setup:

1. Create cluster on MongoDB Atlas
2. Create database user with strong password
3. Whitelist your IP (and deployment server IP)
4. Copy connection string and update MONGO_URI
5. Test connection from your app

### Backup Strategy:

```bash
# Backup database
mongodump --uri="mongodb+srv://user:pass@cluster.mongodb.net/database"

# Restore database
mongorestore --uri="mongodb+srv://user:pass@cluster.mongodb.net" dump/
```

---

## 🚀 Continuous Deployment (CI/CD)

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
          heroku_app_name: "your-app-name"
          heroku_email: "your-email@example.com"
          appdir: "server"
```

---

## 🔍 Monitoring & Logging

### Heroku:

```bash
heroku logs --tail
```

### Render:

Check logs in dashboard

### Railway:

Check logs in dashboard

### Add Logging to App:

```javascript
import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});
```

---

## 📈 Performance Optimization

### Backend:

- Enable gzip compression
- Use caching for frequently accessed data
- Optimize database queries (add indexes)
- Use pagination for large datasets

### Frontend:

- Code splitting
- Lazy loading components
- Image optimization
- CSS/JS minification (automatic with Vite)

---

## 🆘 Troubleshooting Deployment

### Backend Won't Start:

1. Check logs for errors
2. Verify all environment variables
3. Check MongoDB connection
4. Ensure port is available

### Frontend Not Loading:

1. Check VITE_API_URL is correct
2. Verify CORS is configured
3. Check browser console for errors
4. Clear cache and rebuild

### API Connection Issues:

1. Verify backend URL is correct
2. Check CORS settings
3. Test API with cURL
4. Check network tab in DevTools

---

## 📞 Getting Help

1. Check deployment platform's documentation
2. Review error logs carefully
3. Test API with Postman/cURL
4. Check MongoDB Atlas status
5. Verify email service configuration

---

**Good Luck with Deployment! 🎉**
