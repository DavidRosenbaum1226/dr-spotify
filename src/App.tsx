import React from 'react';
import useLocalStorageState from 'use-local-storage-state'
import { logInfo, redirectToSpotifyAuthorizeUrl, fetchAccessToken } from './spotify/SpotifyService';

const App: React.FC = () => {
  console.log('App render');
  logInfo();

  const [codeVerifier, setCodeVerifier] = useLocalStorageState<string>('verifier', { defaultValue: '' });
  const [accessToken, setAccessToken] = useLocalStorageState<string | null>('token', { defaultValue: null });
  // const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // If being redirected back from Spotify with a code, fetch the access token
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  console.log('code: ', code);
  if (code) {
    fetchAccessToken(code, codeVerifier)
      .then((data) => setAccessToken(data!))
      .catch((error) => console.error('Error fetching access token: ', error));
  }

  // If no access token is present, redirect to Spotify login with PKCE parameters
  if (!code && !accessToken) {
    redirectToSpotifyAuthorizeUrl(setCodeVerifier);
  }

  // if (accessToken && !userProfile) {
  //   getUserProfile(accessToken)
  //     .then((data) => setUserProfile(data))
  //     .catch((error) => {
  //       console.error('Error fetching profile: ', error);
  //       // redirectToSpotifyAuthorizationUrl()
  //     });
  // }

  return (
    <div>
      {/* <h2>User name: {userProfile?.display_name}</h2> */}
      <h2>Code: {code}</h2>
    </div>
  );
};

export default App;
