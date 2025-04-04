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

  return (
    <>
      <h1>Home Page</h1>
      <Link to='/login'>Login</Link>
      <Link to='/signup'>Sign Up</Link>
    </>
  );
}
