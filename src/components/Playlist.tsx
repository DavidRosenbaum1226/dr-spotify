import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

const rows: GridRowsProp = [
    { id: 1, song: 'Blinding Lights', artist: 'The Weeknd' },
    { id: 2, song: 'Dance Monkey', artist: 'Tones and I' },
    { id: 3, song: 'Watermelon Sugar', artist: 'Harry Styles' },
    { id: 4, song: 'Shape of You', artist: 'Ed Sheeran' },
    { id: 5, song: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars' },
    { id: 6, song: 'Closer', artist: 'The Chainsmokers ft. Halsey' },
    { id: 7, song: 'Thinking Out Loud', artist: 'Ed Sheeran' },
    { id: 8, song: 'Despacito', artist: 'Luis Fonsi ft. Daddy Yankee' },
    { id: 9, song: 'Somebody That I Used to Know', artist: 'Gotye ft. Kimbra' },
    { id: 10, song: 'Happy', artist: 'Pharrell Williams' },
    { id: 11, song: 'Bad Guy', artist: 'Billie Eilish' },
    { id: 12, song: 'Old Town Road', artist: 'Lil Nas X ft. Billy Ray Cyrus' },
    { id: 13, song: 'Radioactive', artist: 'Imagine Dragons' },
    { id: 14, song: 'Counting Stars', artist: 'OneRepublic' },
    { id: 15, song: 'Rolling in the Deep', artist: 'Adele' },
    { id: 16, song: 'Shallow', artist: 'Lady Gaga ft. Bradley Cooper' },
    { id: 17, song: 'All of Me', artist: 'John Legend' },
    { id: 18, song: 'Can\'t Stop the Feeling!', artist: 'Justin Timberlake' },
    { id: 19, song: 'Wrecking Ball', artist: 'Miley Cyrus' },
    { id: 20, song: 'Royals', artist: 'Lorde' },
];

const columns: GridColDef[] = [
    { field: 'song', headerName: 'Song', width: 150 },
    { field: 'artist', headerName: 'Artist', width: 150 },
];

export const Playlist = ({ sdk }: { sdk: SpotifyApi }) => {
    return (
        <>
            <DataGrid rows={rows} columns={columns} />
        </>
    )
}
