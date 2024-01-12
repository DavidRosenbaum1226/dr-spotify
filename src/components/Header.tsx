import { useEffect, useState } from "react";
import { SpotifyApi, UserProfile } from "@spotify/web-api-ts-sdk";
import { Avatar, Box, Stack } from "@mui/material";

export const Header = ({ sdk }: { sdk: SpotifyApi }) => {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        (async () => {
            const userProfile = await sdk.currentUser.profile();
            setUserProfile(() => userProfile);
        })();
    }, [sdk]);

    return (
        <Stack direction="row">
            <Avatar sx={{ m: 0.5 }} alt={userProfile?.display_name} src={userProfile?.images[0]?.url} />
            <Box sx={{ m: 0.5 }}>{userProfile?.display_name}</Box>
        </Stack>
    );
}
