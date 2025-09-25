import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '../../components/auth/AuthForm';

const AuthPage = ({ initialIsLogin = true }) => {
  const [isLogin, setIsLogin] = useState(initialIsLogin);
  const navigate = useNavigate();

  const handleSubmit = (formData) => {
    // console.log(formData);
    // navigate('/');
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="rounded-xl">
          <div className="p-8 text-center">
            <h1 className="text-5xl font-bold">Social</h1>
            <p className="mt-2">
              {isLogin ? 'Welcome back! Sign in to continue.' : 'Create an account to get started.'}
            </p>
          </div>
          
          <div className="px-8 pt-4">
            <div className="flex rounded-full bg-black/20 p-1">
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className={`flex-1 rounded-full py-2 text-center text-sm font-medium transition-colors ${
                  isLogin
                    ? 'bg-primary text-white shadow-md'
                    : 'text-primary/70 hover:bg-white/10'
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className={`flex-1 rounded-full py-2 text-center text-sm font-medium transition-colors ${
                  !isLogin
                    ? 'bg-primary text-white shadow-md'
                    : 'text-primary/70 hover:bg-white/10'
                }`}
              >
                Register
              </button>
            </div>
          </div>

          <div className="p-8">
              <h2 className="text-center text-2xl font-bold mb-6">
                {isLogin ? 'Sign in to your account' : 'Create a new account'}
              </h2>
            
            <div className="mt-6">
              <AuthForm isLogin={isLogin} onSubmit={handleSubmit} />
              
              <div className="mt-6 text-center">
                <p className="text-sm">
                  {isLogin ? "Don't have an account? " : 'Already have an account? '}
                  <button
                    type="button"
                    onClick={toggleAuthMode}
                    className="font-semibold hover:underline"
                  >
                    {isLogin ? 'Sign up' : 'Sign in'}
                  </button>
                </p>
                
                {isLogin && (
                  <p className="mt-4 text-sm">
                    Demo account: <span className="font-semibold">demo@example.com</span> / <span className="font-semibold">demo123</span>
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <div className="p-8 pt-0">
            <button
              onClick={() => navigate(-1)}
              className="w-full text-center text-sm font-medium text-primary/70 hover:text-white"
            >
              ← Back to home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
