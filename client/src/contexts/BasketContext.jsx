import { useQuery } from "@tanstack/react-query";
import { useState, createContext, useContext } from "react";
import { fetchProducts, updateUser } from "../api";
import { useAuth } from "../contexts/AuthContext";

const BasketContext = createContext();

const BasketProvider = ({ children }) => {
  const { isLoading, isError } = useQuery(["product"], () => fetchProducts());
  const { user } = useAuth();
  const [items, setItems] = useState([]);

  if (isError) return <div>Error</div>;
  if (isLoading) return <div>Loading</div>;

  const addToBasket = async (data) => {
    await updateUser(data, user._id);
  };

  const emptyBasket = () => setItems([]);

  const values = {
    items,
    setItems,
    addToBasket,
    emptyBasket,
  };

  return (
    <BasketContext.Provider value={values}>{children}</BasketContext.Provider>
  );
};

const useBasket = () => useContext(BasketContext);

export { BasketProvider, useBasket };
