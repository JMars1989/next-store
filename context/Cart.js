import { use } from "marked";
import { createContext, useState, useEffect } from "react";

export const Context = createContext();

const Cart = ({ children }) => {
  const getInitialCart = () => JSON.parse(localStorage.getItem("cart"));
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const initialCart = getInitialCart();
    if (initialCart) {
      setCart(initialCart);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));

    let newTotal = 0;

    cart.forEach((item) => {
      newTotal += item.price * item.qty;
    });

    setTotal(newTotal);
  }, [cart]);

  const openCart = () => {
    setIsOpen(true);
  };

  const closeCart = () => {
    setIsOpen(false);
  };

  const addItemToCart = (product, qty = 1, size) => {
    const item = { ...product, qty, size: size };
    let incrementQty = false;

    const updatedCart = cart.map((i) => {
      if (i.id === item.id && i.size === item.size) {
        incrementQty = true;

        return {
          ...i,
          qty: (i.qty += 1),
        };
      } else {
        return i;
      }
    });

    if (incrementQty) {
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, qty, size }]);
    }
  };

  const removeItemFromCart = (id, size) => {
    const newCart = cart.filter((item) => {
      return item.id !== id && item.size !== size;
    });
    setCart(newCart);
  };

  const emptyCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const exposed = {
    cart,
    addItemToCart,
    removeItemFromCart,
    openCart,
    closeCart,
    isOpen,
    total,
    emptyCart,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export default Cart;
