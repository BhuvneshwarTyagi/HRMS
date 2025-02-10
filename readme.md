# HRMS (Human Resource Management System)

## Overview
HRMS is a comprehensive Human Resource Management System designed to streamline HR operations, employee management, and organizational workflows. The system provides a robust platform for managing employee data, attendance, leave management, and payroll processing.

## Key Features

### 1. User Management
- **Employee Profiles**
  - Complete employee information management
  - Personal details, contact information
  - Document management (Aadhaar, PAN, etc.)
  - Profile picture management
  - Bank account details
  - Emergency contact information

- **Role-based Access Control**
  - HR administrative access
  - Employee self-service portal
  - Secure authentication system

### 2. Attendance Management
- **Check-in/Check-out System**
  - Daily attendance tracking
  - Time logging
  - Attendance history
  - Real-time attendance status

### 3. Leave Management
- **Leave Application System**
  - Multiple leave types support
  - Leave request submission
  - Leave approval/rejection workflow
  - Leave balance tracking
  - Leave history

- **Leave Administration**
  - HR leave approval dashboard
  - Leave status monitoring
  - Bulk leave management
  - Leave policy enforcement

### 4. Payroll Management
- **Salary Processing**
  - Monthly salary calculation
  - Basic salary management
  - Attendance-based salary computation
  - Payroll generation

- **Payroll Reports**
  - PDF salary slip generation
  - Monthly payroll reports
  - Individual salary history
  - Payroll analytics

## Technical Architecture

### Backend (Node.js)
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **API Structure**: RESTful architecture

### Frontend (React + Vite)
- **Framework**: React.js
- **Build Tool**: Vite
- **State Management**: [Your state management solution]
- **UI Components**: [Your UI library]

## Database Schema Overview

### Employee Collection
```javascript
{
  name: String,
  contact: String,
  email: String,
  aadhaar: String,
  pan: String,
  bank_details: String,
  emergency_contact: String,
  address: String,
  profile_picture: String,
  isHR: Boolean
}
```

### Attendance Collection
```javascript
{
  employeeId: ObjectId,
  checkInTime: Date,
  checkOutTime: Date,
  date: Date
}
```

### Leave Collection
```javascript
{
  employeeId: ObjectId,
  startDate: Date,
  endDate: Date,
  reason: String,
  type: String,
  status: String,
  applyOn: Date
}
```

### Payroll Collection
```javascript
{
  employeeId: ObjectId,
  baseSalary: Number,
  totalDays: Number,
  month: String,
  netSalary: Number
}
```

## API Structure

### Authentication APIs
- Login endpoint
- Signup endpoint
- Token validation

### Employee Management APIs
- CRUD operations for employee data
- Profile management
- User search and filtering

### Attendance APIs
- Check-in/Check-out endpoints
- Attendance record retrieval
- Attendance reports

### Leave Management APIs
- Leave application
- Leave approval/rejection
- Leave status tracking

### Payroll APIs
- Salary calculation
- Payroll generation
- PDF slip generation

## Security Features
- JWT-based authentication
- Password encryption
- Role-based access control
- API rate limiting
- Input validation and sanitization

## Future Enhancements
1. Advanced Analytics Dashboard
2. Performance Management Module
3. Document Management System
4. Training and Development Module
5. Recruitment Module
6. Employee Self-Service Portal
7. Mobile Application
8. Integration with Biometric Systems

## Installation and Local Setup

### Backend (Node.js API)

1. Clone the repository
```bash
git clone https://github.com/BhuvneshwarTyagi/HRMS.git
cd HRMS/backend
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
# Using npm
npm start

The API server will start running on `http://localhost:8000`

### Frontend (React + Vite)

1. Navigate to the frontend directory
```bash
cd HRMS/frontend
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The frontend development server will start running on `http://localhost:5173`

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (local or Atlas connection)

### Available Scripts

Backend:
```bash
npm start        # Start development server
```

Frontend:
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### System Requirements

- **Operating System**: Windows 10+, macOS, or Linux
- **Memory**: At least 4GB RAM
- **Disk Space**: At least 1GB free space
- **Node.js**: v14.x or higher
- **npm**: v6.x or higher
- **MongoDB**: v4.x or higher

### Troubleshooting

If you encounter any issues:

1. **Port Already in Use**
   ```bash
   # For backend
   lsof -i :8000    # Check what's using port 8000
   kill -9 <PID>    # Kill the process

   # For frontend
   lsof -i :5173    # Check what's using port 5173
   kill -9 <PID>    # Kill the process
   ```

2. **Node Modules Issues**
   ```bash
   # Remove node_modules and reinstall
   rm -rf node_modules
   npm install
   ```

### Development Notes

- The backend API must be running for the frontend to function properly
- Make sure MongoDB is running if using local database
- For development, both frontend and backend servers should run simultaneously
- CORS is enabled for development environment
- API endpoints are prefixed with `/api` in production

