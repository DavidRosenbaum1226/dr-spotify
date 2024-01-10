import { useEffect, useState } from 'react'
import { useSpotify } from './hooks/useSpotify';
import { Scopes, SearchResults, SpotifyApi, UserProfile } from "@spotify/web-api-ts-sdk";
import Grid from '@mui/material/Unstable_Grid2';
import './App.css'

const App = () => {

  const sdk = useSpotify(
    import.meta.env.VITE_SPOTIFY_CLIENT_ID,
    import.meta.env.VITE_REDIRECT_TARGET,
    Scopes.userDetails
  );

  return sdk ? (<UI sdk={sdk} />) : SpotifyApiConnectError();
}

const UI = ({ sdk }: { sdk: SpotifyApi }) => (
  <Grid>
    <Header sdk={sdk} />
    <SpotifySearch sdk={sdk} />
  </Grid>
)

const Header = ({ sdk }: { sdk: SpotifyApi }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    (async () => {
      const userProfile = await sdk.currentUser.profile();
      setUserProfile(() => userProfile);
    })();
  }, [sdk]);

  return (
    <>
      <h1>Spotify Web API TypeScript SDK Demo</h1>
      <p>Logged in as: {userProfile?.display_name}</p>
    </>
  );
}

const SpotifySearch = ({ sdk }: { sdk: SpotifyApi }) => {
  const [results, setResults] = useState<SearchResults<["artist"]>>({} as SearchResults<["artist"]>);

  useEffect(() => {
    (async () => {
      const results = await sdk.search("The Beatles", ["artist"]);
      setResults(() => results);
    })();
  }, [sdk]);

  // generate a table for the results
  const tableRows = results.artists?.items.map((artist) => {
    return (
      <tr key={artist.id}>
        <td>{artist.name}</td>
        <td>{artist.popularity}</td>
        <td>{artist.followers.total}</td>
      </tr>
    );
  });

  return (
    <>
      <h1>Spotify Search for The Beatles</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Popularity</th>
            <th>Followers</th>
          </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </table>
    </>
  )
}

const SpotifyApiConnectError = () => {
  return (
    <>
      <h1>Spotify API Connection Error</h1>
      <p>There was an error connecting to the Spotify API. Please check the console for more details.</p>
    </>
  )
}

export default App;
