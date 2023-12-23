import React, { createContext } from 'react';
import useLog, { ILoggedToken, IUser } from '../hook/useLog';

interface AuthProviderProps {
    children: React.ReactNode;
}

interface AuthContextType {
    user: IUser | null,
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>,
    loading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    loggedToken: ILoggedToken,
    setLoggedToken: React.Dispatch<React.SetStateAction<ILoggedToken>>,
}

const defaultValue: AuthContextType = {
    user: null,
    setUser: () => { },
    loading: false,
    setLoading: () => { },
    loggedToken: { quix_token: '' },
    setLoggedToken: () => { },
};

export const AuthContext = createContext<AuthContextType>(defaultValue);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const authInfo = useLog();

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;