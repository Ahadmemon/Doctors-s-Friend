# EHR Server - Electronic Health Records Backend

A Node.js/Express backend for managing patient records, appointments, and healthcare workflows.

## 📋 Project Overview

This backend provides:

- **User Management** - Register and login
- **Patient Management** - Store patient records
- **Doctor Management** - Manage doctor profiles
- **Appointment Scheduling** - Schedule appointments
- **Follow-up Tracking** - Track patient follow-ups
- **File Management** - Upload and store files

## 🛠️ Tech Stack

- **Node.js** - JavaScript runtime
- **Express 5.2** - Web framework
- **MongoDB** - Database
- **Mongoose 9.1** - MongoDB ORM
- **JWT** - Authentication
- **bcrypt** - Password encryption
- **Multer** - File uploads
- **Cloudinary** - File storage
- **Axios** - HTTP requests

## 📁 Project Structure

```
src/
├── controllers/        # Business logic for each resource
├── models/            # MongoDB schemas
├── routes/            # API endpoints
├── middlewares/       # Authentication & file upload
├── db/                # Database connection
├── utils/             # Helper functions
├── app.js             # Express configuration
├── index.js           # Server entry point
└── constants.js       # App constants
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn
- MongoDB instance (local or cloud)
- API Keys for:
    - Twilio (SMS service)
    - Cloudinary (File storage)
    - Google Generative AI (ChatBot)

### Installation

1. Navigate to server directory:

```bash
cd server
```

2. Install dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env` file in the server directory:

```env
# Server
PORT=3000

# Database
MONGODB_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>

# JWT Tokens
ACCESS_TOKEN_SECRET=<your-secret-key>
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=<your-refresh-secret>
REFRESH_TOKEN_EXPIRY=10d

# Twilio SMS Service
TWILIO_ACCOUNT_SID=<your-account-sid>
TWILIO_AUTH_TOKEN=<your-auth-token>
TWILIO_PHONE_NUMBER=<your-twilio-number>

# Cloudinary File Storage
CLOUDINARY_CLOUD_NAME=<your-cloud-name>
CLOUDINARY_API_KEY=<your-api-key>
CLOUDINARY_API_SECRET=<your-api-secret>

# AI Integration
GEMINI_API_KEY=<your-gemini-api-key>
```

### Running the Application

**Development Server** (with auto-reload):

````bash
npm run dev:

```env
PORT=3000

MONGODB_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>

ACCESS_TOKEN_SECRET=<your-secret-key>
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=<your-refresh-secret>
REFRESH_TOKEN_EXPIRY=10d
**Users** (`/api/v1/users`)
- `POST /register` - Register new user
- `POST /login` - User login
- `POST /logout` - User logout

**Patients** (`/api/v1/patients`)
- `GET /` - Get all patients
- `GET /:id` - Get patient details
- `POST /` - Create patient
- `PUT /:id` - Update patient
- `DELETE /:id` - Delete patient

**Doctors** (`/api/v1/doctors`)
- `GET /` - Get all doctors
- `GET /:id` - Get doctor details
- `POST /` - Create doctor
- `PUT /:id` - Update doctor

**Appointments** (`/api/v1/appointments`)
- `GET /` - Get appointments
- `GET /:id` - Get appointment details
- `POST /` - Create appointment
- `PUT /:id` - Update appointment
- `DELETE /:id` - Cancel appointment

**Follow-ups** (`/api/v1/followUp`)
- `GET /` - Get follow-ups
- `POST /` - Create follow-up
- `PUT /:id` - Update follow-up
- `DELETE /:id` - Cancel follow-up
- Powered by Google Generative AI
- Provides healthcare-related responses
- Endpoint: `POST /api/v1/chatbot/ask`
- JWT-based authentication
- Access tokens (1 day expiry)
- Refresh tokens (10 days expiry)
- Password encrypted with bcrypt
- Associated doctor

### Doctor Model
- Professional information
- Specialization
- Contact information
- List of patients

### Appointment Model
- Doctor and patient references
- Appointment date/time
- Status (scheduled, completed, cancelled)
- Notes and prescriptions

### Follow-up Model
- Appointment reference
- Follow-up date/time
- Status and notes

### Notification Model
- Type (appointment, follow-up, message)
- Recipient
- Status (read/unread)
- Timestamp

## 🛡️ Middleware

### Authentication Middleware (`auth.middleware.js`)
- Verifies JWT tokens
- Extracts user information
- Validates token expiry

### File Upload Middleware (`multer.middleware.js`)
- Handles mult

- **Database Name**: `OutPatient_EHR`
- **Models**: User, Patient, Doctor, Appointment, FollowUp
- **ODM**: Mongoose with validation
### MongoDB Connection Error
- Verify MongoDB URL in `.env`
- Check internet connection
- Ensure IP is whitelisted in MongoDB Atlas

### JWT Token Errors
- Token may have expired (refresh using refresh token)
- Check token secret in `.env`
- Verify token format in Authorization header

### Twilio SMS Not Sending
- Verify Twilio credentials in `.env`
- Check phone number format
- Ensure Twilio account has credits

### Cloudinary Upload Issues
- Verify Cloudinary credentials
- Check file size limits
- Ensure file type is allowed

### Port Already in Use
- **auth.middleware.js** - JWT verification
- **multer.middleware.js** - File upload handling

CORS is enabled for client-side requests. Configure allowed origins in `app.js` if needed.

## 📦 Database Name

Database name: `OutPatient_EHR`

## 🚢 Deployment Considerations

- Use environment variables for sensitive data
- Enable SSL/TLS for production
- Use process manager (PM2) for production
- Set up proper logging
- Configure rate limiting
- Enable API authentication on all endpoints

## 🔗 Related Documentation

- [Express Documentation](https://expressjs.com)
- [M� Troubleshooting

- **MongoDB Connection Error**: Check `.env` MongoDB URL
- **JWT Token Issues**: Verify token secrets in `.env`
- **Port Already Used**: Change PORT in `.env`
- **File Upload Issues**: Check Cloudinary credentials
````
