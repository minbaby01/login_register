import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logOut = async () => {
      try {
        await axios.delete('/logout', { withCredentials: true });
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
