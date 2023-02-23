import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

import { ContextTypes } from '../types/interfaces';

interface UserContextProp {
  children: React.ReactNode;
}

export const UserContext = createContext<ContextTypes>({
  user: null,
  setUser: () => {
    return null;
  },
  ready: false,
});

export const UserContextProvider = ({ children }: UserContextProp) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!user) {
      axios.get('/profile').then(({ data }) => {
        setUser(data);
        setReady(true);
      });
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
};