### Additional Configuration

Backend:
```javascript
// cors configuration (if needed)
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
```

Frontend (vite.config.js):
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:8000'
    }
  }
})
```

### Production Build

1. Build the frontend
```bash
cd frontend
npm run build
```

2. Prepare backend for production
```bash
cd backend
npm install --production
```

3. Set production environment variables accordingly

Remember to update this documentation as your project evolves and add any specific configuration or setup steps unique to your project.
# HRMS API Documentation

This repository contains the API documentation for an HRMS (Human Resource Management System) application.

## Base URL
```
http://localhost:8000
```

## Authentication
Most endpoints require Bearer token authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_token>
```

## Endpoints

### Authentication

#### Login
```http
POST /login/employee
Content-Type: application/json

{
    "email": "jio@gmail.com",
    "password": "123456789"
}
```

#### Sign Up
```http
POST /signup/employee
Content-Type: application/json

{
    "name": "Test",
    "contact": "123456789",
    "email": "testhr@gmail.com",
    "aadhaar": "123456789",
    "pan": "1234",
    "bank_details": "bank",
    "emergency_contact": "1234567890",
    "address": "abc",
    "profile_picture": "https://example.com/image.jpg",
    "isHR": true
}
```

### Leave Management

#### Apply Leave
```http
POST /leave/apply
Content-Type: application/json

{
    "startDate": "",
    "endDate": "",
    "reason": "",
    "type": "",
    "applyOn": ""
}
```

#### Approve/Reject Leave
```http
PUT /leave/update?leaveId
Content-Type: application/json

{
    "status": ""
}
```

#### Delete Leave
```http
DELETE /leave/update/delete?leaveId
```

#### Fetch Self Leaves
```http
GET /leave/fetch/leave?start&end
```

#### Fetch Employees Leaves
```http
GET /leave/fetch/employee/leave?start&end
```

### User Management

#### Update User Details
```http
PUT /update/user/:id
Content-Type: application/json

{
    "name": "Test",
    "contact": "123456789",
    // ... other user details
}
```

#### Delete User
```http
DELETE /update/user/:id
```

#### Fetch Users
```http
GET /fetch/user/:skip
```

### Attendance

#### Check In
```http
POST /attendance/create/checkin
Content-Type: application/json

{
    "checkInTime": ""
}
```

#### Check Out
```http
POST /attendance/create/checkout
Content-Type: application/json

{
    "checkOutTime": ""
}
```

#### Fetch Attendance
```http
GET /attendance/fetch
```

### Payroll

#### Create Payroll
```http
POST /payroll/create
Content-Type: application/json

{
    "employeeId": "",
    "baseSalary": "",
    "totalDays": "",
    "month": ""
}
```

#### Fetch Self Payroll
```http
GET /payroll/fetch
Content-Type: application/json

{
    "month": ""
}
```

#### Fetch Employees Payroll
```http
GET /payroll/fetch/employee
```

#### Generate Payroll PDF
```http
GET /payroll/fetch/generate-pdf/:id
```

## Response Formats
All responses are returned in JSON format unless specified otherwise (like PDF generation).

## Error Handling
The API returns appropriate HTTP status codes along with error messages when applicable.

## Authentication
Most endpoints require authentication using JWT tokens. Make sure to include the token in the Authorization header as a Bearer token.

## Note
- Replace `:id` in URLs with actual IDs
- All date fields should be in a valid date format
- Ensure proper error handling in your implementation

For more details about specific endpoints or implementation, please refer to the source code or contact the development team.


## Live Demo
- **Frontend**: [HRMS Web App](https://hrms-git-master-bhuvneshwar-tyagis-projects.vercel.app)
- **Backend API**: [HRMS API](https://hrms-733x.onrender.com)

## Deployment Details

### Frontend Deployment (Vercel)
The frontend application is deployed on Vercel, offering:
- Continuous deployment from GitHub
- Automatic HTTPS
- Global CDN
- Real-time analytics

Access the application at:
```
https://hrms-git-master-bhuvneshwar-tyagis-projects.vercel.app
```

### Backend Deployment (Render)
The backend API is hosted on Render, providing:
- Automatic deployments
- SSL/TLS encryption
- API monitoring
- Scalable infrastructure

Base API URL:
```
https://hrms-733x.onrender.com
```

## API Testing
You can test the API endpoints using Postman or any API testing tool:

1. Use the base URL: `https://hrms-733x.onrender.com`
2. Add the respective endpoints (e.g., `/login/employee`, `/leave/apply`)
3. Include necessary headers and authentication tokens

Example API call:
```http
POST https://hrms-733x.onrender.com/login/employee
Content-Type: application/json

{
    "email": "your-email@example.com",
    "password": "your-password"
}
```

## Test Credentials

### HR Portal
```
Email: testhr@gmail.com
Password: 123456789
```

### Employee Portal
```
Email: testemployee@gmail.com
Password: 123456789
```
