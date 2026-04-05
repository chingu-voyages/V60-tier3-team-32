# Frontend Architecture

## Overview

This document outlines the current architecture and structure of the React frontend application for **LinguaLoop** - a neural data bridge application. The project uses modern tooling and best practices to ensure scalability, maintainability, and performance.

### Project Summary
- **Application**: LinguaLoop - A neural data bridge for MongoDB Atlas synchronization
- **Framework**: React 19 with Vite build tool
- **State Management**: Redux Toolkit with async thunks
- **Styling**: Tailwind CSS + Radix UI components
- **API Client**: Axios with environment-based configuration
- **UI Components**: Custom built with CVA (class-variance-authority) system
- **Package Manager**: npm with locked dependencies

### Key Architecture Principles
1. **Feature-Based Structure** - Code organized by features (auth, practice, test)
2. **Service-Action-Slice Pattern** - Redux async patterns with service layer
3. **Component Composition** - Reusable, composable UI components via Radix UI
4. **Path Aliasing** - `@` alias simplifies imports from src/
5. **Utility Functions** - Shared utilities like `cn()` for class merging
6. **Environment Configuration** - Environment variables for backend URL

---

## Tech Stack

### Core Dependencies
- **React** (^19.2.4) - UI library for building component-based interfaces
- **React DOM** (^19.2.4) - React rendering for web
- **React Router DOM** (^7.14.0) - Client-side routing and navigation
- **Redux Toolkit** (^2.11.2) - State management with async thunks
- **React Redux** (^9.2.0) - React bindings for Redux
- **Axios** (^1.14.0) - HTTP client for API requests

### UI & Styling
- **Tailwind CSS** (^3.4.10) - Utility-first CSS framework
- **PostCSS** (^8.5.8) - CSS processing
- **Autoprefixer** (^10.4.27) - Vendor prefixing for CSS
- **Radix UI** (^1.4.3) - Unstyled, accessible components library
- **@radix-ui/react-slot** (^1.2.4) - Radix primitive for component composition
- **class-variance-authority** (^0.7.1) - Type-safe CSS class management
- **clsx** (^2.1.1) - Utility for constructing conditional className strings
- **tailwind-merge** (^3.5.0) - Merge Tailwind CSS classes without conflicts
- **lucide-react** (^1.7.0) - Beautiful, consistent SVG icon library

