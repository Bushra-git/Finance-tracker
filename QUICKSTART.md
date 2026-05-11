# 🚀 Quick Start Guide

## 5-Minute Setup

### Step 1: Clone & Install

```bash
# Backend setup
cd server
npm install

# Frontend setup (new terminal)
cd client
npm install
```

### Step 2: Configure Environment

1. Get MongoDB URI from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get Gmail App Password:
   - Enable 2FA on your Google Account
   - Visit: https://myaccount.google.com/apppasswords
   - Generate app password for "Mail" and "Windows Computer"
3. Update `.env` in root directory:

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_app_password
CLIENT_URL=http://localhost:5173
PORT=5000
NODE_ENV=development
```

### Step 3: Run the Application

**Terminal 1 - Backend:**

```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**

```bash
cd client
npm run dev
```

### Step 4: Access the App

Open your browser and go to: **http://localhost:5173**

---

## 📋 Default Behavior

- Server runs on: **http://localhost:5000**
- Client runs on: **http://localhost:5173**
- API prefix: `/api`
- OTP valid for: **10 minutes**
- JWT expires in: **7 days**
- Transactions per page: **10**

## ✅ Verify Installation

1. ✓ Server health check: `http://localhost:5000/api/health` → Should return `{"message":"Server is running"}`
2. ✓ Frontend loads: `http://localhost:5173` → Should show login page
3. ✓ Email OTP works: Sign up and check your email for OTP

## 🔧 Troubleshooting

### MongoDB Connection Error

- Verify MONGO_URI is correct
- Check if MongoDB Atlas IP whitelist includes your IP
- Try with a test database first

### Email OTP Not Sending

- Verify EMAIL_USER and EMAIL_PASS in .env
- Check if Gmail app password is correctly set
- Enable "Less secure apps" (optional for some Gmail versions)
- Check server console for error messages

### CORS Error

- Verify CLIENT_URL in .env matches your frontend URL
- Restart the server after changing CORS settings

### Port Already in Use

- Change PORT in .env (for backend) or vite.config.js (for frontend)
- Or kill the process: `lsof -ti:5000 | xargs kill -9`

## 📚 Next Steps

1. Read [README.md](./README.md) for full documentation
2. Check API endpoints in the README
3. Explore the codebase structure
4. Customize styling in tailwind.config.js
5. Deploy to production (see README)

## 🎯 Key Features to Try

- **Sign Up**: Create account with email verification
- **Add Transactions**: Track income and expenses
- **Filter & Sort**: Advanced transaction filtering
- **Change Password**: Secure password change via OTP
- **Responsive Design**: Try on mobile devices

---

**Happy Coding! 🎉**
