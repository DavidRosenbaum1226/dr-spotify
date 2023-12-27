const CODE_VERIFIER_KEY = "verifier";
export const ACCESS_TOKEN_KEY = "token";
const CLIENT_ID = "6d20d69320624236b7bf5ab52a530966";
const REDIRECT_URL = "http://localhost:5173/callback";
const AUTHORIZATION_BASE_URL = 'https://accounts.spotify.com';
const AUTHORIZE_URL = AUTHORIZATION_BASE_URL + '/authorize';
const FETCH_ACCESS_TOKEN_URL = AUTHORIZATION_BASE_URL + '/api/token';
const API_BASE_URL = 'https://api.spotify.com/v1';
const FETCH_USER_PROFILE_URL = API_BASE_URL + '/me';

export const logInfo = (): void => {
  console.log('CLIENT_ID: ', CLIENT_ID);
  console.log('REDIRECT_URL: ', REDIRECT_URL);
  console.log('AUTHORIZE_URL: ', AUTHORIZE_URL)
  console.log('FETCH_ACCESS_TOKEN_URL: ', FETCH_ACCESS_TOKEN_URL);
  console.log('FETCH_USER_PROFILE_URL: ', FETCH_USER_PROFILE_URL);
};

export const redirectToAuthorizeUrl = (): void => {
  const verifier = generateCodeVerifier(128);
  localStorage.setItem(CODE_VERIFIER_KEY, verifier);

  generateCodeChallenge(verifier).then((challenge) => {
    const params = new URLSearchParams();
    params.append("client_id", CLIENT_ID);
    params.append("response_type", "code");
    params.append("redirect_uri", REDIRECT_URL);
    params.append("scope", "user-read-private user-read-email");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `${AUTHORIZE_URL}?${params.toString()}`;
  });
}

const generateCodeVerifier = (length: number): string => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  console.log('generateCodeVerifier: ', text);
  return text;
};

const generateCodeChallenge = async (codeVerifier: string) => {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export const fetchAccessToken = async (code: string) => {
  const verifier = localStorage.getItem(CODE_VERIFIER_KEY);

  const params = new URLSearchParams();
  params.append("client_id", CLIENT_ID);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", REDIRECT_URL);
  params.append("code_verifier", verifier!);

  const result = await fetch(FETCH_ACCESS_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params
  });

  const { access_token } = await result.json();
  return access_token;
}

export const fetchUserProfile = async (token: string) => {
  try {
    const response = await fetch(FETCH_USER_PROFILE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error with status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching profile: ', error);
    throw error;
  }
};
