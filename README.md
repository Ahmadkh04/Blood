# LifeDrop - Blood Donation Management System

A full-stack web application for managing blood donations, connecting donors with donation centers, and scheduling donation appointments.

## 🎯 Project Description

LifeDrop is a comprehensive blood donation management system that enables users to:
- Register as blood donors
- Schedule donation appointments
- View donation history
- Get information about blood donation through an interactive chatbot

The system helps streamline the blood donation process, making it easier for donors to contribute to saving lives.

## 🛠️ Technologies Used

### Frontend
- **React 19.2.1** - UI framework
- **React Router DOM 7.10.0** - Routing
- **Vite 7.2.6** - Build tool
- **Lucide React** - Icons
- **Tailwind CSS** - Styling (via CDN)

### Backend
- **Node.js** - Runtime environment
- **Express 4.18.2** - Web framework
- **MySQL2 3.6.5** - Database driver
- **bcryptjs 2.4.3** - Password hashing
- **jsonwebtoken 9.0.2** - Authentication tokens
- **CORS 2.8.5** - Cross-origin resource sharing
- **dotenv 16.3.1** - Environment variables

### Database
- **MySQL** - Relational database management system
- **phpMyAdmin** - Database administration tool

## 📁 Project Structure

```
blood-donation-project/
├── backend/
│   ├── config.js              # Database configuration
│   ├── database.sql           # Database schema
│   ├── server.js              # Express server
│   ├── middleware/
│   │   └── auth.js            # JWT authentication middleware
│   └── routes/
│       ├── auth.js            # Authentication routes
│       └── donations.js       # Donation routes
├── src/
│   ├── components/
│   │   ├── Chatbot.js        # Interactive chatbot
│   │   ├── Footer.js         # Footer component
│   │   ├── Layout.js         # Layout wrapper
│   │   └── Navbar.js         # Navigation bar
│   ├── pages/
│   │   ├── Home.js           # Home page
│   │   ├── Login.js          # Login page
│   │   └── Register.js       # Registration page
│   ├── App.js                # Main app component
│   └── main.js               # Entry point
└── package.json              # Frontend dependencies
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MySQL Server
- phpMyAdmin (optional, for database management)



### Step 1: Database Setup

1. **Create Database in phpMyAdmin:**
   - Open phpMyAdmin (`http://localhost/phpmyadmin`)
   - Create a new database named `blood_donation`
   

2. **Verify Tables:**
   - `users` - Stores user accounts
   - `donations` - Stores donation appointments

### Step 3: Backend Setup

```bash
cd backend
npm install
```

3. **Create `.env` file:**
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=blood_donation
DB_PORT=3306
```

4. **Start Backend Server:**
```bash
npm start
```
Backend will run on `http://localhost:5000`

### Step 4: Frontend Setup

```bash
# From project root
npm install
npm start
```
Frontend will run on `http://localhost:3000`

## 📊 Database Schema

### Users Table
- `id` - Primary key
- `name` - User's full name
- `email` - Unique email address
- `phone` - Phone number
- `blood_type` - Blood type (A+, A-, B+, B-, AB+, AB-, O+, O-)
- `password` - Hashed password
- `created_at` - Registration timestamp

### Donations Table
- `id` - Primary key
- `user_id` - Foreign key to users table
- `name` - Donor name
- `email` - Donor email
- `phone` - Donor phone
- `donation_date` - Scheduled donation date
- `blood_type` - Blood type
- `status` - Status (pending, confirmed, completed, cancelled)
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

## 🔐 Authentication

The system uses JWT (JSON Web Tokens) for authentication:
- Tokens are stored in localStorage
- Tokens expire after 7 days
- Protected routes require valid tokens

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Donations
- `POST /api/donations/schedule` - Schedule donation (requires auth)
- `GET /api/donations/my-donations` - Get user's donations (requires auth)
- `GET /api/donations/all` - Get all donations (requires auth)

### Health Check
- `GET /api/health` - Check API status

## 🎨 Features

### Core Features
- ✅ User Registration & Login
- ✅ Donation Scheduling
- ✅ User Dashboard (view donations)
- ✅ Interactive Chatbot
- ✅ Responsive Design

### Security Features
- ✅ Password hashing (bcrypt)
- ✅ JWT authentication
- ✅ Input validation
- ✅ SQL injection prevention
- ✅ CORS protection


## 🚢 Deployment

### Frontend Deployment (GitHub Pages)
1. Build the project: `npm run build`
2. Deploy `dist` folder to GitHub Pages

### Backend Deployment (Render/Railway)
1. Connect GitHub repository
2. Set environment variables
3. Deploy Node.js application



