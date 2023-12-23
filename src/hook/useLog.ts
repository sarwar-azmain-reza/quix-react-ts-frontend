import { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { setToken } from '../services/plugins/axios';

export interface ILoggedToken {
  quix_token: string | null;
}

export interface IUser {
  email: string,
  exp: number,
  iat: number,
  role: string,
  _id: string
}

const useLog = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [loggedToken, setLoggedToken] = useState<ILoggedToken>({ quix_token: null });

  useEffect(() => {
    // // Perform localStorage action
    setLoading(true);
    const quix_token = localStorage.getItem('quix-token');
    setLoggedToken({ quix_token });
    setToken(quix_token || '');
    setLoading(false);

  }, [])


  useEffect(() => {
    const token = loggedToken.quix_token;
    if (token) {
      const decodedToken: any = jwtDecode(token);
      console.log({ decodedToken });
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('quix-token');
      } else {
        setUser(decodedToken);
      }
    }
    setLoading(false);
  }, [loggedToken]);

  return {
    user,
    setUser,
    loading,
    setLoading,
    loggedToken,
    setLoggedToken
  }
}

export default useLog;