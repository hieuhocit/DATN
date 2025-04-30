import { Course } from "@/types";

export const getCartFromLocalStorage = (): Course[] => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

export const saveCartToLocalStorage = (cart: Course[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};
