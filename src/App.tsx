import React, { useState, useEffect } from 'react';
import { ACCESS_TOKEN_KEY, redirectToAuthorizeUrl, fetchAccessToken, fetchUserProfile } from './spotify/SpotifyService';
import Button from '@mui/material/Button';

const App: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    // If being redirected back from Spotify with a code, fetch the access token
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code) {
      fetchAccessToken(code).then((token) => {
        if (token) {
          localStorage.setItem(ACCESS_TOKEN_KEY, token);
          // Redirect to remove the code from the URL
          window.location.href = window.location.origin;
        }
      }).catch((error) => console.error('Error fetching access token: ', error));
    }

    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!token) {
      redirectToAuthorizeUrl();
    } else {
      setAccessToken(token);
    }

    if (accessToken && !userProfile) {
      fetchUserProfile(accessToken)
        .then((data) => setUserProfile(data))
        .catch((error) => {
          console.error('Error fetching profile: ', error);
          redirectToAuthorizeUrl()
        });
    }
  }, [accessToken, userProfile]);

  return (
    <div>
      <Button variant="contained">Hello {userProfile?.display_name}</Button>
    </div>
  );
}

export default App;
