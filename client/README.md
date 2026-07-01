# EHR Client - Electronic Health Records System

A modern React-based frontend for managing patient information, appointments, and healthcare workflows.

## 📋 Project Overview

This frontend application enables:

- **User Authentication** - Login and registration
- **Dashboard** - View patients and appointments
- **Patient Management** - Add and view patient records
- **Appointment Scheduling** - Schedule appointments
- **Follow-up Management** - Track follow-ups
- **Doctor Profile** - Manage doctor information

## 🛠️ Tech Stack

- **React 19.2** - UI framework
- **Vite 7.2** - Build tool with hot reload
- **Tailwind CSS 4.1** - Styling
- **Framer Motion 12.34** - Animations
- **Axios 1.13** - API requests
- **React Router 7.13** - Navigation
- **Lucide Icons 0.562** - Icon library

## 📁 Project Structure

```
src/
├── components/              # React components
│   ├── Appointments/       # Appointment screens and management
│   ├── AuthScreens/        # Login and registration
│   ├── Dashboard/          # Main dashboard with patient list and search
│   ├── DoctorsComponents/  # Doctor-specific features
│   ├── Layout/             # Main application layout
│   └── UI/                 # Reusable UI components
├── context/                # React Context (Authentication state)
├── api/                    # API integration endpoints
│   ├── appointment.api.js
│   ├── auth.api.js
│   ├── doctor.api.js
│   ├── message
│   ├── Appointments/       # Appointment screens
│   ├── AuthScreens/        # Login & registration
│   ├── Dashboard/          # Patient list & search
│   ├── DoctorsComponents/  # Doctor features
│   ├── Layout/             # Main layout
│   └── UI/                 # Reusable components
├── context/                # Auth state management
├── api/                    # API endpoints
├── services/               # Utilities
├── App.jsx                 # Routes
├── main.jsx                # Entry point
└── index.css               # S
```

2. Install dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env` file in the client directory with:

```
VITE_API_URL=http://localhost:3000/api/v1
VITE_SOCKET_URL=http://localhost:3000
```

### Running the Application

**Development Server** (with hot module replacement):

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

**Production Build**:

```bash
npm run build
```

**Preview Built App**:

```bash
npm run preview
```

**Linting**:

```bash
npm run lint
```

## 🔑 Key Features

### Authentication (`/login`, `/register`)

- Secure user authentication
- Automatic session management with JWT tokens
- Context-based auth state management

### Dashboard (`/dashboard`)

- Patient list display with pagination
- Search and filter functionality
- Quick statistics via status cards
- **Authentication** - Login & register
- **Dashboard** - View all patients
- **Patient Management** - Add and view patient details
- **Appointments** - Schedule and track appointments
- **Follow-ups** - Manage patient follow-ups
- **Doctor Profile** - Edit profiledule, view, and manage appointments
- **Follow-ups**: Schedule and track follow-ups
- **Notifications**: Real-time notifications
- **Messages**: Chat functionality

API services are organized in `src/api/` directory with specific modules for each resource.

## 🔌 Real-time Features

The application uses **Socket.io** for real-time updates:

- Live notifications
- Appointment updates
- Patient status changes
- Message notifications

Socket connection is configured in `src/socket.js`

## 📦 Component Architecture

### State Management

- **React Context API** (`AuthContext`) for authentication state
- Component-level state with `useState`

### Routing

- Protected routes requiring authentication
- Automatic redirection to login for unauthenticated users
- Animated route transitions using Framer Motion

### Styling

- Taapp connects to backend API at `/api/v1`:
- **Users**: Login, register, authentication
- **Patients**: Get, create, update patient data
- **Doctors**: Doctor profiles
- **Appointments**: Schedule and view appointments
- **Follow-ups**: Schedule and track follow-ups

## 📦 Architecture

- **State Management**: React Context for authentication
- **Routing**: Protected routes with React Router
- **Styling**: Tailwind CSS + custom CSS
- **Animations**: Framer Motion for smooth transi
- The app uses ES modules (`"type": "module"`)
- Responsive design works on all screen sizes
- Real-time updates require an active Socket.io connection
- Authentication tokens are stored in HTTP-only cookies

## 🔗 Related Documentation

- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [React Router](https://reactrouter.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Socket.io Client](https://socket.io/docs/v4/client-api/)
  🐛 Troubleshooting

- **CORS Issues**: Ensure backend server is running
- **Build Errors**: Run `npm install` to reinstall dependencies
- **Port Already Used**: Vite will use next available port

## 📝 Notes

- Uses ES modules
- Responsive design for all screen sizes
- JWT tokens stored in cookies
