import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export const LogoutRoute: React.FC = () => {
  const navigate = useNavigate();
  const [, setUserSession] = useLocalStorage<any>('kahawa-user-session', null);

  useEffect(() => {
    setUserSession(null);
    navigate('/auth/login');
  }, [navigate, setUserSession]);

  return (
    <div className="site-shell flex items-center justify-center p-12">
      <p className="text-sm text-[#6b5744]">Logging out...</p>
    </div>
  );
};

export default LogoutRoute;
