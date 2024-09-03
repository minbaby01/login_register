import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Logout = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['access_token']);

  const navigate = useNavigate();

  useEffect(() => {
    const logOut = async () => {
      try {
        removeCookie('access_token');
        navigate('/login');
      } catch (error) {
        console.error('Logout failed', error);
      }
    };

    logOut();
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