### Build & Development Tools
- **Vite** (^8.0.1) - Fast frontend build tool and dev server with ESM support
- **@vitejs/plugin-react** (^6.0.1) - Vite plugin for React with Oxc
- **React Compiler** - Enabled for automatic optimization and memoization
- **@rolldown/plugin-babel** (^0.2.1) - Babel integration for Vite

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
├── api/                              # API integration layer
│   └── axios.js                     # Axios instance with baseURL configuration
├── app/                             # Redux store & global app configuration
│   ├── hooks.js                     # Custom Redux hooks (useAppDispatch, useAppSelector)
│   └── store.js                     # Redux store configuration with slices
├── assets/                          # Static assets (images, icons, fonts, etc.)
├── components/                      # Reusable UI components
│   ├── layout/
│   │   └── Navbar.jsx              # Navigation bar with links
│   ├── common/                      # Common components used across pages
│   └── ui/                          # UI component library (Radix-based)
│       ├── badge.jsx               # Badge component with variants
│       ├── button.jsx              # Button component with size/variant support
│       ├── card.jsx                # Card component with header, title, content
│       └── input.jsx               # Input field component
├── features/                        # Feature-specific logic (Redux slices, services)
│   ├── auth/                        # Authentication feature (placeholder)
│   ├── practice/                    # Practice/Learning feature (placeholder)
│   └── test/                        # Test feature (implemented)
│       ├── testSlice.js            # Redux slice for test state management
│       ├── testActions.js          # Redux async thunks for API calls
│       └── testService.js          # API service functions
├── pages/                           # Page components
│   └── Home.jsx                    # Home page with test UI
├── layout/                          # Layout components (not implemented)
├── utils/                           # Utility functions & helpers
│   └── utils.js                    # cn() utility for class merging
├── App.jsx                         # Main App component with routing
├── App.css                         # App-level styles
├── main.jsx                        # Application entry point
└── index.css                       # Global styles
```

---

## Configuration Files

### Vite Configuration (`vite.config.js`)
- React plugin enabled with Vite using Oxc for faster transpilation
- Babel compiler preset integrated for React optimization
- **Path Alias**: `@` resolves to `./src` directory for cleaner imports
  ```js
  import { Button } from "@/components/ui/button";  // Instead of ../../../components
  ```
- Hot Module Replacement (HMR) configured for instant feedback
- ESM module support with proper `__dirname` handling

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
- **main.jsx**: Bootstraps the React application into the DOM root element with StrictMode

### Root Component
- **App.jsx**: 
  - Wraps the application with Redux Provider (store)
  - Implements React Router with BrowserRouter
  - Sets up global styling (Tailwind CSS classes)
  - Renders Navbar component for navigation
  - Defines main route structure
  
### Routing Structure
Current routes registered in App.jsx:
- `/` - Home page (fully implemented)

Future routes planned:
- `/login` - Login page
- `/practice` - Practice/practice feature
- `/profile` - User profile

---

## State Management

### Redux Setup
- **Redux Toolkit** used for simplified state management
- **Store** (`app/store.js`) configured with feature-based slices
- **Custom Hooks** (`app/hooks.js`) for typed Redux usage:
  - `useAppDispatch()` - Typed version of `useDispatch()`
  - `useAppSelector()` - Typed version of `useSelector()`

### Redux Architecture Pattern
```
Feature + Service Pattern:
features/[featureName]/
├── [feature]Slice.js      # Redux slice with reducers & initial state
├── [feature]Actions.js    # Async thunks for API calls
└── [feature]Service.js    # API service functions using axios
```

### Implemented Features
- **Test Feature** (`features/test/`):
  - State: `items[]`, `status`, `error`
  - Actions: `fetchTest()`, `addTest()`
  - Status tracking: `idle`, `loading`, `success`, `failed`

### Planned Redux Features
- Authentication state slice (`features/auth/`)
- Practice/Learning state slice (`features/practice/`)

---

## Component Organization

### Component Types & Structure

#### Layout Components (`components/layout/`)
Main layout wrapper and navigation:
- **Navbar.jsx** - Navigation bar with React Router links to homepage and login

#### UI Components (`components/ui/`)
Reusable, styled UI component library built with Radix UI primitives:
- **Button.jsx** - Flexible button component with variants (default, outline, secondary, ghost, destructive, link) and sizes (default, xs, sm, lg, icon)
- **Card.jsx** - Container component with CardHeader, CardTitle, CardDescription, CardContent sub-components
- **Input.jsx** - Text input field with focus states and validation styles
- **Badge.jsx** - Badge component with multiple variants for status indicators

#### Common Components (`components/common/`)
Shared components used across multiple features (ready for implementation)

#### Feature Components
Located in `features/{featureName}/`: Feature-specific components and logic

#### Page Components (`pages/`)
- **Home.jsx** - Main dashboard showcasing the test feature with:
  - Database sync input form using Input and Button components
  - Live feed display using Card and Badge components
  - Status indicators with Loader2 and Send icons from lucide-react
  - Styled with Tailwind CSS and dark theme

### Component Composition Pattern
Components use a composable pattern with `asChild` prop (from Radix UI Slot):
```jsx
// Allows components to render as different elements
<Button asChild>
  <a href="/profile">Go to Profile</a>
</Button>
```

---

## API Integration

### Axios Configuration (`api/axios.js`)
- Configured axios instance with:
  - `baseURL`: Reads from `VITE_API_URL` environment variable
  - Default headers: `Content-Type: application/json`
- Ready for interceptors, error handling, and auth tokens

### Data Flow Architecture
```
API Service → Redux Thunk → Redux Slice → React Component
│              │             │              │
testService   testActions   testSlice     Home.jsx
getTest()     fetchTest()   items[]       useAppSelector
createTest()  addTest()     status        dispatch
```

### Implemented API Integration
**Test Feature** (`features/test/`):
- **testService.js**: API service functions
  - `getTest()` - GET `/test` - Fetch all test items
  - `createTest(data)` - POST `/test` - Create new test item
- **testActions.js**: Redux async thunks wrapping service calls with error handling
- **testSlice.js**: Redux slice handling state updates (loading, success, failed)

### Planned API Integration
```
api/
├── axios.js                # Axios instance (current)
├── endpoints.js            # API endpoint constants
├── auth.js                 # Authentication API calls
└── practice.js             # Practice feature API calls
```

---

## Styling Approach

### Tailwind CSS
- Utility-first CSS framework for rapid UI development
- Responsive design utilities built-in
- Dark mode support via Tailwind classes
- Currently configured with minimal theme extensions

### UI Component Styling Pattern
Components use **class-variance-authority (CVA)** for managing variant-based styles:
```jsx
const buttonVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "default-variant-classes",
        outline: "outline-variant-classes",
      },
      size: {
        sm: "small-size-classes",
        lg: "large-size-classes",
      },
    },
    defaultVariants: { variant: "default", size: "sm" },
  }
)
```

### Class Merging Utility
- **cn() function** (`utils/utils.js`) merges Tailwind classes:
  - Uses `clsx()` for conditionally joining classNames
  - Uses `tailwind-merge()` to prevent Tailwind conflicts
  - Allows safe component prop className overrides

### Styling Files
- **index.css**: Global resets and base styles
- **App.css**: App component specific styles
- Component styles: Inline Tailwind classes with variant system

---

## File Relationships & Data Flow

### Entry Point → Root Component Flow
```
main.jsx
  └─> App.jsx (Root Component)
       └─> Redux Provider (wraps all children)
            └─> Router (BrowserRouter)
                 ├─> Navbar (Layout)
                 └─> Routes
                      └─> Home Page
