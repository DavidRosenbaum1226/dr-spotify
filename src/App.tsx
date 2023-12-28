import React, { useEffect, useState } from 'react';
import { ACCESS_TOKEN_KEY, redirectToAuthorizeUrl, fetchAccessToken } from './spotify/SpotifyService';

const App: React.FC = () => {
  console.log('App render');

  const [accessToken, setAccessToken] = useState<string | null>(null);
  // const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    // If being redirected back from Spotify with a code, fetch the access token
    const params = new URLSearchParams(window.location.search);
    const codeParam = params.get("code");
    if (codeParam) {
      fetchAccessToken(codeParam)
        .then((token) => { if (token) { localStorage.setItem(ACCESS_TOKEN_KEY, token) } })
        .catch((error) => console.error('Error fetching access token: ', error));
    }

    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!token) {
      redirectToAuthorizeUrl();
    } else {
      setAccessToken(token);
    }

    // if (accessToken && !userProfile) {
    //   getUserProfile(accessToken)
    //     .then((data) => setUserProfile(data))
    //     .catch((error) => {
    //       console.error('Error fetching profile: ', error);
    //       // redirectToAuthorizeUrl()
    //     });
    // }
  }, []);

  return (
    <div>
      <h2>Access token: {accessToken}</h2>
    </div>
  );
}

export default App;
