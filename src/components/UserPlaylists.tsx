import { useEffect, useState } from "react";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { DataGrid, GridColDef, GridValidRowModel } from "@mui/x-data-grid";

const columns: GridColDef[] = [
    { field: "playlist", headerName: "Playlist", width: 150 },
];

export const UserPlaylists = ({ sdk }: { sdk: SpotifyApi }) => {
    const [userPlaylistCount, setUserPlaylistCount] = useState<number>(0);
    const [userPlaylistPageRows, setUserPlaylistPageRows] = useState<GridValidRowModel[]>([]);

    useEffect(() => {
        (async () => {
            const userPlaylists = await sdk.currentUser.playlists.playlists(0);
            setUserPlaylistCount(userPlaylists.total);
            setUserPlaylistPageRows(userPlaylists.items.map(item => ({
                id: item.id,
                playlist: item.name,
            })));
        })();
    }, [sdk]);

    return (
        <>
            <DataGrid
                paginationMode="server"
                pageSizeOptions={[5, 10, 25]}
                autoPageSize
                rowCount={userPlaylistCount}
                rows={userPlaylistPageRows}
                columns={columns} />
        </>
    )
}
