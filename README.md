# Finance Tracker - MERN Stack Application

A production-ready Finance Tracker web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and styled with Tailwind CSS.

##  Features

- **User Authentication**: JWT-based authentication with email verification via OTP
- **Transaction Management**: Add, view, filter, sort, and delete income/expense transactions
- **Financial Summary**: Real-time calculations of total income, expenses, and net balance
- **Advanced Filtering**: Filter by type, date range, and amount range with server-side pagination
- **User Profile**: View profile information and change password securely
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Toast Notifications**: Real-time feedback for user actions
- **Protected Routes**: Secure authentication with route protection
- **OTP Verification**: Secure OTP-based email verification for registration and password reset

## 📁 Project Structure

```
Finance_Mern/
├── server/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   ├── transactionController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── authMiddleware.js    # JWT verification
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   └── Transaction.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── transactionRoutes.js
│   │   └── userRoutes.js
│   ├── utils/
│   │   ├── generateToken.js
│   │   └── sendEmail.js         # Nodemailer OTP
│   ├── server.js                # Express app entry
│   └── package.json
├── client/
│   ├── src/
│   │   ├── api/
│   │   │   └── index.js         # Axios instance & API calls
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── TransactionForm.jsx
│   │   │   ├── TransactionList.jsx
│   │   │   ├── OTPModal.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx  # Auth state management
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Signin.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── ForgotPassword.jsx
│   │   ├── App.jsx              # React Router setup
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
├── .env                         # Environment variables
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v14+)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- Gmail account with app password (for email OTP)

### Backend Setup

1. **Navigate to server directory**

   ```bash
   cd server
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Update the `.env` file in the root directory with:
     - `MONGO_URI`: Your MongoDB connection string
     - `JWT_SECRET`: A secure secret key for JWT signing
     - `EMAIL_USER`: Your Gmail address
     - `EMAIL_PASS`: Your Gmail app password
     - `CLIENT_URL`: http://localhost:5173 (for development)

4. **Start the server**
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to client directory**

   ```bash
   cd client
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The client will run on `http://localhost:5173`

### Access the Application

- Open your browser and navigate to `http://localhost:5173`
- Sign up with a new account (you'll receive an OTP via email)
- Verify your email and start tracking your finances!

##  Authentication Flow

### Registration

1. User enters username, email, password
2. OTP is sent to the registered email (valid for 10 minutes)
3. User verifies OTP to activate the account
4. JWT token is issued upon successful verification

### Login

1. User enters email and password
2. System verifies credentials
3. JWT token is issued for authenticated sessions

### Forgot Password

1. User enters email
2. OTP is sent to the email
3. User verifies OTP and sets new password
4. User can then log in with new password

## Transaction Management

### Features

- **Add Transactions**: Create income or expense transactions with description and amount
- **Filter Transactions**:
  - By type (All, Income, Expense)
  - By date range (from/to dates)
  - By amount range (min/max)
- **Sort Transactions**:
  - Newest first (default)
  - Oldest first
  - Amount high to low
  - Amount low to high
- **Pagination**: View 10 transactions per page with navigation controls
- **Delete Transactions**: Remove unwanted transactions with confirmation
- **Financial Summary**: Real-time totals for income, expenses, and net balance

##  UI/UX Design

- **Color Scheme**:
  - Navy background (#0f172a)
  - Emerald for income (#10b981)
  - Rose for expenses (#f43f5e)
  - Slate for neutral elements
- **Components**:
  - Responsive navbar with user menu
  - Card-based layout with shadows and transitions
  - Modal dialogs for OTP and password changes
  - Toast notifications for feedback
  - Loading spinners for async operations
  - Inline form validation

##  API Endpoints

### Authentication Routes (`/api/auth`)

- `POST /register` - Register new user and send OTP
- `POST /verify-otp` - Verify OTP and activate user
- `POST /login` - Login user and return JWT
- `POST /forgot-password` - Send OTP for password reset
- `POST /reset-password` - Reset password with OTP verification

### Transaction Routes (`/api/transactions`) - Protected

- `GET /` - Get transactions with filters, sorting, pagination
- `POST /` - Create new transaction
- `DELETE /:id` - Delete transaction

### User Routes (`/api/users`) - Protected

- `GET /profile` - Get user profile
- `POST /send-otp` - Send OTP for password change
- `PATCH /change-password` - Change password with OTP verification

##  Required Environment Variables

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/finance-tracker
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
CLIENT_URL=http://localhost:5173
PORT=5000
NODE_ENV=development
```

##  Production Deployment

1. **Build the frontend**

   ```bash
   cd client
   npm run build
   ```

2. **Environment Setup**
   - Update `.env` with production values
   - Use secure JWT_SECRET (generate with: `openssl rand -base64 32`)
   - Use MongoDB Atlas for database
   - Set `CLIENT_URL` to your production domain

3. **Server Deployment** (Example: Heroku, Render, Railway)

   ```bash
   # Add Procfile in server directory:
   web: node server.js
   ```

4. **Frontend Deployment** (Example: Vercel, Netlify)
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`

##  Security Features

- JWT-based authentication with httpOnly cookies (optional)
- Password hashing with bcryptjs (10 salt rounds)
- OTP verification for sensitive operations
- Protected API routes with middleware
- CORS configuration
- Input validation on backend
- Secure cookie handling

##  Dependencies

### Backend

- express: Web framework
- mongoose: MongoDB ODM
- bcryptjs: Password hashing
- jsonwebtoken: JWT authentication
- nodemailer: Email OTP sending
- cors: Cross-origin requests
- dotenv: Environment variables

### Frontend

- react: UI library
- react-dom: DOM rendering
- react-router-dom: Client-side routing
- axios: HTTP client
- react-hot-toast: Toast notifications
- tailwindcss: Utility-first CSS

##  Notes

- OTP is valid for 10 minutes
- Transactions are paginated with 10 items per page
- JWT tokens expire in 7 days (configurable)
- All amounts support up to 2 decimal places
- Dates are stored and displayed in ISO 8601 format

# Contributing

Feel free to submit issues and pull requests to improve the application.

 License

MIT License

