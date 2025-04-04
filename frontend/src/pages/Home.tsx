// React query
import { verifyToken } from '@/services/authService';
import { useQuery } from '@tanstack/react-query';

// React router
import { Link } from 'react-router-dom';

export default function HomePage() {
  // const { isLoading, data } = useQuery({
  //   queryFn: verifyToken,
  //   queryKey: ['verifyToken'],
  //   retry: false,
  // });
<<<<<<< HEAD

  return <></>;
=======
  return (
    <>
      <h1>Home Page</h1>
      <Link to='/login'>Login</Link>
      <Link to='/signup'>Sign Up</Link>
    </>
  );
>>>>>>> 39da05f7266fb674b09f1c1b2a7c8a76d4ad4ca5
}
