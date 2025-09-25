import axios from 'axios';
import { API_BASE_URL, POSTS_ENDPOINTS, NEWFEED_ENDPOINTS } from '../config/endpoints';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add request interceptor to include auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn('No auth token found in localStorage');
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

export const postService = {
  getAllPosts: async () => {
    try {
      const token = localStorage.getItem('authToken');
      console.log('Fetching posts with token:', token ? 'Token exists' : 'No token');
      
      const response = await api.get(NEWFEED_ENDPOINTS.GET_ALL_POSTS);
      console.log('Posts response:', response);
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.config?.headers
      });
      throw error;
    }
  },

  createPost: async (postData) => {
    try {
      const formData = new FormData();
      
      // Ensure content is present
      if (!postData.content || typeof postData.content !== 'string' || !postData.content.trim()) {
        throw new Error('Post content is required');
      }
      
      // Safely handle title
      const title = postData.title?.trim();
      if (title) {
        formData.append('title', title);
      }
      
      // Append content
      formData.append('content', postData.content.trim());
      
      // Handle image if present
      if (postData.image) {
        if (postData.image instanceof File) {
          formData.append('image', postData.image);
        } else if (typeof postData.image === 'string') {
          formData.append('image_url', postData.image);
        }
      }
      
      console.log('Sending create post request with data:', {
        hasTitle: !!title,
        contentLength: postData.content.length,
        hasImage: !!postData.image
      });
      
      const response = await api.post(POSTS_ENDPOINTS.CREATE_POST, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
        },
      });
      
      console.log('Post created successfully');
      return response.data;
      
    } catch (error) {
      console.error('Error creating post:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        validationErrors: error.response?.data?.errors,
      });
      
      // Create a more specific error message based on the response
      const errorMessage = error.response?.data?.message || 
                         error.response?.data?.error ||
                         'Failed to create post. Please try again.';
      
      // Create a new error with the server's message
      const newError = new Error(errorMessage);
      newError.status = error.response?.status;
      newError.validationErrors = error.response?.data?.errors;
      
      throw newError;
    }
  },

  likePost: async (postId) => {
    try {
      const response = await api.post(`/posts/${postId}/reactions`, { type: 'like' });
      return response.data;
    } catch (error) {
      console.error('Error liking post:', error);
      throw error;
    }
  },

  addComment: async (postId, comment) => {
    try {
      const response = await api.post(`/posts/${postId}/comments`, { content: comment });
      return response.data;
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  },
};

export default api;
