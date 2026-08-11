import { useCallback, useContext } from "react";
import { getSongs } from "../services/song.api";
import { SongContext } from "../song.context.jsx";

export const useSong = () => {
    const context = useContext(SongContext);

    if (context == undefined) {
        throw new Error("useSong must be used within a SongContextProvider");
    }

    const { song, setSong, loading, setLoading } = context;

    const handlleGetSongs = useCallback(async ({ mood }) => {
        setLoading(true);
        try {
            const res = await getSongs({ mood });
            setSong(res.songs);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, [setSong, setLoading]);

    return {
        song,
        handlleGetSongs,
        loading
    }
}
