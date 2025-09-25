import { AUTH_ENDPOINTS } from '../config/endpoints';

export const login = async (credentials) => {
  const response = await fetch(AUTH_ENDPOINTS.LOGIN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
    }),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }

  return data;
};

export const register = async (userData) => {
  const response = await fetch(AUTH_ENDPOINTS.REGISTER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      name: userData.name,  // Changed from userData.username to userData.name
      email: userData.email,
      password: userData.password,
      password_confirmation: userData.confirmPassword,
    }),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Registration failed');
  }

  return data;
};

export const logout = async () => { 
  await fetch(AUTH_ENDPOINTS.LOGOUT, { method: 'POST' });
  
  // Clear local storage
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
};
