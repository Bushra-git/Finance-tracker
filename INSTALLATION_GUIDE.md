# 📦 Installation & Configuration Guide

## System Requirements

- **Node.js**: v14.0.0 or higher
- **npm**: v6.0.0 or higher
- **MongoDB**: Atlas account (free tier available)
- **Gmail Account**: For email OTP functionality
- **Git**: For version control (optional)

---

## Step-by-Step Installation

### Step 1: Environment Setup

1. **Locate the .env file** in the root directory
2. **Get MongoDB URI**:
   - Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create free cluster
   - Get connection string
   - Update `MONGO_URI` in `.env`

3. **Setup Gmail for OTP**:
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Step Verification
   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Select Mail and Windows Computer
   - Copy generated password
   - Update `EMAIL_USER` and `EMAIL_PASS` in `.env`

4. **Generate JWT Secret**:

   ```bash
   # On Linux/Mac:
   openssl rand -base64 32

   # Or use any online generator and paste in JWT_SECRET
   ```

### Step 2: Backend Installation

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Verify installation
npm list

# Start development server
npm run dev

# Expected output:
# Server is running on port 5000
# MongoDB Connected: ...
```

### Step 3: Frontend Installation

```bash
# Navigate to client directory
cd ../client

# Install dependencies
npm install

# Verify installation
npm list

# Start development server
npm run dev

# Expected output:
# ➜  local:   http://localhost:5173/
```

### Step 4: Verification

#### Test Backend:

```bash
# Open new terminal and run:
curl http://localhost:5000/api/health

# Expected response:
# {"message":"Server is running"}
```

#### Test Frontend:

- Open browser: http://localhost:5173
- Should see login page

#### Test Email:

1. Sign up with your email
2. Check inbox for OTP
3. Verify OTP

---

## Configuration Details

### MongoDB URI Format

```
mongodb+srv://username:password@cluster-name.mongodb.net/database-name?retryWrites=true&w=majority
```

### JWT Secret Generation

**Option 1: Command Line**

```bash
# Linux/Mac
openssl rand -base64 32

# PowerShell (Windows)
[Convert]::ToBase64String((New-Object System.Security.Cryptography.RNGCryptoServiceProvider).GetBytes(24))
```

**Option 2: Online Generator**

- Visit: https://www.random.org/cgi-bin/randbytes?nbytes=32&format=h
- Copy the result
- Paste in `.env`

### Gmail App Password Setup

1. **Enable 2-Step Verification**:
   - Go to https://myaccount.google.com/security
   - Click "2-Step Verification"
   - Follow prompts

2. **Generate App Password**:
   - Go to https://myaccount.google.com/apppasswords
   - Select Mail
   - Select Windows Computer (or your device)
   - Click "Generate"
   - Copy 16-character password
   - Paste in `.env` as `EMAIL_PASS`

---

## Environment Variables Explanation

| Variable         | Description               | Example                                          |
| ---------------- | ------------------------- | ------------------------------------------------ |
| `MONGO_URI`      | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `JWT_SECRET`     | Secret for JWT signing    | Random 32-character string                       |
| `JWT_EXPIRES_IN` | Token expiration time     | `7d`, `24h`, `30d`                               |
| `EMAIL_USER`     | Sender email address      | `your-email@gmail.com`                           |
| `EMAIL_PASS`     | Gmail app password        | 16-character password                            |
| `CLIENT_URL`     | Frontend URL (for CORS)   | `http://localhost:5173`                          |
| `PORT`           | Backend server port       | `5000`                                           |
| `NODE_ENV`       | Environment type          | `development` or `production`                    |

---

## Common Installation Issues

### Issue 1: MongoDB Connection Error

**Error**: `MongoError: connect ENOTFOUND`

**Solutions**:

1. Check MONGO_URI is copied correctly
2. Verify IP whitelist: Go to MongoDB Atlas → Security → Network Access
3. Add your IP: Click "Add IP Address" → "Add Current IP Address"
4. Wait 1-2 minutes for changes to take effect
5. Test connection: `npm run dev`

---

### Issue 2: Email OTP Not Sending

**Error**: `Failed to send OTP` or no email received

**Solutions**:

1. Verify `EMAIL_USER` is your Gmail address
2. Check `EMAIL_PASS` is the 16-character app password (not your Google password)
3. Ensure 2-Step Verification is enabled
4. Check Gmail for "Less secure apps" is off (it should be)
5. Check server console for error details
6. Try a different email subject if custom

