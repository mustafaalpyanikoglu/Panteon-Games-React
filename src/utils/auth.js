import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export const isTokenValid = () => {
  const token = Cookies.get('token');
  if (!token) return false;

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime;
  } catch (error) {
    return false;
  }
};
