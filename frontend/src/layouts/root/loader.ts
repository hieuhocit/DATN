// Services
import { verifyToken } from '@/services/authService';

// Redux
import { store } from '@/store/store';
import { setAccountLoggedIn } from '@/features/account';

export async function loader() {
  const data = await verifyToken();

  if (data.statusCode === 200) {
    store.dispatch(setAccountLoggedIn(data.data));
    return data.data;
  }

  return null;
}
