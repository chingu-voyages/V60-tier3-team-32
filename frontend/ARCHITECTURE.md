# Frontend Architecture

## Overview

This document outlines the current architecture and structure of the React frontend application. The project uses modern tooling and best practices to ensure scalability, maintainability, and performance.

---

## Tech Stack

### Core Dependencies
- **React** (^19.2.4) - UI library for building component-based interfaces
- **React DOM** (^19.2.4) - React rendering for web
- **React Router DOM** (^7.14.0) - Client-side routing and navigation
- **Redux Toolkit** (^2.11.2) - State management
- **React Redux** (^9.2.0) - React bindings for Redux
- **Axios** (^1.14.0) - HTTP client for API requests

### Build & Development Tools
- **Vite** (^8.0.1) - Fast frontend build tool and dev server
- **@vitejs/plugin-react** (^6.0.1) - Vite plugin for React with Oxc
- **React Compiler** - Enabled for automatic optimization

### Styling
- **Tailwind CSS** (^3.4.10) - Utility-first CSS framework
- **PostCSS** (^8.5.8) - CSS processing
- **Autoprefixer** (^10.4.27) - Vendor prefixing for CSS

### Linting & Code Quality
- **ESLint** (^9.39.4) - JavaScript linter
- **@eslint/js** (^9.39.4) - ESLint JS configuration
- **eslint-plugin-react-hooks** (^7.0.1) - React hooks linting rules
- **eslint-plugin-react-refresh** (^0.5.2) - Fast refresh linting
- **Babel** (@babel/core ^7.29.0) - JavaScript compiler

### Development Tools
- **@types/react** (^19.2.14) - React type definitions
- **@types/react-dom** (^19.2.3) - React DOM type definitions
- **babel-plugin-react-compiler** (^1.0.0) - React compiler for performance

---

## Project Structure

```
src/
├── api/                    # API integration & HTTP requests (empty - ready for implementation)
├── app/                    # Redux store & global app configuration (empty - ready for implementation)
├── assets/                 # Static assets (images, icons, fonts, etc.)
├── components/             # Reusable UI components
│   ├── common/            # Common components used across pages (empty)
│   └── ui/                # UI component library (empty)
├── features/              # Feature-specific logic (Redux slices, hooks, components)
│   ├── auth/              # Authentication feature (empty - ready for implementation)
│   └── practice/          # Practice/Learning feature (empty - ready for implementation)
├── layout/                # Layout components (Navbar, Footer, Sidebar, etc.) - empty
├── pages/                 # Page components (Home, Login, etc.) - empty
├── styles/                # Global styles and CSS utilities (empty)
├── utils/                 # Utility functions & helpers (empty)
├── App.jsx               # Main App component with routing
├── App.css               # App-level styles
├── main.jsx              # Application entry point
└── index.css             # Global styles
```

---

## Configuration Files

### Vite Configuration (`vite.config.js`)
- React plugin enabled with Vite
- Babel compiler preset integrated for React optimization
- Hot Module Replacement (HMR) configured

### Tailwind CSS Configuration (`tailwind.config.js`)
- Minimal setup with room for theme customization
- Content paths ready for configuration
- Extend theme and plugin sections available

### ESLint Configuration (`eslint.config.js`)
- JavaScript and JSX file support
- React Hooks linting rules enforced
- React Refresh plugin configuration
- Browser globals enabled
- Custom rule: Unused variables allowed if starting with uppercase (component pattern)

### PostCSS Configuration (`postcss.config.js`)
- Tailwind CSS processing
- Autoprefixer for cross-browser compatibility

---

## Application Architecture

### Entry Point
- **main.jsx**: Bootstraps the React application into the DOM root element

### Root Component
- **App.jsx**: 
  - Wraps the application with Redux Provider (store)
  - Implements React Router with BrowserRouter
  - Sets up global styling (Tailwind CSS classes)
  - Defines main route structure
  
### Routing Structure
Current routes registered in App.jsx:
- `/` - Home page
- `/login` - Login page
- Future routes for `/practice` and `/profile` can be added

---

## State Management

### Redux Setup
- Redux Toolkit used for simplified state management
- Store configuration located in `app/store.js` (ready for implementation)
- Feature-based Redux slices can be organized under `features/` directory

### Planned Redux Features
- Authentication state slice (`features/auth/`)
- Practice/Learning state slice (`features/practice/`)

---

