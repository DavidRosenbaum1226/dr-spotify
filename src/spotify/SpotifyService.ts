import React from "react";

const CLIENT_ID = "6d20d69320624236b7bf5ab52a530966";
const REDIRECT_URL = "http://localhost:5173";
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

export const redirectToAuthorizeUrl = (setCodeVerifier: React.Dispatch<React.SetStateAction<string>>): void => {
  const verifier = generateCodeVerifier();
  setCodeVerifier(verifier);
  console.log('redirectToSpotifyAuthorizeUrl: verifier: ', verifier);
  generateCodeChallenge(verifier).then((codeChallenge) => {
    console.log('redirectToSpotifyAuthorizeUrl: codeChallenge: ', codeChallenge);
    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      response_type: "code",
      redirect_uri: REDIRECT_URL,
      scope: "user-read-private user-read-email",
      code_challenge_method: "S256",
      code_challenge: codeChallenge
    });
    // window.location.href = `${AUTHORIZE_URL}?${params.toString()}`;
  });
}

export const generateCodeVerifier = (length: number): string => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export const generateCodeChallenge = async (codeVerifier: string) => {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export const fetchAccessToken = async (code: string, codeVerifier: string) => {
  const params = {
    client_id: CLIENT_ID,
    grant_type: "authorization_code",
    code,
    redirect_uri: REDIRECT_URL,
    code_verifier: codeVerifier!,
  };

  const result = await fetch(FETCH_ACCESS_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(params),
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
