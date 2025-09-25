import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../../store/authThunks';

const AuthForm = ({ isLogin = true, onSubmit }) => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Directly select the needed state
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      dispatch({ type: 'auth/loginFailure', payload: "Passwords don't match!" });
      return;
    }
    
    try {
      const credentials = isLogin 
        ? { email: formData.email, password: formData.password }
        : {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword
          };
      
      const action = isLogin ? loginUser(credentials) : registerUser(credentials);
      const result = await dispatch(action);
      
      if (result && result.user) {
        if (onSubmit) {
          onSubmit(result);
        }
        navigate('/');
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!isLogin && (
        <div>
          <label htmlFor="username" className="sr-only">Username</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input w-full rounded-lg border-0 bg-black/20 p-4 text-white placeholder:text-white/50 focus:bg-black/30 focus:ring-2 focus:ring-primary/70 transition-all duration-200"
            placeholder="Your Name"
            required={!isLogin}
          />
        </div>
      )}
      
      <div>
        <label htmlFor="email" className="sr-only">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="form-input w-full rounded-lg border-0 bg-black/20 p-4 text-white placeholder:text-white/50 focus:bg-black/30 focus:ring-2 focus:ring-primary/70 transition-all duration-200"
          placeholder="Email"
          required
        />
      </div>
      
      <div>
        <label htmlFor="password" className="sr-only">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="form-input w-full rounded-lg border-0 bg-black/20 p-4 text-white placeholder:text-white/50 focus:bg-black/30 focus:ring-2 focus:ring-primary/70 transition-all duration-200"
          placeholder="Password"
          required
          minLength={6}
        />
      </div>
      
      {!isLogin && (
        <div>
          <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="form-input w-full rounded-lg border-0 bg-black/20 p-4 text-white placeholder:text-white/50 focus:bg-black/30 focus:ring-2 focus:ring-primary/70 transition-all duration-200"
            placeholder="Confirm Password"
            required={!isLogin}
            minLength={6}
          />
        </div>
      )}
      
      {error && (
        <div className="mb-4 rounded-lg bg-red-500/30 p-3 text-center text-sm text-red-100">
          {error}
        </div>
      )}
      
      <button
        type="submit"
        disabled={loading}
        className={`w-full rounded-full bg-gradient-to-r from-gray-700 via-gray-900 to-black p-4 text-base font-bold text-white shadow-lg transition-all ${
          loading ? 'opacity-70' : 'hover:scale-105 hover:opacity-90'
        }`}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <svg className="mr-2 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {isLogin ? 'Signing in...' : 'Creating Account...'}
          </div>
        ) : isLogin ? (
          'Sign in'
        ) : (
          'Create Account'
        )}
      </button>
    </form>
  );
};

export default AuthForm;
