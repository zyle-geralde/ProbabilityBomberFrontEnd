import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userId, setUserId] = useState('u123456'); // Example value from login
  // You can enhance this logic to read from session or API later

  // Professional way to derive role
  const isTeacher = userId?.startsWith('u12'); // or however your system defines roles

  return (
    <UserContext.Provider value={{ userId, isTeacher }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
