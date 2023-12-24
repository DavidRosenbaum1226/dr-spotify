import React, { useEffect, useState } from 'react';
import useLocalStorageState from 'use-local-storage-state'
import { SPOTIFY_AUTHORIZE_URL, SPOTIFY_REDIRECT_URL, SPOTIFY_CLIENT_ID, generateCodeVerifier, generateCodeChallenge, getAccessToken, getUserProfile } from './spotify/SpotifyService';

const App: React.FC = () => {
  console.log('App render');

  const [codeVerifier, setCodeVerifier] = useLocalStorageState<string>('verifier', { defaultValue: '' });
  const [accessToken, setAccessToken] = useLocalStorageState<string | null>('token', { defaultValue: null });
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // If no access token is present, redirect to Spotify login with PKCE parameters
  if (!accessToken) {
    const verifier = generateCodeVerifier();
    generateCodeChallenge(verifier).then((codeChallenge) => {
      setCodeVerifier(verifier);
      const params = new URLSearchParams({
        client_id: SPOTIFY_CLIENT_ID,
        response_type: "code",
        redirect_uri: SPOTIFY_REDIRECT_URL,
        scope: "user-read-private user-read-email",
        code_challenge_method: "S256",
        code_challenge: codeChallenge
      });
      window.location.href = `${SPOTIFY_AUTHORIZE_URL}?${params.toString()}`;
    });
  }

  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  console.log('code: ', code);
  if (code) {
    getAccessToken(SPOTIFY_CLIENT_ID, code, codeVerifier)
      .then((data) => setAccessToken(data.access_token))
      .catch((error) => console.error('Error fetching access token: ', error));
  }

  useEffect(() => {
    if (accessToken) {
      getUserProfile(accessToken)
        .then((data) => setUserProfile(data))
        .catch((error) => console.error('Error fetching profile:', error));
    }
  }, [accessToken]);

  return (
    <div>
      <h2>User name: {userProfile?.display_name}</h2>
    </div>
  );
};

export default App;
