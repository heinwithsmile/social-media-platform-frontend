import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CreatePost from '../components/home/CreatePost';
import Post from '../components/home/Post';
import { postService } from '../services/api';

const HomePage = () => {
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log('Fetching posts...');
        const data = await postService.getAllPosts();
        console.log('Received posts:', data);
        setPosts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to fetch posts:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status
        });
        setError(
          err.response?.data?.message || 
          err.message || 
          'Failed to load posts. Please check your connection and try again.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const [createPostError, setCreatePostError] = useState(null);

  const handleCreatePost = async (content, image = null, title = '') => {
    try {
      setCreatePostError(null);
      
      // Validate required field
      if (!content || typeof content !== 'string' || !content.trim()) {
        throw new Error('Post content cannot be empty');
      }
      
      const postData = { 
        ...(title && title.trim() && { title: title.trim() }), // Only include title if provided
        content: content.trim(),
        ...(image && { image }) // Only add image if it exists
      };
      
      console.log('Creating post with data:', {
        contentLength: content.length,
        hasImage: !!image
      });
      
      const newPost = await postService.createPost(postData);
      setPosts([newPost, ...posts]);
      return true; // Indicate success
      
    } catch (error) {
      console.error('Error in handleCreatePost:', {
        message: error.message,
        status: error.status,
        validationErrors: error.validationErrors
      });
      
      // Set a user-friendly error message
      const errorMessage = error.message || 'Failed to create post. Please try again.';
      setCreatePostError(errorMessage);
      
      // Show error to user (you could replace this with a toast notification)
      alert(errorMessage);
      return false; // Indicate failure
    }
  };

  const handleLike = async (postId) => {
    try {
      await postService.likePost(postId);
      setPosts(posts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              reactions: [...(post.reactions || []), { user_id: user.id }] 
            } 
          : post
      ));
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleAddComment = async (postId, comment) => {
    try {
      const newComment = await postService.addComment(postId, comment);
      setPosts(posts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              comments: [...(post.comments || []), newComment] 
            } 
          : post
      ));
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full space-y-6 px-0 mx-0">
      <div className="w-full">
        <CreatePost user={user} onCreatePost={handleCreatePost} />
      </div>
      <div className="w-full space-y-6">
        {posts.length > 0 ? (
          posts.map(post => {
            const isLiked = post.reactions?.some(react => react.user_id === user?.id) || false;
            const formattedPost = {
              ...post,
              user: post.user || { id: post.user_id, name: 'Unknown User' },
              timeAgo: new Date(post.created_at).toLocaleDateString(),
              likes: post.reactions?.length || 0,
              comments: post.comments?.length || 0,
              isLiked,
            };
            
            return (
              <Post
                key={post.id}
                post={formattedPost}
                currentUser={user}
                onLike={() => handleLike(post.id)}
                onDelete={post.user_id === user?.id ? handleDeletePost : null}
                onAddComment={(comment) => handleAddComment(post.id, comment)}
              />
            );
          })
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No posts yet. Be the first to post something!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
