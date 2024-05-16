import { useState } from "react";

const useCart = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => {
    setIsOpen((prevOpen) => !prevOpen);
  };

  return {
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    toggleCart,
  };
};

export default useCart;
