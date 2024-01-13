import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

const rows: GridRowsProp = [
    { id: 1, playlist: 'Chill Vibes' },
    { id: 2, playlist: 'Party Mix' },
    { id: 3, playlist: 'Workout Jams' },
    { id: 4, playlist: 'Study Beats' },
    { id: 5, playlist: 'Road Trip Tunes' },
    { id: 6, playlist: 'Relaxing Piano' },
    { id: 7, playlist: 'Rock Classics' },
    { id: 8, playlist: 'Hip Hop Hits' },
    { id: 9, playlist: 'Indie Favorites' },
    { id: 10, playlist: 'Throwback Anthems' },
    { id: 11, playlist: 'EDM Bangers' },
    { id: 12, playlist: 'Country Hits' },
    { id: 13, playlist: 'R&B Grooves' },
    { id: 14, playlist: 'Pop Hits' },
    { id: 15, playlist: 'Jazz Essentials' },
];

const columns: GridColDef[] = [
    { field: 'playlist', headerName: 'Playlist', width: 150 },
];

export const Playlists = ({ sdk }: { sdk: SpotifyApi }) => {
    return (
        <>
            <DataGrid rows={rows} columns={columns} />
        </>
    )
}
