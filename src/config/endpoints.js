const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const AUTH_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/login`,
  REGISTER: `${API_BASE_URL}/register`,
  LOGOUT: `${API_BASE_URL}/logout`,
  USER: `${API_BASE_URL}/user`,
};

export const POSTS_ENDPOINTS = {
  GET_POSTS_BY_USER: `${API_BASE_URL}/posts`,
  GET_POSTS: `${API_BASE_URL}/posts`,
  CREATE_POST: `${API_BASE_URL}/posts`,
};

export const NEWFEED_ENDPOINTS = {
  GET_ALL_POSTS: `${API_BASE_URL}/posts`,
  COMMENT_ON_POST: `${API_BASE_URL}/posts/{post_id}/comments`,
  REACTION_ON_POST: `${API_BASE_URL}/posts/{post_id}/reactions`,
};

export const USER_ENDPOINTS = {
  GET_USER: `${API_BASE_URL}/profile`,
};

export default {
  ...AUTH_ENDPOINTS,
  ...POSTS_ENDPOINTS,
  ...NEWFEED_ENDPOINTS,
  ...USER_ENDPOINTS,
};
