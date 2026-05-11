# 📚 Finance Tracker API Documentation

## Base URL

```
http://localhost:5000/api
```

## Authentication

JWT token should be sent in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

Token is also stored in localStorage on the client side.

---

## 🔐 Authentication Endpoints

### 1. Register User

```
POST /auth/register
```

**Request Body:**

```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response (201 Created):**

```json
{
  "message": "User registered. OTP sent to email.",
  "userId": "user_id_here"
}
```

**Errors:**

- 400: Missing required fields
- 409: Email already in use

---

### 2. Verify OTP

```
POST /auth/verify-otp
```

**Request Body:**

```json
{
  "userId": "user_id_from_register",
  "otp": "123456"
}
```

**Response (200 OK):**

```json
{
  "message": "User verified successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

**Errors:**

- 400: Invalid or expired OTP
- 404: User not found

---

### 3. Login

```
POST /auth/login
```

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response (200 OK):**

```json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

**Errors:**

- 400: Missing email or password
- 401: Invalid credentials
- 403: User not verified

---

### 4. Forgot Password

```
POST /auth/forgot-password
```

**Request Body:**

```json
{
  "email": "john@example.com"
}
```

**Response (200 OK):**

```json
{
  "message": "OTP sent to email",
  "userId": "user_id_here"
}
```

**Errors:**

- 400: Email is required
- 404: User not found

---

### 5. Reset Password

```
POST /auth/reset-password
```

**Request Body:**

```json
{
  "userId": "user_id_from_forgot_password",
  "otp": "123456",
  "newPassword": "newpassword123"
}
```

**Response (200 OK):**

```json
{
  "message": "Password reset successfully"
}
```

**Errors:**

- 400: Invalid or expired OTP
- 404: User not found

---

## 💰 Transaction Endpoints

**All transaction endpoints require authentication (Bearer token)**

### 1. Get Transactions

```
GET /transactions?type=income&sort=newest&page=1&limit=10&fromDate=2024-01-01&toDate=2024-12-31&minAmount=100&maxAmount=1000
```

**Query Parameters:**

- `type` (string): "all", "income", or "expense" (default: all)
- `sort` (string): "newest", "oldest", "amount-high", "amount-low" (default: newest)
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `fromDate` (string): ISO date format (YYYY-MM-DD)
- `toDate` (string): ISO date format (YYYY-MM-DD)
- `minAmount` (number): Minimum amount filter
- `maxAmount` (number): Maximum amount filter

**Response (200 OK):**

```json
{
  "success": true,
  "transactions": [
    {
      "_id": "transaction_id",
      "userId": "user_id",
      "type": "income",
      "description": "Salary",
      "amount": 50000,
      "date": "2024-01-15T10:30:00Z",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 25,
    "page": 1,
    "pages": 3,
    "limit": 10
  },
  "summary": {
    "totalIncome": 150000,
    "totalExpense": 45000,
    "netBalance": 105000
  }
}
```

---

### 2. Create Transaction

```
POST /transactions
```

**Request Body:**

```json
{
  "type": "income",
  "description": "Freelance project",
  "amount": 5000
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Transaction created successfully",
  "transaction": {
    "_id": "transaction_id",
    "userId": "user_id",
    "type": "income",
    "description": "Freelance project",
    "amount": 5000,
    "date": "2024-01-20T15:45:00Z",
    "createdAt": "2024-01-20T15:45:00Z"
  }
}
```

**Errors:**

- 400: Missing required fields or invalid type
- 401: Not authenticated

---

### 3. Delete Transaction

```
DELETE /transactions/:id
```

**URL Parameters:**

- `id` (string): Transaction ID

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Transaction deleted successfully"
}
```

**Errors:**

- 401: Not authenticated
- 403: Unauthorized (not transaction owner)
- 404: Transaction not found

---

## 👤 User Endpoints

**All user endpoints require authentication (Bearer token)**

### 1. Get Profile

```
GET /users/profile
```

**Response (200 OK):**

```json
{
  "success": true,
  "user": {
    "_id": "user_id",
    "username": "johndoe",
    "email": "john@example.com",
    "isVerified": true,
    "createdAt": "2024-01-10T08:00:00Z"
  }
}
```

**Errors:**

- 401: Not authenticated
- 404: User not found

---

### 2. Send OTP for Password Change

```
POST /users/send-otp
```

**Request Body:** (empty)

**Response (200 OK):**

```json
{
  "success": true,
  "message": "OTP sent to email"
}
```

**Errors:**

- 401: Not authenticated
- 404: User not found

---

### 3. Change Password

```
PATCH /users/change-password
```

**Request Body:**

```json
{
  "otp": "123456",
  "newPassword": "newpassword123"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

**Errors:**

- 400: Invalid or expired OTP
- 401: Not authenticated
- 404: User not found

---

## 🔍 Common Query Examples

### Get all income transactions

```
GET /transactions?type=income&sort=newest
```

### Get expenses from a specific month

```
GET /transactions?type=expense&fromDate=2024-01-01&toDate=2024-01-31
```

### Get high-value transactions

```
GET /transactions?minAmount=10000&sort=amount-high
```

### Get transactions with pagination

```
GET /transactions?page=2&limit=5
```

---

## ⚠️ Error Responses

All errors follow this format:

```json
{
  "message": "Error description",
  "success": false
}
```

### Common HTTP Status Codes

- **200**: Success
- **201**: Created
- **400**: Bad Request (validation error)
- **401**: Unauthorized (missing/invalid token)
- **403**: Forbidden (insufficient permissions)
- **404**: Not Found
- **409**: Conflict (e.g., email already exists)
- **500**: Internal Server Error

---

## 🔐 Security Notes

1. **JWT Tokens**: Store securely, preferably in httpOnly cookies
2. **OTP**: Valid for 10 minutes only
3. **Password**: Minimum 6 characters, hashed with bcryptjs
4. **CORS**: Restricted to CLIENT_URL from environment
5. **Input Validation**: All inputs validated server-side

---

## 📝 Rate Limiting

Currently not implemented. Consider adding:

- Login attempts limiting
- OTP generation limiting
- API call rate limiting

---

## 🧪 Testing with cURL

### Register

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Create Transaction (with token)

```bash
curl -X POST http://localhost:5000/api/transactions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "type": "income",
    "description": "Test transaction",
    "amount": 1000
  }'
```

---

## 📞 Support

For issues or questions, check:

1. README.md - General documentation
2. QUICKSTART.md - Setup guide
3. Server console - Error messages
4. Network tab (DevTools) - API responses

---

**Last Updated**: 2024
