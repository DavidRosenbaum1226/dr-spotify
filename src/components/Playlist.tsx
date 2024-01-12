import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

const rows: GridRowsProp = [
    { id: 1, song: 'Blinding Lights', artist: 'The Weeknd' },
    { id: 2, song: 'Dance Monkey', artist: 'Tones and I' },
    { id: 3, song: 'Watermelon Sugar', artist: 'Harry Styles' },
];

const columns: GridColDef[] = [
    { field: 'song', headerName: 'Song', width: 150 },
    { field: 'artist', headerName: 'Artist', width: 150 },
];

export const Playlist = ({ sdk }: { sdk: SpotifyApi }) => {
    return (
        <div style={{ height: '100vh' }}>
            <DataGrid rows={rows} columns={columns} />
        </div>
    )
}
