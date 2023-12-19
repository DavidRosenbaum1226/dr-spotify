import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { getProfile, CLIENT_ID, REDIRECT_URL, SPOTIFY_AUTHORIZE_URL } from './spotify/SpotifyService';

const generateRandomString = (length: number): string => {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset.charAt(randomIndex);
  }
  return result;
};

const generateCodeVerifier = (): string => {
  return generateRandomString(128);
};

const generateCodeChallenge = (codeVerifier: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const hashed = window.crypto.subtle.digest('SHA-256', data);
  return new Promise<string>((resolve) => {
    hashed.then((arrayBuffer) => {
      const byteArray = new Uint8Array(arrayBuffer);
      const codeChallenge = btoa(String.fromCharCode.apply(null, Array.from(byteArray)));
      resolve(codeChallenge.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_'));
    });
  });
};

const App: React.FC = () => {
  const [, setCodeVerifier] = useState<string>('');
  const [codeChallenge, setCodeChallenge] = useState<string>('');
  const [token, setToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const location = useLocation();

  useEffect(() => {
    const verifier = generateCodeVerifier();
    generateCodeChallenge(verifier).then((challenge) => {
      setCodeVerifier(verifier);
      setCodeChallenge(challenge);
    });
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const urlToken = urlParams.get('token');

    if (urlToken) {
      setToken(urlToken);
    } else {
      // If no token is present, redirect to Spotify login with PKCE parameters
      const params = new URLSearchParams({
        client_id: CLIENT_ID,
        response_type: "code",
        redirect_uri: REDIRECT_URL,
        scope: "user-read-private user-read-email",
        code_challenge_method: "S256",
        code_challenge: codeChallenge
      });
      window.location.href = `${SPOTIFY_AUTHORIZE_URL}?${params.toString()}`;
    }
  }, [location.search, codeChallenge]);

  useEffect(() => {
    if (token) {
      getProfile(token)
        .then((data) => setProfile(data))
        .catch((error) => console.error('Error fetching profile:', error));
    }
  }, [token]);

  return (
    <div>
      <h1>Spotify Profile</h1>
      {!token ? (
        // Link to Spotify login with necessary parameters for callback
        <Link to={`/login-callback${location.search}`}>Login to Spotify</Link>
      ) : profile ? (
        <div>
          <h2>Welcome, {profile.display_name}!</h2>
          <p>Email: {profile.email}</p>
          {/* Add more profile information as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
