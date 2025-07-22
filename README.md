# 🌟 Star Wars Universe - Next.js Marketing Website

> A stunning, modern web application showcasing the Star Wars universe with comprehensive film and character data powered by GraphQL.

## 🚀 Live Demo

🔗 **[Visit Star Wars Universe](https://start-war-graghql.vercel.app/)**

## 📋 Table of Contents

- [🌟 Overview](#-overview)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🔧 Installation & Setup](#-installation--setup)
- [🎯 Usage](#-usage)
- [🧪 Testing](#-testing)
- [📱 Responsive Design](#-responsive-design)
- [📄 License](#-license)

## 🌟 Overview

This project is a comprehensive Star Wars marketing website built with Next.js 15 and modern web technologies. It provides an immersive experience for exploring the Star Wars universe through detailed film information and character profiles, all powered by a GraphQL API.

### 🎯 Project Goals

- Create an engaging, user-friendly interface for Star Wars fans
- Demonstrate modern web development best practices
- Implement responsive design and smooth animations
- Ensure excellent performance and SEO optimization
- Provide comprehensive testing coverage

## ✨ Features

### 🎬 Core Features

- **📽️ Film Explorer**: Browse all Star Wars films with detailed information
- **👥 Character Database**: Comprehensive character profiles with search functionality
- **🔍 Advanced Search**: Find films and characters quickly
- **📱 Responsive Design**: Perfect experience across all devices
- **🌓 Dark/Light Mode**: User-controlled theme switching
- **⭐ Favorites System**: Save your favorite films locally
- **🚀 Infinite Scroll**: Smooth character browsing with pagination

### 🎨 UI/UX Features

- **✨ Smooth Animations**: Framer Motion powered transitions
- **🎭 Loading States**: Elegant skeleton screens
- **💫 Hover Effects**: Interactive card animations
- **📊 Staggered Animations**: Progressive content reveal
- **🎪 Page Transitions**: Smooth navigation experience

### 🔧 Technical Features

- **⚡ GraphQL Integration**: Efficient data fetching with Apollo Client
- **🏪 State Management**: Zustand for simple, effective state handling
- **🧪 Comprehensive Testing**: Jest + Testing Library
- **📈 SEO Optimized**: Dynamic metadata and sitemap generation
- **🔄 PWA Ready**: Service worker and offline capabilities
- **📊 Performance Monitoring**: Core Web Vitals optimization

## 🛠️ Tech Stack

### Frontend Core
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React features
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling

### Data & State
- **Apollo Client** - GraphQL client with caching
- **GraphQL** - API query language
- **Zustand** - Lightweight state management

### UI & Animation
- **Framer Motion** - Advanced animations
- **Lucide React** - Beautiful icons
- **Radix UI** - Accessible component primitives
- **shadcn/ui** - Modern component library

### Development & Testing
- **Jest** - JavaScript testing framework
- **ESLint** - Code linting
- **TypeScript** - Static type checking

### Deployment & Optimization
- **Vercel** - Production deployment
- **Next.js Image** - Optimized image loading
- **Performance optimization** - Code splitting & lazy loading

## 📁 Project Structure

```
marketing-website/
├── 📁 public/                    # Static assets
│   ├── 📁 images/               # Image assets
│   └── 📄 *.svg                 # Icons and logos
├── 📁 src/
│   ├── 📁 __tests__/            # Test files
│   │   ├── 📁 components/       # Component tests
│   │   ├── 📁 helpers/          # Test utilities
│   │   ├── 📁 hooks/            # Hook tests
│   │   └── 📁 lib/              # Library tests
│   ├── 📁 app/                  # Next.js App Router
│   │   ├── 📄 layout.tsx        # Root layout
│   │   ├── 📄 page.tsx          # Landing page
│   │   ├── 📄 globals.css       # Global styles
│   │   ├── 📁 (features)/       # Feature-based routing
│   │   │   ├── 📁 home/         # Home page
│   │   │   ├── 📁 films-list/   # Films listing & details
│   │   │   └── 📁 characters/   # Characters page
│   │   ├── 📄 sitemap.ts        # Dynamic sitemap
│   │   └── 📄 robots.ts         # SEO robots.txt
│   ├── 📁 components/           # Reusable components
│   │   ├── 📁 common/           # Shared components
│   │   ├── 📁 features/         # Feature-specific components
│   │   └── 📁 ui/               # UI components (shadcn/ui)
│   ├── 📁 graphql/              # GraphQL queries
│   │   └── 📁 queries/          # Query definitions
│   ├── 📁 hooks/                # Custom React hooks
│   ├── 📁 lib/                  # Utility libraries
│   │   └── 📁 schemas/          # Schema definitions
│   ├── 📁 store/                # State management
│   └── 📁 types/                # TypeScript type definitions
├── 📄 package.json              # Dependencies & scripts
├── 📄 tailwind.config.js        # Tailwind configuration
├── 📄 next.config.ts            # Next.js configuration
├── 📄 jest.config.ts            # Jest test configuration
└── 📄 tsconfig.json             # TypeScript configuration
```

## 🔧 Installation & Setup

### Prerequisites

- **Node.js** 18.0 or higher
- **npm** or **yarn** package manager
- **Git** for version control

### 1. Clone Repository

```bash
git clone https://github.com/leaser019/marketing-website.git
cd marketing-website
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# Or using yarn
yarn install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://swapi-graphql.netlify.app/.netlify/functions/index
NEXT_PUBLIC_BASE_URL=https://start-war-graghql.vercel.app/
```

### 4. Development Server

```bash
# Start development server
npm run dev

# Or with yarn
yarn dev
```

Visit `http://localhost:3000` to see the application running.

### 5. Build for Production

```bash
# Build the application
npm run build

# Start production server
npm run start
```

## 🎯 Usage

### 🏠 Homepage
- **Hero Section**: Welcome message with navigation to main features
- **Featured Films**: Showcase of selected Star Wars films
- **Quick Navigation**: Easy access to films and characters

### 🎬 Films Section
- **Film Listing**: Complete catalog of Star Wars movies
- **Sorting Options**: Sort by release date or title
- **Film Details**: Comprehensive information including:
  - Plot synopsis (opening crawl)
  - Director and producer information
  - Release date and episode number
  - Character connections

### 👥 Characters Section
- **Character Grid**: Browse all Star Wars characters
- **Search Functionality**: Find characters by name
- **Infinite Scroll**: Seamless browsing experience
- **Character Details**: Information about each character

### ⚙️ Features
- **Theme Toggle**: Switch between light and dark modes
- **Favorites**: Save favorite films (stored locally)
- **Responsive Navigation**: Mobile-friendly menu system

## 🧪 Testing

The project includes comprehensive testing coverage:

### Test Types
- **Unit Tests**: Individual component testing
- **Integration Tests**: Component interaction testing
- **Hook Tests**: Custom hook functionality
- **Utility Tests**: Helper function testing

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Structure
```
src/__tests__/
├── components/          # Component tests
│   ├── FilmsList.test.tsx
│   ├── Header.test.tsx
│   └── ThemeProvider.test.tsx
├── hooks/               # Hook tests
│   └── useTheme.test.tsx
├── lib/                 # Utility tests
│   └── utils.test.ts
└── helpers/             # Test utilities
    └── test-utils.tsx
```

## 📱 Responsive Design

### Breakpoint Strategy
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

### Design Principles
- **Mobile-First**: Designed for mobile, enhanced for desktop
- **Flexible Layouts**: CSS Grid and Flexbox for adaptability
- **Touch-Friendly**: Appropriate touch targets and spacing
- **Performance**: Optimized images and lazy loading


## 📞 Contact & Support

- **Author**: Vo Minh Khang
- **Email**: [vomkhang35@gmail.com]
- **Live Site**: [https://start-war-graghql.vercel.app/](https://start-war-graghql.vercel.app/)

---
