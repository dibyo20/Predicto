import { useContext } from "react";
import { getSongs } from "../services/song.api";
import { SongContext } from "../song.context.jsx";

export const useSong = () => {
    const context = useContext(SongContext);

    if (context == undefined) {
        throw new Error("useSong must be used within a SongContextProvider");
    }

    const { song, setSong, loading, setLoading } = context;

    async function handlleGetSongs({ mood }) {
        setLoading(true);
        try {
            const res = await getSongs({ mood });
            setSong(res.songs);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return {
        song,
        handlleGetSongs,
        loading
    }
}
