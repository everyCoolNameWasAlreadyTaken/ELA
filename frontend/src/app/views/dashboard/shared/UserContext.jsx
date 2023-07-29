import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
    const [userID, setUserID] = useState(0);

    return (
        <UserContext.Provider value={{ userID, setUserID }}>
            {children}
        </UserContext.Provider>
    );
};
