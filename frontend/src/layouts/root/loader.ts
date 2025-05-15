/* eslint-disable @typescript-eslint/no-explicit-any */
// Services
import { verifyToken } from "@/services/authService";

// Redux
import { store } from "@/store/store";
import { setAccountLoggedIn } from "@/features/account";
import { setEnrollments } from "@/features/account/accountSlice";
import { getEnrollments } from "@/services/enrollmentService";
import { getCart } from "@/services/cartService";
import { replaceCart } from "@/features/cart";

export async function loader() {
  const data = await verifyToken();

  if (data.statusCode === 200) {
    store.dispatch(setAccountLoggedIn(data.data));

    const res = await getEnrollments();
    store.dispatch(setEnrollments(res.data ?? []));

    const newCart = (await getCart()).data
      ?.map((item: any) => item.course?.[0])
      .filter((item: any) => item !== undefined);
    store.dispatch(replaceCart(newCart ?? []));

    return data.data;
  }

  return null;
}
