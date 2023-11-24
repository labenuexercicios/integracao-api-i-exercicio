import React, {  useState } from "react";
import Musicas from "../Musicas/Musicas";
import { ContainerPrincipal } from "./PlaylistStyles";

const playlistsLocal = [
    {
        id: 1,
        name: "Playlist 1"
    },
    {
        id: 2,
        name: "Playlist 2"
    },
    {
        id: 3,
        name: "Playlist 3"
    },
    {
        id: 4,
        name: "Playlist 4"
    },
]
function Playlists() {
    const [playlists, setPlaylists] = useState(playlistsLocal)
  
    return (
        <ContainerPrincipal>
            {playlists.map((playlist) => {
                return <Musicas key={playlist.id} playlist={playlist}/>
            })}

        </ContainerPrincipal>
    );
}

export default Playlists;
