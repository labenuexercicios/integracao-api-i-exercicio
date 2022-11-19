import axios from "axios";
import React, {  useState, useEffect } from "react";
import Musicas from "../Musicas/Musicas";


function Playlists() {
    const [playlists, setPlaylists] = useState([])
    
    const getPlaylists = () => {
        axios.get("https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists", {
            headers: {
                Authorization: "lucas-calabria-ammal"
            }
        })
        .then((resp) => {
            setPlaylists(resp.data.result.list)
        })
        .catch((erro)=> {
            console.log(erro)
        })
    }

    useEffect(()=> {
        getPlaylists()
},[])



    return (
        <div>
            {playlists.map((playlist) => {
                return <Musicas key={playlist.id} playlist={playlists} id={playlist.id} />
            })}

        </div>
    );
}

export default Playlists;