---

### Issue 3: Port Already in Use

**Error**: `EADDRINUSE: address already in use :::5000` or `:5173`

**Solutions**:

**Windows**:

```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F

# For port 5173
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

**Linux/Mac**:

```bash
# Find and kill process on port 5000
lsof -ti:5000 | xargs kill -9

# For port 5173
lsof -ti:5173 | xargs kill -9

# Or change port in vite.config.js or .env
```

---

### Issue 4: CORS Error

**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Solutions**:

1. Verify `CLIENT_URL` in `.env` is correct: `http://localhost:5173`
2. Check spelling and port number
3. Restart backend server: `npm run dev`
4. Check if frontend and backend are running
5. Clear browser cache: Ctrl+Shift+Delete

---

### Issue 5: Node Modules Error

**Error**: `Cannot find module 'express'` or similar

**Solutions**:

1. Delete `node_modules` folder
2. Delete `package-lock.json`
3. Run `npm install` again
4. Check internet connection
5. Try: `npm cache clean --force`

---

## Verification Checklist

After installation, verify:

- [ ] Backend running: http://localhost:5000/api/health
- [ ] Frontend running: http://localhost:5173
- [ ] MongoDB connection successful (check server logs)
- [ ] Email configuration working (test with sign up)
- [ ] Can sign up with OTP verification
- [ ] Can log in after verification
- [ ] Can add transactions
- [ ] Can filter transactions
- [ ] Can change password
- [ ] Can log out

---

## Development Tools

### Recommended VS Code Extensions

- **ES7+ React/Redux/React-Native snippets** - dsznajder.es7-react-js-snippets
- **Prettier** - esbenp.prettier-vscode
- **ESLint** - dbaeumer.vscode-eslint
- **MongoDB for VS Code** - mongodb.mongodb-vscode
- **Thunder Client** - rangav.vscode-thunder-client (API testing)
- **Tailwind CSS IntelliSense** - bradlc.vscode-tailwindcss

### API Testing Tools

- **Postman**: Desktop app for API testing
- **Thunder Client**: VS Code extension
- **cURL**: Command-line tool (built-in)

### Database Tools

- **MongoDB Compass**: GUI for MongoDB
- **MongoDB Atlas**: Web interface

---

## Development Workflow

### Starting New Development Session

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev

# Terminal 3 - (Optional) Database monitoring
mongodb-compass  # If installed

# Browser
Open http://localhost:5173
```

### Making Code Changes

- Backend changes auto-reload with nodemon
- Frontend changes hot-reload with Vite HMR
- Styles update instantly with Tailwind

### Testing Changes

1. **Backend**: Test with Postman/cURL
2. **Frontend**: Refresh browser (F5)
3. **API Integration**: Test in application

---

## Performance Tips

### Backend

- Use indexes for frequently queried fields
- Implement pagination for large datasets
- Cache frequently accessed data
- Monitor database performance

### Frontend

- Use React DevTools for performance profiling
- Check Chrome DevTools for bundle size
- Use code splitting for large routes
- Optimize images

---

## Debugging

### Backend Debugging

```bash
# Run with debug logs
DEBUG=* npm run dev

# Use console.log for debugging
console.log('User:', user);
```

### Frontend Debugging

1. Open DevTools: F12
2. Check Console for errors
3. Check Network tab for API responses
4. Use React DevTools extension

### API Debugging

```bash
# Test endpoint with cURL
curl -X GET http://localhost:5000/api/health

# Test with authorization
curl -X GET http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Data Reset

### Clear All Data

**MongoDB**:

```javascript
// Use MongoDB Compass or Atlas:
// 1. Select database
// 2. Select collection
// 3. Click Delete Collection
```

**Browser Storage**:

```javascript
// Browser console
localStorage.clear();
sessionStorage.clear();
```

---

## Next Steps After Installation

1. Read [README.md](./README.md) - Full documentation
2. Review [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - API reference
3. Check [BUILD_SUMMARY.md](./BUILD_SUMMARY.md) - What's included
4. When ready: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Deploy to production

---

## Getting Help

1. **Check Error Messages**: Read server console carefully
2. **Review Logs**: Look at both frontend and backend logs
3. **Test with cURL**: Verify API independently
4. **Check Documentation**: See API_DOCUMENTATION.md
5. **Review Code Comments**: Check inline code documentation

---

**Installation Complete! 🎉**

Now you're ready to use the Finance Tracker application.
