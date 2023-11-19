// LoginCallback.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthentication = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        const response = await fetch('YOUR_TOKEN_EXCHANGE_ENDPOINT', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            grant_type: 'authorization_code',
            code: code || '',
            redirect_uri: 'YOUR_REDIRECT_URI',
            client_id: 'YOUR_CLIENT_ID',
            client_secret: 'YOUR_CLIENT_SECRET',
          }),
        });

        if (!response.ok) {
          throw new Error(`Token exchange failed! Status: ${response.status}`);
        }

        const data = await response.json();
        const fakeToken = data.access_token;

        navigate('/?token=' + fakeToken);
      } catch (error) {
        console.error('Error handling authentication:', error);
        // Handle the error (e.g., redirect to an error page)
      }
    };

    handleAuthentication();
  }, [navigate]);

  return <div>Logging in...</div>;
};

export default LoginCallback;
