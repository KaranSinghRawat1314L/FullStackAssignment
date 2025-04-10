import { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
  uid: string | null;
  setUid: (uid: string | null) => void;
}

const UserContext = createContext<UserContextType>({
  uid:null,
  setUid: () => {}
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [uid, setUid] = useState<string | null>(null);
  return (
    <UserContext.Provider value={{ uid, setUid  }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser=()=>useContext(UserContext)