## Component Organization

### Component Types

#### Common Components (`components/common/`)
Shared components across multiple pages/features:
- Navigation components
- Modals, Alerts, Notifications
- Headers, Footers
- Spinners, Loading states

#### UI Components (`components/ui/`)
Reusable UI component library:
- Buttons, Input fields, Forms
- Cards, Lists, Tables
- Dropdowns, Modals
- Any other atomic/molecule UI components

#### Feature Components
Located in `features/{featureName}/`:
- Feature-specific components
- Feature-specific logic and state

---

## API Integration

### Axios Instance
- Configured for HTTP requests to backend
- Location: `api/` directory (ready for implementation)

### Planned API Integration Structure
```
api/
├── axios.js           # Axios instance configuration
├── endpoints.js       # API endpoint constants
├── auth.js           # Authentication API calls
└── practice.js       # Practice feature API calls
```

---

## Styling Approach

### Tailwind CSS
- Utility-first CSS framework
- No custom CSS needed for most components
- Global styles in `index.css` and `App.css`
- Responsive design utilities built-in

### CSS Files
- **index.css**: Global resets and base styles
- **App.css**: App component specific styles
- Individual component styles can use inline Tailwind classes

---

## Code Quality Standards

### Linting Rules
- ESLint enforces React best practices
- React Hooks rules prevent common mistakes
- React Refresh rules ensure fast refresh compatibility

### Development Practices
- Hot Module Replacement (HMR) for instant feedback
- React Compiler enabled for automatic memoization
- Strict Mode in development for additional warnings

---

## Development Workflow

### Available Scripts
```bash
npm run dev      # Start development server with HMR
npm run build    # Build for production
npm run lint     # Run ESLint to check code quality
npm run preview  # Preview production build locally
```

### Development Server
- Runs on `http://localhost:5173` (default Vite port)
- HMR enabled for instant updates
- Fast refresh for quick iteration

---

## File Naming Conventions

- **Components**: PascalCase (e.g., `UserCard.jsx`)
- **Utilities**: camelCase (e.g., `formatDate.js`)
- **CSS**: Same as component/file name (e.g., `UserCard.css`)
- **Directories**: kebab-case (e.g., `auth-service/`)

---

## Performance Considerations

### React Compiler
- Automatically memoizes components
- Reduces unnecessary re-renders
- No manual optimization needed

### Code Splitting
- React Router supports lazy loading routes
- Can be implemented as features grow

### Bundle Optimization
- Vite's tree-shaking removes unused code
- Tailwind CSS purgation removes unused styles

---

## Next Steps / Ready for Implementation

1. **Redux Store Setup** (`app/store.js`):
   - Configure Redux store with slices
   - Set up middleware if needed

2. **API Configuration** (`api/`):
   - Create Axios instance with interceptors
   - Define API endpoints
   - Create service functions for API calls

3. **Page Components** (`pages/`):
   - Implement Home page
   - Implement Login page
   - Add additional pages as needed

4. **Feature Implementation**:
   - Auth feature components and logic
   - Practice feature components and logic

5. **Shared Components** (`components/`):
   - Create Navbar component
   - Implement common UI components
   - Build component library

6. **Layout Components** (`layout/`):
   - Main layout wrapper
   - Sidebar/Navigation layouts

7. **Utilities** (`utils/`):
   - Helper functions
   - Custom hooks
   - Constants and enums

8. **Tailwind Configuration**:
   - Define content paths for template scanning
   - Extend theme with custom colors and typography
   - Configure dark mode if needed

---

## Dependencies Version Control

All dependencies are locked in `package-lock.json` to ensure consistent builds across environments.

To update dependencies:
```bash
npm update                # Updates patch and minor versions
npm outdated            # Check for available updates
npm install [package]   # Install specific package version
```

---

## Browser Support

- Modern browsers supporting ES2020+
- Mobile-responsive design via Tailwind CSS
- Progressive enhancement for older browsers (via Autoprefixer)

---

## Environment Variables

Currently, no environment variables are configured. When needed, create:
- `.env` - Local development
- `.env.production` - Production build variables
- `.env.example` - Template for environment variables

---

## Future Considerations

- TypeScript migration for type safety
- Testing frameworks (Vitest, React Testing Library)
- Component documentation (Storybook)
- Internationalization (i18n)
- Authentication middleware
- Error boundary components
- Analytics integration
- Performance monitoring
