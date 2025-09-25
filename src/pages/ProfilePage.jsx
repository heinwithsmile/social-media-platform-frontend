import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Post from '../components/home/Post';

const ProfilePage = () => {
  const { username } = useParams();
  const currentUser = useSelector((state) => state.auth.user);
  const isCurrentUser = currentUser?.username === username;
  
  // Mock data - replace with actual data from your API
  const [profile, setProfile] = useState({
    username: 'alex_dev',
    email: 'demo@example.com',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMt5gzOWlt6HjeeyocGDOj5h2wql7nLaOmgWAiW3GQGEU_Gto8OugPqTm863ewJKKt-9eZsLQzoU9nEIJ6VaiQmvT71Jw_R2HIwVihOHZO5RJs0xoIcgoc0R2xaWpzWHAQJnLs1BZXBMckuZseCh6ioIhHm-GtAPLIfypZF-Vgr7pTrFMvb2E0_xkzcsoE0hyBwKhaZKB_GYYCf9rHlW29Q-p5ZEHb1ylfzSZqq8E0HziwAoA9cZav3Lp5o6BFb3Ui7rUoVNRcFmLX',
    stats: {
      posts: 120,
      likes: 345,
      comments: 230
    }
  });

  // Mock posts - replace with actual posts from your API
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: {
        id: 1,
        name: 'alex_dev',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMt5gzOWlt6HjeeyocGDOj5h2wql7nLaOmgWAiW3GQGEU_Gto8OugPqTm863ewJKKt-9eZsLQzoU9nEIJ6VaiQmvT71Jw_R2HIwVihOHZO5RJs0xoIcgoc0R2xaWpzWHAQJnLs1BZXBMckuZseCh6ioIhHm-GtAPLIfypZF-Vgr7pTrFMvb2E0_xkzcsoE0hyBwKhaZKB_GYYCf9rHlW29Q-p5ZEHb1ylfzSZqq8E0HziwAoA9cZav3Lp5o6BFb3Ui7rUoVNRcFmLX'
      },
      content: 'Check out my latest project, a web app for managing personal finances. It\'s built with React and Node.js.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDy-EgQpgYSsv7aOsKytExi3MuX3wVn6tgivNdSLXNzYEGHRQXIeLt6iX05WShxMpYKpQ2OdFF-8UgZlk8lvMZXVuDw6Jbb-5bvIs8wlAdxlsACvNxeH0HcunD5gajqXFjqCS3r7_hO5nIynYjZsqBMV6ynJz3JFQPePxCfoeubkJRNpV0_qDM1Xan8VRaDDr7Rx_GOMAAOMTFEcHRdmQzqmVnQPsHH6xyZiBmR0IzSe4s-YTFuhqqGoLlwZZdU3GS-Mn80Z_8TZFt_',
      likes: 15,
      comments: 3,
      createdAt: '2 hours ago'
    },
    {
      id: 2,
      user: {
        id: 1,
        name: 'alex_dev',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMt5gzOWlt6HjeeyocGDOj5h2wql7nLaOmgWAiW3GQGEU_Gto8OugPqTm863ewJKKt-9eZsLQzoU9nEIJ6VaiQmvT71Jw_R2HIwVihOHZO5RJs0xoIcgoc0R2xaWpzWHAQJnLs1BZXBMckuZseCh6ioIhHm-GtAPLIfypZF-Vgr7pTrFMvb2E0_xkzcsoE0hyBwKhaZKB_GYYCf9rHlW29Q-p5ZEHb1ylfzSZqq8E0HziwAoA9cZav3Lp5o6BFb3Ui7rUoVNRcFmLX'
      },
      content: 'Highly recommend this book for anyone interested in software development. It covers a wide range of topics from algorithms to system design.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-Vke6cD6i3NEYbmCZ6cNa7suFrrNkJBWx2K52b-tZ-hbP_rdHPReVLYH_MzOHLPszFbJbpfzrEjtaGtUkTcaqwYSvu9NHa21YYAM94B-8AUIbPFxGiurKBH9FPqprIlId9PSXQ4BC7mc3T01v6ZyCOuxPOQctN-M4InOB_xuDYaMO7s7rQj6UVL48LHLXco7iQ2rVIvpAMpDkG7gMDj0oWagGfJNvKSJCJxB4jv_OSqyAFm_rYgX905a5XKBPf-jMc94iU1LBpaqY',
      likes: 42,
      comments: 8,
      createdAt: '1 day ago'
    }
  ]);

  const handleDeletePost = (postId) => {
    // Handle post deletion
    setPosts(posts.filter(post => post.id !== postId));
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white dark:bg-background-dark/50 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-8 mb-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <div 
            className="w-32 h-32 rounded-full bg-cover bg-center ring-4 ring-white dark:ring-background-dark/50" 
            style={{ backgroundImage: `url(${profile.avatar})` }}
          />
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{profile.username}</h2>
            <p className="text-slate-500 dark:text-slate-400">{profile.email}</p>
          </div>
          <div className="flex items-center gap-6 text-slate-500 dark:text-slate-400 text-sm mt-2">
            <div className="text-center">
              <span className="font-bold text-slate-800 dark:text-slate-200">{profile.stats.posts}</span> Posts
            </div>
            <div className="text-center">
              <span className="font-bold text-slate-800 dark:text-slate-200">{profile.stats.likes}</span> Likes
            </div>
            <div className="text-center">
              <span className="font-bold text-slate-800 dark:text-slate-200">{profile.stats.comments}</span> Comments
            </div>
          </div>
        </div>
      </div>

      {/* User Posts */}
      <h3 className="text-xl font-bold text-slate-900 dark:text-white px-4 mb-4">
        {isCurrentUser ? 'Your Posts' : `${profile.username}'s Posts`}
      </h3>
      
      <div className="space-y-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Post 
              key={post.id} 
              post={post} 
              currentUser={currentUser}
              onDelete={isCurrentUser ? handleDeletePost : null}
            />
          ))
        ) : (
          <div className="text-center py-8 text-slate-500 dark:text-slate-400">
            No posts yet. {isCurrentUser && 'Start sharing your thoughts!'}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
