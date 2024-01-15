import { Scopes } from "@spotify/web-api-ts-sdk";
import { useSpotify } from './hooks/useSpotify';
import { Stack } from '@mui/material';
import { Header } from './components/Header.tsx';
import { UserPlaylists } from './components/UserPlaylists.tsx';
import { Playlist } from './components/Playlist.tsx';
import { Song } from './components/Song.tsx';

const App = () => {
  const sdk = useSpotify(
    import.meta.env.VITE_SPOTIFY_CLIENT_ID,
    import.meta.env.VITE_REDIRECT_TARGET,
    Scopes.userDetails
  );

  return sdk ? (
    <Stack>
      <Header sdk={sdk} />
      <Stack direction="row">
        <UserPlaylists sdk={sdk} />
        <Playlist sdk={sdk} />
        <Song sdk={sdk} />
      </Stack>
    </Stack>
  ) : (
    <>
      <h1>Spotify API Connection Error</h1>
      <p>There was an error connecting to the Spotify API. Please check the console for more details.</p>
    </>
  );
}

export default App;
