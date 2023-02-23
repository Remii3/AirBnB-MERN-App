import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <div className='mx-auto flex min-h-screen flex-col py-4 px-8'>
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
