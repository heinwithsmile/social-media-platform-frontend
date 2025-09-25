import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage';
import AuthPage from './pages/auth/AuthPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <AuthPage initialIsLogin={true} />,
      },
      {
        path: "register",
        element: <AuthPage initialIsLogin={false} />,
      },
      {
        path: "logout",
        element: <AuthPage initialIsLogin={true} />,
      },
    ],
  },
]);

function AppRoutes() {
  return <RouterProvider router={router} />;
}

export default AppRoutes;
