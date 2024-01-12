import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

const rows: GridRowsProp = [
    { id: 1, playlist: 'Chill Vibes' },
    { id: 2, playlist: 'Party Mix' },
    { id: 3, playlist: 'Workout Jams' },
];

const columns: GridColDef[] = [
    { field: 'playlist', headerName: 'Playlist', width: 150 },
];

export const Playlists = ({ sdk }: { sdk: SpotifyApi }) => {
    return (
        <div style={{ height: '100vh' }}>
            <DataGrid rows={rows} columns={columns} />
        </div>
    )
}
