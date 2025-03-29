# Fetch

🐶 Fetch - Find Your Furry Friend!

Here at Fetch, we love dogs, and hope you do too! This project aims to help dog lovers search through a database of shelter dogs, with the goal of finding a lucky dog a new home!

## 🚀 Getting Started

### Prerequisites
Make sure you have **Bun** installed:
- [Download Bun](https://bun.sh/)
- Verify installation:
  ```sh
  bun -v
  ```

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/ashokgurusamy/fetch.git
   cd fetch
   ```
2. Install dependencies using Bun:
   ```sh
   bun install
   ```

## 🔥 Development
To start the development server:
```sh
bun run dev
```
This will launch the application with **hot module reloading (HMR)** enabled.

## 🏗️ Build
To create a production build:
```sh
bun run build
```
This compiles the TypeScript and bundles the project using Vite.

## ✅ Linting
To check for linting errors:
```sh
bun run lint
```

## 🧐 Project Structure
```
📂 src
 ┣ 📂 components   # Reusable UI components
 ┣ 📂 pages        # Application pages
 ┣ 📂 hooks        # Custom React hooks
 ┣ 📂 context      # Context API setup
 ┣ 📂 api          # API service calls
 ┣ 📜 main.tsx     # Entry point
 ┣ 📜 App.tsx      # Root component
📂 public           # Static assets
📜 tsconfig.json     # TypeScript configuration
📜 vite.config.ts    # Vite configuration
```

## 🛠️ Technologies Used
- **React 19** - UI library
- **TypeScript** - Static typing
- **Vite** - Fast build tool
- **Material UI** - UI components
- **React Router** - Client-side routing
- **ESLint** - Code linting
- **Bun** - Fast JavaScript runtime

