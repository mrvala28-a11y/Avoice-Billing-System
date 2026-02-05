# Invoice Billing System

A full-stack web application for managing invoices, business profiles, and user authentication. Built with React (frontend) and Node.js/Express (backend) with MongoDB database.

## Features

### User Management
- User registration and login
- JWT-based authentication
- Protected routes

### Business Profile Management
- Create and update business profile
- Upload logo, stamp, and signature files
- Manage business details (name, email, address, phone, GST, tax, owner, designation)

### Invoice Management
- Create new invoices
- Edit existing invoices
- Manage invoice status (Draft, Paid, Unpaid, Overdue)
- View and manage all invoices
- Generate PDF invoices
- Print invoices

### Dashboard
- Overview of invoices and revenue
- Status pie chart
- Revenue bar chart
- Quick access to key features

### File Management
- Upload and manage business assets (logo, stamp, signature)
- Secure file storage

## Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Bootstrap 5** - CSS framework
- **Chart.js & React Chart.js 2** - Data visualization
- **Axios** - HTTP client
- **React Toastify** - Notifications
- **Framer Motion** - Animations
- **HTML2Canvas & jsPDF** - PDF generation
- **React To Print** - Print functionality

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB & Mongoose** - Database and ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing
- **UUID** - Unique identifier generation

### Development Tools
- **Nodemon** - Auto-restart for backend development
- **ESLint** - Code linting
- **Dotenv** - Environment variable management

## Project Structure

```
invoice-billing-system/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service functions
│   │   ├── utils/          # Utility functions
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
├── server/                 # Node.js backend
│   ├── config/
│   │   └── db.js           # Database configuration
│   ├── controllers/
│   │   └── authController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── upload.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Invoice.js
│   │   └── BusinessProfile.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── businessRoutes.js
│   │   └── invoiceRoutes.js
│   ├── uploads/            # File uploads directory
│   ├── server.js           # Main server file
│   └── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/invoice-billing-system
   JWT_SECRET=your_jwt_secret_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The application will be running at:
- Frontend: http://localhost:5173 (default Vite port)
- Backend: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Business Profile
- `GET /api/business` - Get business profile
- `POST /api/business` - Create/update business profile
- `DELETE /api/business/:type` - Remove uploaded file (logo/stamp/signature)

### Invoices
- `GET /api/invoices` - Get all invoices
- `POST /api/invoices` - Create new invoice
- `GET /api/invoices/:id` - Get single invoice
- `PUT /api/invoices/:id` - Update invoice
- `DELETE /api/invoices/:id` - Delete invoice

## Usage

1. **Register/Login**: Create an account or log in with existing credentials
2. **Setup Business Profile**: Add your business details and upload logo/stamp/signature
3. **Create Invoices**: Generate invoices for clients with items, taxes, and due dates
4. **Manage Invoices**: View, edit, and track invoice status
5. **Generate PDFs**: Download or print invoice PDFs
6. **Dashboard**: Monitor your business metrics and invoice status

## File Uploads

The application supports uploading the following files:
- **Logo**: Business logo (stored in `uploads/logo/`)
- **Stamp**: Business stamp (stored in `uploads/stamp/`)
- **Signature**: Digital signature (stored in `uploads/signature/`)

Files are handled securely using Multer middleware.

## Database Models

### User
- name (String, required)
- email (String, required, unique)
- password (String, required, hashed)

### BusinessProfile
- user (ObjectId, ref: User)
- businessName (String, required)
- email (String, required)
- address (String)
- phone (String)
- gst (String)
- tax (String)
- owner (String)
- designation (String)
- logo (String)
- stamp (String)
- signature (String)

### Invoice
- user (ObjectId, ref: User)
- client (String)
- email (String)
- phone (String)
- address (String)
- invoiceNo (String)
- createDate (String)
- dueDate (String)
- status (String: Draft/Paid/Unpaid/Overdue)
- tax (Number)
- items (Array of item objects)
- amount (Number)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For support or questions, please open an issue in the repository.