```

### Redux + API Integration Flow
```
Home.jsx (Page Component)
  ├─> useAppDispatch() [hook from app/hooks.js]
  ├─> useAppSelector() [hook from app/hooks.js]
  ├─> dispatch(fetchTest()) [testActions.js]
  └─> dispatch(addTest(data)) [testActions.js]
       │
       ├─> testService.getTest() [testService.js]
       │    └─> api.get('/test') [api/axios.js]
       │         └─> VITE_API_URL (env variable)
       │
       └─> testService.createTest() [testService.js]
            └─> api.post('/test', data) [api/axios.js]
```

### Component Composition Hierarchy
```
App.jsx
  ├─> Navbar (components/layout/Navbar.jsx)
  │    └─> React Router Link components
  └─> Home (pages/Home.jsx)
       ├─> Card (components/ui/card.jsx) - from @/components/ui/card
       │    ├─> CardHeader
       │    ├─> CardTitle
       │    ├─> CardDescription
       │    └─> CardContent
       ├─> Input (components/ui/input.jsx) - from @/components/ui/input
       │    └─> Input uses cn() utility for class merging
       ├─> Button (components/ui/button.jsx) - from @/components/ui/button
       │    └─> Button uses buttonVariants (CVA)
       ├─> Badge (components/ui/badge.jsx) - from @/components/ui/badge
       │    └─> Badge uses badgeVariants (CVA)
       └─> Lucide Icons - from lucide-react
            ├─> Loader2
            ├─> Send
            └─> Database
```

### Redux Store → Component Access Pattern
```
app/store.js (Redux Store)
  └─> reducer: { test: testReducer }
       └─> testSlice.js
            ├─> initialState: { items: [], status, error }
            ├─> reducers: { reset }
            └─> extraReducers: (handles async thunks)
                 ├─> fetchTest.pending → status = 'loading'
                 ├─> fetchTest.fulfilled → items = payload
                 └─> addTest.fulfilled → items.push(payload)

Home.jsx (Consumer)
  └─> state.test (via @/app/hooks.js)
       ├─> items (display in UI)
       └─> status (show loading indicator)
```

### Import Aliases in Action
All imports use the `@` alias configured in vite.config.js:
```jsx
// Instead of relative paths:
import Button from "../../../components/ui/button"
import { store } from "../../../app/store"
import api from "../../../api/axios"

// We write:
import { Button } from "@/components/ui/button"
import { store } from "@/app/store"
import api from "@/api/axios"
```

### Feature Module Structure (Test Feature Example)
```
features/test/
  ├─> testSlice.js
  │    ├─> createSlice() creates test reducer
  │    ├─> Imported in: app/store.js
  │    └─> Handles: initialState, reducers, extraReducers
  │
  ├─> testActions.js
  │    ├─> createAsyncThunk() creates fetchTest, addTest
  │    ├─> Uses: testService functions
  │    └─> Dispatched from: Home.jsx
  │
  └─> testService.js
       ├─> Imports: api (axios instance)
       ├─> Exports: getTest(), createTest()
       └─> Calls: api.get(), api.post() to backend
```

### Utility Function Access
```
utils/utils.js
  └─> cn() function (class merging utility)
       ├─> Used in: All UI components (button.jsx, card.jsx, input.jsx, badge.jsx)
       └─> Combines: clsx + tailwind-merge for safe class merging
            Example: cn(baseClasses, someCondition && extraClasses)
```

### Component Props & Data Flow
```
Home.jsx (gets data from Redux)
  ├─> Passes content state → Input component
  │    └─> Input emits: onChange event → setContent
  │
  ├─> Passes status prop → Button component
  │    └─> Button shows loading state when status === 'loading'
  │
  ├─> Passes items array → map() in JSX
  │    └─> Each item → Renders Card + Badge components
  │
  └─> All components use cn() utility
       └─> Safe className merging with Tailwind classes
