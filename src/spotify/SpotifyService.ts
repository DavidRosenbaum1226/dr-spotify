import React from "react";

const CLIENT_ID = "6d20d69320624236b7bf5ab52a530966";
const REDIRECT_URL = "http://localhost:5173";
const AUTHORIZATION_BASE_URL = 'https://accounts.spotify.com';
const AUTHORIZE_URL = AUTHORIZATION_BASE_URL + '/authorize';
const GET_TOKEN_URL = AUTHORIZATION_BASE_URL + '/api/token';
const API_BASE_URL = 'https://api.spotify.com/v1';
const GET_USER_PROFILE_URL = API_BASE_URL + '/me';

export function logInfo() {
  console.log('CLIENT_ID: ', CLIENT_ID);
  console.log('REDIRECT_URL: ', REDIRECT_URL);
  console.log('AUTHORIZE_URL: ', AUTHORIZE_URL)
  console.log('GET_TOKEN_URL: ', GET_TOKEN_URL);
  console.log('GET_USER_PROFILE_URL: ', GET_USER_PROFILE_URL);
}

export function redirectToSpotifyAuthorizeUrl(setCodeVerifier: React.Dispatch<React.SetStateAction<string>>) {
  const verifier = generateCodeVerifier();
  generateCodeChallenge(verifier).then((codeChallenge) => {
    setCodeVerifier(verifier);
    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      response_type: "code",
      redirect_uri: REDIRECT_URL,
      scope: "user-read-private user-read-email",
      code_challenge_method: "S256",
      code_challenge: codeChallenge
    });
    window.location.href = `${AUTHORIZE_URL}?${params.toString()}`;
  });
}

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

export async function fetchAccessToken(code: string, codeVerifier: string) {
  const params = {
    client_id: CLIENT_ID,
    grant_type: "authorization_code",
    code,
    redirect_uri: REDIRECT_URL,
    code_verifier: codeVerifier!,
  };

  const result = await fetch(GET_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(params),
  });

  const { access_token } = await result.json();
  return access_token;
}

export const fetchUserProfile = async (token: string) => {
  try {
    const response = await fetch(GET_USER_PROFILE_URL, {
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
