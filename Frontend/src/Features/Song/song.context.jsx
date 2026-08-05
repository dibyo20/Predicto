/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

export const SongContext = createContext();

export const SongContextProvider = ({ children }) => {
    const [song, setSong] = useState(false);
    const [loading, setLoading] = useState(false);

    return (
        <SongContext.Provider value={{ song, setSong, loading, setLoading }}>
            {children}
        </SongContext.Provider>
    );
}