```

---

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

## Implementation Status

### ✅ Completed
1. **Redux Store Setup** (`app/store.js`):
   - ✅ Redux store configured with test slice
   - ✅ Custom hooks created (useAppDispatch, useAppSelector)

2. **API Configuration** (`api/`):
   - ✅ Axios instance created with VITE_API_URL configuration
   - ✅ Service functions for test feature (getTest, createTest)
   - ✅ Async thunks with error handling

3. **Page Components** (`pages/`):
   - ✅ Home page implemented with test UI
   - ⏳ Login page (planned)

4. **UI Component Library** (`components/ui/`):
   - ✅ Button component with variants (default, outline, secondary, ghost, destructive, link)
   - ✅ Card component with header, title, description, content
   - ✅ Input component
   - ✅ Badge component with variants
   - ✅ All components use Radix UI primitives and CVA

5. **Layout Components** (`components/layout/`):
   - ✅ Navbar component with React Router links

6. **Utilities** (`utils/`):
   - ✅ cn() utility function for class merging

7. **Vite Configuration**:
   - ✅ Path alias `@` configured for src directory
   - ✅ React compiler enabled
   - ✅ Babel integration set up

### ⏳ In Progress / Planned

1. **Authentication Feature** (`features/auth/`):
   - Auth slice, actions, and service functions
   - Login/Register pages
   
2. **Practice Feature** (`features/practice/`):
   - Practice slice, actions, and service functions
   - Practice pages and components

3. **Common Components** (`components/common/`):
   - Shared UI elements (Modals, Notifications, Loading states, etc.)

4. **Environment Variables**:
   - Set up VITE_API_URL for backend connection
   - Create .env and .env.example files

5. **Advanced Features**:
   - Auth interceptors in Axios
   - Error boundary components
   - Additional page routes (Login, Profile, etc.)

---

## Dependencies Version Control

All dependencies are locked in `package-lock.json` to ensure consistent builds across environments.

### New Dependencies Added
- **radix-ui** (^1.4.3) - Primitive UI components (accessible, unstyled)
- **@radix-ui/react-slot** (^1.2.4) - Slot primitive for component composition
- **class-variance-authority** (^0.7.1) - Type-safe styling with CVA
- **clsx** (^2.1.1) - Conditional className utility
- **tailwind-merge** (^3.5.0) - Merge Tailwind classes without conflicts
- **lucide-react** (^1.7.0) - Beautiful SVG icon library

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

The application uses the following environment variables:

### Required
- **VITE_API_URL** - Base URL for backend API (used in `api/axios.js`)
  - Example: `http://localhost:5000/api` or `https://api.example.com`

### Setup Instructions
Create a `.env` file in the project root:
```env
VITE_API_URL=http://localhost:5000/api
```

Create a `.env.example` template for team reference:
```env
VITE_API_URL=http://localhost:5000/api
```

Create a `.env.production` for production builds:
```env
VITE_API_URL=https://api.production.com
```

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

---

## Quick Reference Guide

### Common Tasks

#### Adding a New UI Component
1. Create file in `src/components/ui/ComponentName.jsx`
2. Use Radix UI primitives and CVA for variants
3. Import `cn()` from `@/utils/utils` for className merging
4. Export component and variants

#### Adding a New Redux Feature
1. Create `src/features/featureName/` directory
2. Create `featureSlice.js` with Redux slice
3. Create `featureActions.js` with async thunks
4. Create `featureService.js` with API calls
5. Register slice in `app/store.js`
6. Use hooks in components: `useAppDispatch()`, `useAppSelector()`

#### Creating a New Page
1. Create file in `src/pages/PageName.jsx`
2. Import components from `@/components/...`
3. Add route in `App.jsx`
4. Use Redux hooks for state management

#### API Call Pattern
```jsx
// In component
const dispatch = useAppDispatch();
const { data, status } = useAppSelector(state => state.featureName);

// On mount or event
useEffect(() => {
  dispatch(fetchFeatureData());
}, [dispatch]);

// In feature/
// 1. Create service: api.get('/endpoint')
// 2. Create thunk: createAsyncThunk('feature/fetch', async ...)
// 3. Handle in slice: extraReducers for pending/fulfilled/rejected
```

### Import Shortcuts
```jsx
// Always use @ alias for src/ imports
import { Button } from "@/components/ui/button"
import { useAppDispatch } from "@/app/hooks"
import api from "@/api/axios"
import { cn } from "@/utils/utils"

// Don't use relative paths
// ❌ import Button from "../../../../components/ui/button"
// ✅ import { Button } from "@/components/ui/button"
```

### Key Files to Know
- **src/App.jsx** - Routes, providers, layout
- **src/app/store.js** - Redux store configuration
- **src/app/hooks.js** - Custom Redux hooks
- **src/api/axios.js** - HTTP client configuration
- **src/components/ui/** - Reusable UI components
- **src/features/** - Feature-specific logic
- **vite.config.js** - Build configuration & path aliases

### Debugging Tips
- Check Redux DevTools for state management
- Use browser DevTools for component inspection
- Check `VITE_API_URL` environment variable if API calls fail
- Verify async thunk status (idle, loading, success, failed)
- Check className conflicts using Tailwind CSS IntelliSense
