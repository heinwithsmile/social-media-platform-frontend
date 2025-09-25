import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

const Post = ({ post, currentUser, onLike, onDelete, onAddComment }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isCommenting, setIsCommenting] = useState(false);
  const [comments, setComments] = useState(post.comments || []);
  
  const isLiked = post.isLiked || false;
  const likeCount = post.likes || 0;
  const commentCount = post.comments?.length || 0;

  const formatDate = (dateString) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (e) {
      return '';
    }
  };

  const handleLike = () => {
    if (onLike) {
      onLike();
    }
  };

  const handleDelete = () => {
    if (onDelete && window.confirm('Are you sure you want to delete this post?')) {
      onDelete();
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim() || !onAddComment) return;
    
    try {
      setIsCommenting(true);
      const newComment = await onAddComment(commentText);
      setComments(prev => [...prev, newComment]);
      setCommentText('');
    } catch (error) {
      console.error('Failed to add comment:', error);
    } finally {
      setIsCommenting(false);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-background-dark/50 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden mb-6">
      {/* Post Header */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-full bg-cover bg-center" 
              style={{ 
                backgroundImage: `url(${post.user?.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-_yNXMQ0Wtoc0mNc7-AS3UMJI9_7LjnxW3BFPOMwjQoyQs20FJfs0SNsGhalHRoi3XrBrxz74y_VNBbOAt4UmkO6HP1fPblxNbyIgR9JndmjdtNJOAM3JYIhN8Fx5XiUqYI6c7fZCu9khBRUYVlxA-GIeX9YRAYc4-8G0LHR2DrONHmchDRZ7pwbXnPYBu9cDibb2qfzQo5E2geH9hfdfDIzJyiOdLDpcxNTgnE8XEtk7C7y-6zJSqpemjL6NMBRt9bB7HmOr7K-c'})` 
              }}
            />
            <div>
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                {post.user?.name || 'Unknown User'}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {formatDate(post.created_at || post.timeAgo)}
              </p>
            </div>
          </div>
          {onDelete && (
            <button 
              onClick={handleDelete}
              className="text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-500 transition-colors"
              aria-label="Delete post"
            >
              <span className="material-symbols-outlined">delete</span>
            </button>
          )}
        </div>

        {/* Post Content */}
        <p className="text-slate-600 dark:text-slate-300 mb-4 whitespace-pre-line">
          {post.content}
        </p>
        
        {/* Post Image */}
        {post.image && (
          <div className="mb-4 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 max-w-2xl mx-auto">
            <div className="relative">
              <img 
                src={post.image} 
                alt="Post content" 
                className="w-full h-auto max-h-80 object-contain mx-auto"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '';
                }}
                style={{
                  maxHeight: '320px',
                  maxWidth: '100%',
                  height: 'auto',
                  width: 'auto',
                  display: 'block',
                  margin: '0 auto'
                }}
              />
            </div>
          </div>
        )}

        {/* Post Stats */}
        <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-3 px-1">
          <div className="flex items-center">
            {likeCount > 0 && (
              <>
                <span className="flex items-center justify-center w-5 h-5 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-full text-xs mr-1">
                  ❤️
                </span>
                <span>{likeCount}</span>
              </>
            )}
          </div>
          <div>
            {commentCount > 0 && (
              <button 
                onClick={() => setShowComments(!showComments)}
                className="hover:underline"
              >
                {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
              </button>
            )}
          </div>
        </div>

        {/* Post Actions */}
        <div className="flex items-center justify-between border-t border-b border-slate-100 dark:border-slate-700 py-1 my-2">
          <button 
            onClick={handleLike}
            className={`flex-1 flex items-center justify-center py-2 rounded-lg transition-colors ${isLiked ? 'text-red-500' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
          >
            <span className={`material-symbols-outlined mr-2 ${isLiked ? 'fill-current' : ''}`}>
              {isLiked ? 'favorite' : 'favorite_border'}
            </span>
            <span className="font-medium">Like</span>
          </button>
          <button 
            onClick={() => setShowComments(!showComments)}
            className="flex-1 flex items-center justify-center py-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <span className="material-symbols-outlined mr-2">chat_bubble_outline</span>
            <span className="font-medium">Comment</span>
          </button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-3 space-y-3">
            {/* Comments List */}
            {comments.length > 0 ? (
              <div className="space-y-3 max-h-80 overflow-y-auto pr-2 -mr-2">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex items-start gap-2 group">
                    <div 
                      className="w-8 h-8 rounded-full bg-cover bg-center flex-shrink-0 mt-1"
                      style={{ 
                        backgroundImage: `url(${comment.user?.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-_yNXMQ0Wtoc0mNc7-AS3UMJI9_7LjnxW3BFPOMwjQoyQs20FJfs0SNsGhalHRoi3XrBrxz74y_VNBbOAt4UmkO6HP1fPblxNbyIgR9JndmjdtNJOAM3JYIhN8Fx5XiUqYI6c7fZCu9khBRUYVlxA-GIeX9YRAYc4-8G0LHR2DrONHmchDRZ7pwbXnPYBu9cDibb2qfzQo5E2geH9hfdfDIzJyiOdLDpcxNTgnE8XEtk7C7y-6zJSqpemjL6NMBRt9bB7HmOr7K-c'})` 
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="inline-block bg-slate-100 dark:bg-slate-800 rounded-2xl px-3 py-2">
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                          {comment.user?.name || 'Unknown User'}
                        </p>
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                          {comment.content || comment.text}
                        </p>
                      </div>
                      <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 mt-1 ml-2">
                        <span>{formatDate(comment.created_at || comment.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-2">
                No comments yet. Be the first to comment!
              </p>
            )}
            
            {/* Add Comment */}
            <form onSubmit={handleAddComment} className="flex items-center gap-2 mt-3">
              <div 
                className="w-8 h-8 rounded-full bg-cover bg-center flex-shrink-0"
                style={{ 
                  backgroundImage: `url(${currentUser?.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-_yNXMQ0Wtoc0mNc7-AS3UMJI9_7LjnxW3BFPOMwjQoyQs20FJfs0SNsGhalHRoi3XrBrxz74y_VNBbOAt4UmkO6HP1fPblxNbyIgR9JndmjdtNJOAM3JYIhN8Fx5XiUqYI6c7fZCu9khBRUYVlxA-GIeX9YRAYc4-8G0LHR2DrONHmchDRZ7pwbXnPYBu9cDibb2qfzQo5E2geH9hfdfDIzJyiOdLDpcxNTgnE8XEtk7C7y-6zJSqpemjL6NMBRt9bB7HmOr7K-c'})` 
                }}
              />
              <div className="flex-1 relative">
                <input 
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  className="w-full bg-slate-100 dark:bg-slate-800 border-0 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-slate-800 dark:text-slate-200 placeholder-slate-500 dark:placeholder-slate-400"
                />
                <button 
                  type="submit"
                  className="absolute right-1.5 top-1/2 transform -translate-y-1/2 text-primary-500 hover:text-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isCommenting || !commentText.trim()}
                  aria-label="Post comment"
                >
                  {isCommenting ? (
                    <span className="material-symbols-outlined text-xl animate-spin">refresh</span>
                  ) : (
                    <span className="material-symbols-outlined text-xl">send</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
