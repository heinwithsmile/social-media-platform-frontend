import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Handle logout logic here
    // dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-primary">
              Social
            </Link>
          </div>
          
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link 
                to={`/profile/${user?.username || user?.id}`} 
                className="flex items-center text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                <img 
                  src={user?.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-_yNXMQ0Wtoc0mNc7-AS3UMJI9_7LjnxW3BFPOMwjQoyQs20FJfs0SNsGhalHRoi3XrBrxz74y_VNBbOAt4UmkO6HP1fPblxNbyIgR9JndmjdtNJOAM3JYIhN8Fx5XiUqYI6c7fZCu9khBRUYVlxA-GIeX9YRAYc4-8G0LHR2DrONHmchDRZ7pwbXnPYBu9cDibb2qfzQo5E2geH9hfdfDIzJyiOdLDpcxNTgnE8XEtk7C7y-6zJSqpemjL6NMBRt9bB7HmOr7K-c'}
                  alt="User avatar"
                  className="h-8 w-8 rounded-full object-cover mr-2"
                />
                {user?.name}
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link 
                to="/login" 
                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
