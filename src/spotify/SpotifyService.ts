const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1';
export const SPOTIFY_AUTHORIZE_URL = 'https://accounts.spotify.com/authorize';
export const SPOTIFY_REDIRECT_URL = "http://localhost:5173";
export const SPOTIFY_CLIENT_ID = "6d20d69320624236b7bf5ab52a530966";

const generateRandomString = (length: number): string => {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset.charAt(randomIndex);
  }
  return result;
};

export const generateCodeVerifier = (): string => {
  return generateRandomString(128);
};

export const generateCodeChallenge = (codeVerifier: string): Promise<string> => {
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

export async function getAccessToken(clientId: string, code: string, codeVerifier: string) {
  const params = {
    client_id: clientId,
    grant_type: "authorization_code",
    code,
    redirect_uri: SPOTIFY_REDIRECT_URL,
    code_verifier: codeVerifier!,
  };

  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(params),
  });

  const { access_token } = await result.json();
  return access_token;
}

export const getUserProfile = async (token: string) => {
  try {
    const response = await fetch(`${SPOTIFY_API_BASE_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};