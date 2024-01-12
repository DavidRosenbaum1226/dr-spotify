import { useEffect, useState } from "react";
import { SpotifyApi, UserProfile } from "@spotify/web-api-ts-sdk";
import { AppBar, Avatar, Box } from "@mui/material";

export const Header = ({ sdk }: { sdk: SpotifyApi }) => {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        (async () => {
            const userProfile = await sdk.currentUser.profile();
            setUserProfile(() => userProfile);
        })();
    }, [sdk]);

    return (
        <AppBar>
            <Avatar sx={{ m: 0.5, ml: 2 }} alt={userProfile?.display_name} src={userProfile?.images[0]?.url} />
            <Box sx={{ m: 0.5 }}>{userProfile?.display_name}</Box>
        </AppBar>
    );
}
