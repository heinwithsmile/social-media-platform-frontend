# Social Media Platform - Frontend

A modern, responsive social media platform built with React, Vite, and Redux Toolkit.

## 🚀 Features

- 🔐 User Authentication (Login/Register)
- 📝 Create, edit, and delete posts
- 💬 Comment on posts
- ❤️ Like and unlike posts
- 👤 User profiles
- 🌓 Dark/Light theme support
- 📱 Fully responsive design

## 🛠 Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher) or yarn
- Backend API server (Laravel)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/social-media-platform.git
cd social-media-platform
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

### 4. Start the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## 🏗 Project Structure

```
src/
├── assets/          # Static assets (images, fonts, etc.)
├── components/      # Reusable UI components
│   ├── auth/       # Authentication related components
│   ├── common/     # Shared components
│   ├── home/       # Home page components
│   └── profile/    # Profile related components
├── config/         # Configuration files
├── hooks/          # Custom React hooks
├── layouts/        # Layout components
├── pages/          # Page components
├── services/       # API services
├── store/          # Redux store and slices
├── utils/          # Utility functions
├── App.jsx         # Main App component
└── main.jsx        # Application entry point
```

## 🧪 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🛠 Tech Stack

- [React](https://react.dev/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management
- [React Router](https://reactrouter.com/) - Routing
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [React Icons](https://react-icons.github.io/react-icons/) - Icon library
- [Axios](https://axios-http.com/) - HTTP client

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Base URL for API requests | `http://localhost:8000/api` |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/) for the amazing development experience
- [React](https://react.dev/) for the component-based architecture
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
