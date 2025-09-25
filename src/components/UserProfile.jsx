import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../store/authThunks';

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center space-x-4 ">
      <div className="text-right">
        <p className="font-semibold">{user.name}</p>
        <p className="text-sm ">{user.email}</p>
      </div>
      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
        {user.name.charAt(0).toUpperCase()}
      </div>
      <button
        onClick={handleLogout}
        className="ml-2 px-4 py-2 bg-red-500/20 text-red-100 rounded-lg hover:bg-red-500/30 transition-colors"
      >
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
