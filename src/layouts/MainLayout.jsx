import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';

const MainLayout = () => {
  return (
    <div className="min-h-screen w-full bg-background-light dark:bg-background-dark flex flex-col">
      <Header />
      <main className="flex-1 w-full">
        <div className="w-full max-w-full mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
