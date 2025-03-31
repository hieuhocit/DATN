import axios from '@/configs/axiosConfig';

export const verifyToken = async () => {
  const data = await axios.post('/verify-token');
  return data;
};
