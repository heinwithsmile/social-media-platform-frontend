import React from 'react';
import { Outlet } from 'react-router-dom';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <>
      <div className="font-sans dark:bg-background-dark min-h-screen">
        <header className="p-4 sticky top-0 z-10">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold ">Social</h1>
            <UserProfile />
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
