import { useState } from 'react';

const CreatePost = ({ user, onCreatePost }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset previous errors
    setError('');
    
    // Basic validation
    if (!content.trim()) {
      setError('Post content cannot be empty');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Call the parent component's handler
      const success = await onCreatePost(content, image);
      
      // Only clear the form if the post was created successfully
      if (success) {
        setContent('');
        setImage(null);
        setImagePreview('');
      }
    } catch (err) {
      console.error('Error in CreatePost form submission:', err);
      setError(err.message || 'Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="bg-card-light dark:bg-card-dark p-4 rounded-lg shadow-sm w-full max-w-none">
      <div className="flex items-start gap-4 w-full">
        <img 
          alt="User avatar" 
          className="h-10 w-10 rounded-full object-cover flex-shrink-0" 
          src={user.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-_yNXMQ0Wtoc0mNc7-AS3UMJI9_7LjnxW3BFPOMwjQoyQs20FJfs0SNsGhalHRoi3XrBrxz74y_VNBbOAt4UmkO6HP1fPblxNbyIgR9JndmjdtNJOAM3JYIhN8Fx5XiUqYI6c7fZCu9khBRUYVlxA-GIeX9YRAYc4-8G0LHR2DrONHmchDRZ7pwbXnPYBu9cDibb2qfzQo5E2geH9hfdfDIzJyiOdLDpcxNTgnE8XEtk7C7y-6zJSqpemjL6NMBRt9bB7HmOr7K-c'}
        />
        <div className="flex-1 min-w-0">
          <form onSubmit={handleSubmit} className="w-full">
            <textarea 
              className={`w-full bg-transparent border-none focus:ring-0 p-0 resize-none placeholder-subtle-light dark:placeholder-subtle-dark text-foreground-light dark:text-foreground-dark ${error && error.includes('content') ? 'border-red-500' : ''}`} 
              placeholder="What's happening in your world?" 
              rows="3"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                if (error && error.includes('content')) setError('');
              }}
              disabled={isSubmitting}
            />
            
            {error && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {error}
              </p>
            )}
            
            {imagePreview && (
              <div className="mt-2 relative w-full max-w-md mx-auto">
                <div className="relative">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="rounded-lg w-full h-auto max-h-60 object-contain bg-gray-100 dark:bg-gray-800 p-1"
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                      display: 'block',
                      margin: '0 auto'
                    }}
                  />
                  <button 
                    type="button"
                    onClick={() => {
                      setImage(null);
                      setImagePreview('');
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded-full hover:bg-red-600 transition-colors"
                    aria-label="Remove image"
                  >
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                </div>
              </div>
            )}
            
            <div className="flex flex-wrap justify-between items-center mt-4 gap-2">
              <div className="flex gap-2 text-subtle-light dark:text-subtle-dark">
                <label className="flex items-center gap-1 text-sm hover:bg-primary/10 p-2 rounded-lg transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-base">image</span>
                  Photo
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
                <button type="button" className="flex items-center gap-1 text-sm hover:bg-primary/10 p-2 rounded-lg transition-colors">
                  <span className="material-symbols-outlined text-base">videocam</span>
                  Video
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-subtle-light dark:text-subtle-dark">
                  {content.length}/500
                </span>
                <button 
                  type="submit" 
                  disabled={!content.trim()}
                  className="bg-primary text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 whitespace-nowrap"
                >
                  Share Post
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
