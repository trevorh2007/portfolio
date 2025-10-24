# 🚀 Trevor's Portfolio

[![Build & Test](https://github.com/trevorh2007/portfolio/actions/workflows/publish.yml/badge.svg)](https://github.com/trevorh2007/portfolio/actions/workflows/publish.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15.0.3-black?logo=next.js)](https://nextjs.org/)
[![Tests](https://img.shields.io/badge/Tests-Jest%20%2B%20RTL-green?logo=jest)](https://jestjs.io/)

A modern, responsive portfolio built with Next.js 15, TypeScript, and styled-components, showcasing
clean code practices and industry-standard tooling.

## ✨ Features

- **⚡ Next.js 15** with App Router for optimal performance
- **🔷 TypeScript** with strict configuration for type safety
- **💅 Styled Components** for CSS-in-JS styling with themes
- **🧪 Jest + React Testing Library** for comprehensive testing
- **🔄 Error Boundaries** for graceful error handling
- **⏳ Loading States** with skeleton loaders and spinners
- **🌙 Dark/Light Mode** theme switching
- **⏰ Interactive Timer** with countdown functionality
- **📱 Responsive Design** for all device sizes
- **🔧 Modern Tooling**: ESLint 9 + Prettier + TypeScript strict mode
- **🚀 GitHub Actions** CI/CD with automated testing and deployment

## 🛠️ Tech Stack

| Technology                                          | Version | Purpose                         |
| --------------------------------------------------- | ------- | ------------------------------- |
| [Next.js](https://nextjs.org/)                      | 15.0.3  | React framework with App Router |
| [React](https://reactjs.org/)                       | 18.3.1  | UI library                      |
| [TypeScript](https://www.typescriptlang.org/)       | 5.6.3   | Type safety                     |
| [Styled Components](https://styled-components.com/) | 6.1.19  | CSS-in-JS styling               |
| [ESLint](https://eslint.org/)                       | 9.15.0  | Code quality & consistency      |
| [Prettier](https://prettier.io/)                    | 3.3.3   | Code formatting                 |

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/trevorh2007/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## 📜 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint checks
npm run lint:fix     # Fix ESLint issues automatically
npm run format       # Format code with Prettier
npm run format:check # Check if code is formatted
```

## 🏗️ Project Structure

```
portfolio/
├── app/                    # Next.js App Router directory
│   ├── components/         # React components
│   │   ├── shared/         # Reusable components
│   │   │   ├── ErrorBoundary.tsx
│   │   │   ├── Loading.tsx
│   │   │   └── navbar.tsx
│   │   └── anotherComponent.tsx
│   ├── hooks/              # Custom React hooks
│   │   └── useAsync.ts
│   ├── styles/             # Styling and themes
│   │   ├── GlobalStyles.ts
│   │   ├── Providers.tsx
│   │   ├── themes.ts
│   │   └── registry.tsx
│   ├── timer/              # Timer feature pages
│   │   ├── CountdownTimer.tsx
│   │   ├── page.tsx
│   │   └── loading.tsx
│   ├── contact/            # Contact page
│   ├── home/               # Home page
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── loading.tsx         # Global loading component
│   └── error.tsx           # Global error page
├── .github/                # GitHub Actions workflows
│   └── workflows/
│       ├── publish.yml     # Auto-deployment to GitHub Pages
│       └── setup-node/     # Reusable Node.js setup action
├── config/                 # Configuration files (organized structure)
│   ├── jest/              # Jest testing configuration
│   │   ├── jest.config.cjs      # Main Jest config
│   │   ├── jest.config.ci.cjs   # CI-optimized Jest config
│   │   └── jest.setup.cjs       # Jest test setup
│   ├── eslint.config.js    # ESLint 9.x flat configuration
│   └── prettier.config.js  # Prettier formatting configuration
├── tsconfig.json           # TypeScript configuration
├── next.config.mjs         # Next.js configuration
└── package.json            # Dependencies and scripts
```

## 🎨 Features Deep Dive

### Error Handling

- **ErrorBoundary**: Catches React component errors gracefully
- **Global Error Pages**: Custom error pages for better UX
- **Development vs Production**: Different error displays for dev/prod

### Loading States

- **Skeleton Loaders**: For content that's loading
- **Spinners**: For quick operations
- **Route-level Loading**: Automatic loading states for page navigation

### Theme System

- **Dark/Light Mode**: Toggle between themes
- **Styled Components**: Consistent theming across components
- **Responsive Design**: Mobile-first approach

### Code Quality

- **ESLint**: 2025 best practices with comprehensive rules
- **Prettier**: Consistent code formatting
- **TypeScript**: Strict mode with modern configurations

### Testing & CI/CD

- **Jest + React Testing Library**: Comprehensive test suite with accessibility-first testing
- **Automated PR Testing**: Pull requests get automated test result cards
- **Coverage Reporting**: Track test coverage with visual indicators
- **Quality Gates**: No failing tests can reach production
- **GitHub Actions**: Automated testing, building, and deployment

## ⚙️ Configuration Management

All configuration files are organized in the `/config` directory for better maintainability:

### 📁 Config Structure

```
config/
├── jest/                   # Testing configuration
│   ├── jest.config.cjs          # Main Jest config (70% coverage)
│   ├── jest.config.ci.cjs       # CI config (40% coverage)
│   └── jest.setup.cjs           # Test setup & mocks
├── eslint.config.js        # ESLint 9.x flat config
└── prettier.config.js      # Code formatting rules
```

### 🔧 Benefits of Organized Configs

- **Clean Root Directory**: Less clutter in project root
- **Logical Grouping**: Related configs are grouped together
- **Enterprise Pattern**: Follows modern project organization standards
- **Easy Maintenance**: Configs are easy to find and update

## 🚀 Deployment

The portfolio is automatically deployed to GitHub Pages using GitHub Actions:

1. **Push to main** triggers the build and deploy workflow
2. **Build process** runs tests, linting, and builds the static site
3. **Deploy** uploads the built site to GitHub Pages

### Manual Deployment

```bash
npm run build    # Build the static export to /out
# Deploy the /out directory to your hosting provider
```

## 🛠️ Development Guidelines

### Code Standards

- **TypeScript**: Use strict types, avoid `any`
- **Components**: Use functional components with hooks
- **Styling**: Use styled-components with theme system
- **Error Handling**: Wrap components in ErrorBoundary when needed
- **Loading States**: Show loading indicators for async operations

### Commit Standards

- Use conventional commits: `feat:`, `fix:`, `docs:`, etc.
- Run `npm run format` before committing
- Ensure `npm run build` passes before pushing

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

Trevor - [GitHub](https://github.com/trevorh2007)

Portfolio Link: [https://trevorh2007.github.io/portfolio](https://trevorh2007.github.io/portfolio)

---

⭐ **Star this repo if you find it helpful!**
