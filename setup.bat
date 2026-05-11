@echo off
REM Finance Tracker - Quick Setup Script (Windows)
REM This script helps set up the MERN application

echo.
echo ^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*
echo Finance Tracker - Setup Script
echo ^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    exit /b 1
)

echo ✅ Node.js and npm are installed
for /f "tokens=*" %%i in ('node --version') do echo ✅ Node.js version: %%i
for /f "tokens=*" %%i in ('npm --version') do echo ✅ npm version: %%i

REM Setup Backend
echo.
echo 📦 Setting up Backend...
cd server
call npm install
if errorlevel 1 (
    echo ❌ Failed to install backend dependencies
    exit /b 1
)
echo ✅ Backend dependencies installed
cd..

REM Setup Frontend
echo.
echo 📦 Setting up Frontend...
cd client
call npm install
if errorlevel 1 (
    echo ❌ Failed to install frontend dependencies
    exit /b 1
)
echo ✅ Frontend dependencies installed
cd..

echo.
echo ^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*
echo ✅ Setup Complete!
echo ^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*
echo.
echo 📝 Next Steps:
echo 1. Configure .env file with your credentials
echo    - MongoDB URI
echo    - JWT Secret
echo    - Gmail credentials
echo.
echo 2. Start the backend (Command Prompt 1):
echo    cd server ^& npm run dev
echo.
echo 3. Start the frontend (Command Prompt 2):
echo    cd client ^& npm run dev
echo.
echo 4. Open browser: http://localhost:5173
echo.
echo 📚 For detailed setup: Read QUICKSTART.md
echo 📖 For full documentation: Read README.md
echo.
pause
