# LetMeGrab-app – Product Management Web App

## 📋 Overview

LetMeGrab is a responsive web application featuring a dynamic landing page with a coffee-themed image carousel, user authentication, and a complete product management system with CRUD operations. While the carousel showcases coffee visuals for branding, the product system supports managing a variety of items.

## ✨ Features

- **Beautiful Landing Page** - Featuring image carousel showcasing coffee products
- **User Authentication** - Complete signup and login functionality with validation
- **Product Management** - View, create, update, and delete products
- **Search & Filter** - Search products by name and filter by category
- **Protected Routes** - Secure access to product management features
- **Responsive Design** - Works on desktop, tablet, and mobile devices

## 🛠️ Technologies Used

- **Frontend Framework**: React 18
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS & custom CSS
- **Routing**: React Router DOM v7
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Form Validation**: Custom validation utils
- **Authentication**: Local Storage for auth persistence
- **UI Enhancements**: React Icons, React Toastify

## 📁 Project Structure

```
letmegrab-app/
├── public/
│   └── favicon.ico
│   └── vite.svg
├── src/
│   ├── assets/
│   │   ├── images/
│   │   │   └── Coffee images and Logo
│   │   └── react.svg
│   ├── components/
│   │   ├── Carousel.jsx     # Image carousel for landing page
│   │   ├── Navbar.jsx       # Navigation bar component
│   │   ├── ProductCard.jsx  # Card component for displaying products
│   │   ├── ProductModal.jsx # Modal for viewing product details
│   │   ├── ProtectedRoute.jsx # Route protection for authenticated pages
│   │   └── Toast.jsx        # Toast notification component
│   ├── context/
│   │   └── AuthContext.jsx  # Authentication context for user management
│   ├── layouts/
│   │   ├── AuthLayout.jsx   # Layout for authentication pages
│   │   └── MainLayout.jsx   # Main layout with navbar
│   ├── pages/
│   │   ├── About.jsx        # About page
│   │   ├── Home.jsx         # Landing page
│   │   ├── Login.jsx        # Login page
│   │   ├── NotFound.jsx     # 404 page
│   │   ├── Products.jsx     # Products management page
│   │   └── Signup.jsx       # Signup page
│   ├── utils/
│   │   ├── api.js           # API utility functions
│   │   ├── localStorage.js  # Local storage utility functions
│   │   └── validation.js    # Form validation utility functions
│   ├── App.css
│   ├── App.jsx              # Main application component
│   ├── index.css
│   └── main.jsx             # Entry point
├── .gitignore
├── .env                     # Environment variables
├── .eslint.config.js        # ESLint configuration
├── index.html
├── package-lock.json
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16.0 or later)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/letmegrab-app.git
   cd letmegrab-app
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory:

   ```
   VITE_API_URL=https://fakestoreapi.com
   ```

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and visit:
   ```
   http://localhost:5173
   ```

## 📱 Usage

### Authentication

- **Signup**: Create a new account with username, email, and password
- **Login**: Access your account with username and password

### Product Management

- **View Products**: Browse all available products
- **Add Products**: Create new products with details
- **Edit Products**: Update existing product information
- **Delete Products**: Remove products from the system
- **Search Products**: Find products by name
- **Filter Products**: Filter products by category

## 🧪 API Testing

The project uses a Postman Collection for API testing:
https://api.postman.com/collections/24582109-37d97559-22b0-42e0-b592-7fd8b90b8e01?access_key=PMAT-01GXAEX88FNRZN45AWACQ2V20F

For local development, the application uses Local Storage to simulate API functionality for authentication.

## 🔐 Authentication Implementation

The application implements local authentication using the browser's Local Storage:

- User data is securely stored in Local Storage on signup
- Login validates credentials against stored user data
- Protected routes ensure only authenticated users can access certain features
- Navbar dynamically updates based on authentication status

## 🛣️ Routes

- `/` - Home page with carousel and product showcase
- `/login` - User login page
- `/signup` - User registration page
- `/products` - Product management page (protected route)
- `*` - 404 Not Found page

## 🔄 State Management

The application uses React Context API for state management:

- `AuthContext` - Manages user authentication state
- Component-level state - Manages UI state for individual components

## 📝 Development Notes

- Local Storage is used to persist user authentication
- Form validation is implemented for all input fields
- The product table includes sorting and filtering capabilities
- Product updates and deletions are confirmed with user

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/guide/)

## 👨‍💻 Author

Manish Gohil

---

Made with ☕ and Vite + React
