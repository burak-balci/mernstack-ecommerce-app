import { useState, createContext, useContext, useEffect } from "react";
import { fetchMe } from "../api";
import { fetchLogout } from "../api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const me = await fetchMe();
        setLoggedIn(true);
        setUser(me);
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (user) {
      (async () => {
        try {
          setBasket(user.basket);
        } catch (e) {}
      })();
    }
  }, [user]);

  const login = (data) => {
    setLoggedIn(true);
    setUser(data.user);
    localStorage.setItem("access-token", data.accessToken);
    localStorage.setItem("refresh-token", data.refreshToken);
  };

  const logout = async (callback) => {
    setLoggedIn(false);
    // await fetchLogout();
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
    callback();
  };

  const values = {
    loggedIn,
    user,
    login,
    logout,
    setUser,
    setBasket,
    basket,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
