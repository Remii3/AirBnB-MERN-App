import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import AccountNav from '../components/AccountNav';
import { UserContext } from '../context/UserContext';
import PlacesPage from './PlacesPage';

const ProfilePage = () => {
  const [redirect, setRedirect] = useState<null | string>(null);
  const { user, ready, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }

  const logout = async () => {
    await axios.post('/logout');
    setRedirect('/');
    setUser(null!);
  };

  if (!ready) {
    return <p>'Loading...';</p>;
  }

  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />;
  }
  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav />
      {subpage === 'profile' && (
        <div className='mx-auto max-w-lg text-center'>
          Logged in as {user?.name} ({user?.email})<br />
          <button onClick={logout} className='primary mt-2 max-w-sm'>
            Logout
          </button>
        </div>
      )}
      {subpage === 'places' && <PlacesPage />}
    </div>
  );
};

export default ProfilePage;
