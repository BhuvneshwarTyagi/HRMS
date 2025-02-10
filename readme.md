Here's the converted README.md file for GitHub:

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
