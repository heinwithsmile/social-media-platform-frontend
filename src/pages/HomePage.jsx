import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  if (isAuthenticated) {
    return (
      <div className="container mx-auto p-4">
        <div className=" rounded-xl p-8 max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Welcome back, {user?.name}!</h1>
          <div className="bg-black/20 rounded-lg p-6 mb-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-white/70">Name</p>
                <p className="text-white">{user?.name}</p>
              </div>
              <div>
                <p className="text-sm text-white/70">Email</p>
                <p className="text-white">{user?.email}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => navigate('/posts')}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              View Feed
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold mb-6">Welcome to Social</h1>
        <p className="text-xl mb-8">Connect with friends and share your moments</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/login" 
            className="px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors text-center"
          >
            Sign In
          </Link>
          <Link 
            to="/register" 
            className="px-8 py-3 bg-white/10 text-white rounded-full font-medium hover:bg-white/20 transition-colors text-center"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
