import { createContext, useState } from "react";

export const SongContext = createContext();

export const SongContextProvider = ({ Children }) => {
    const [song, setSong] = useState(false);
    const [loading, setLoading] = useState(false);

    return (
        <SongContext.Provider value={{ song, setSong, loading, setLoading }}>
            {Children}
        </SongContext.Provider>
    );
}