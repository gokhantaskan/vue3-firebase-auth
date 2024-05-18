# Vue 3 Firebase Auth Project

This project is a web application built with Vue 3, utilizing Firebase for authentication, and various other tools for development and testing.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Scripts](#scripts)

## Features

- Vue 3 for building the user interface
- Firebase for authentication
- Pinia for state management
- Vue Router for navigation
- Tailwind CSS for styling
- Cypress for end-to-end testing
- ESLint and Prettier for code linting and formatting

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- pnpm

### Recommended Tools

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/gokhantaskan/vue3-firebase-auth.git
   cd vue3-firebase-auth
   ```
2. Install dependencies:
   ```bash
   pnpm install
   pnpm prepare # This will install husky hooks
   ```

### Firebase Configuration

1. Create a Firebase project at Firebase Console.
2. Set up Firebase Authentication with your desired authentication providers.
3. Obtain your Firebase configuration object from the Firebase Console.
4. Create a `.env` file in the root of your project and fill it with your Firebase configuration details. You can use the provided `.env.example` file as a template. Copy the `.env.example` file to `.env` and add your Firebase configuration.

Make sure to replace the placeholder values with your actual Firebase configuration values.

This will ensure your app can connect to Firebase and use its authentication services.

### Running the Development Server

To start the development server, run:

```bash
pnpm dev
```

## Scripts

See [Vite Configuration Reference](https://vitejs.dev/config/).

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

Before running the end-to-end tests, make sure to install cypress:

```sh
pnpm exec cypress install
```

```sh
pnpm test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
pnpm build
pnpm test:e2e
```
