import { useState } from "react";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { Card, CardContent, Typography } from "@mui/material";

export const Song = ({ sdk }: { sdk: SpotifyApi }) => {
    const [songInfo] = useState({
        name: "Song Name",
        artist: "Artist Name",
        album: "Album Name",
        duration: "3:30",
        url: "https://example.com/song.mp3"
    });

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                    {songInfo.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    {songInfo.artist}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                    {songInfo.album}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Duration: {songInfo.duration}
                </Typography>
                <audio controls>
                    <source src={songInfo.url} type="audio/mpeg" />
                </audio>
            </CardContent>
        </Card>
    );
}
