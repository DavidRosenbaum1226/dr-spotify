import { useCallback, useEffect, useState } from "react";
import { MaxInt, SpotifyApi } from "@spotify/web-api-ts-sdk";
import { DataGrid, GridColDef, GridPaginationModel, GridValidRowModel } from "@mui/x-data-grid";

const columns: GridColDef[] = [
    { field: "playlist", headerName: "Playlist", width: 300 },
];

export const UserPlaylists = ({ sdk }: { sdk: SpotifyApi }) => {
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({ page: 0, pageSize: 5 })
    const [userPlaylistCount, setUserPlaylistCount] = useState<number>(0);
    const [userPlaylistPageRows, setUserPlaylistPageRows] = useState<GridValidRowModel[]>([]);

    const fetchPage = useCallback(async (model: GridPaginationModel) => {
        const userPlaylists = await sdk.currentUser.playlists.playlists(model.pageSize as MaxInt<50>, model.page * model.pageSize);
        setUserPlaylistCount(userPlaylists.total);
        setUserPlaylistPageRows(userPlaylists.items.map(item => ({
            id: item.id,
            playlist: item.name,
        })));
    }, [sdk]);


    const handlePaginationModelChange = (model: GridPaginationModel) => {
        setPaginationModel(model);
        fetchPage(model);
    };

    useEffect(() => {
        (async () => await fetchPage(paginationModel))();
    }, [fetchPage, paginationModel, sdk]);

    return (
        <>
            <DataGrid
                paginationMode="server"
                paginationModel={paginationModel}
                onPaginationModelChange={handlePaginationModelChange}
                pageSizeOptions={[5, 10, 25]}
                rowCount={userPlaylistCount}
                rows={userPlaylistPageRows}
                columns={columns} />
        </>
    )
}
