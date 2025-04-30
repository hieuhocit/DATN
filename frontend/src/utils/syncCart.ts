/* eslint-disable @typescript-eslint/no-explicit-any */
import { addMultipleToCart, getCart } from "@/services/cartService";
import { getEnrollments } from "@/services/enrollmentService";
import { getCartFromLocalStorage } from "./localStorage";

export const syncCart = async () => {
  const [enrollments, cart] = await Promise.all([getEnrollments(), getCart()]);

  const enrolledCourseIds = (enrollments as any[]).map((item) => item.courseId);
  const cartCourseIds = (cart as any[]).map((item) => item.courseId);

  const localCart = getCartFromLocalStorage();

  const filteredCart = localCart.filter(
    (item) =>
      !enrolledCourseIds.includes(item._id) && !cartCourseIds.includes(item._id)
  );

  const filteredCartIds = filteredCart.map((item) => item._id);

  await addMultipleToCart(filteredCartIds);
};
