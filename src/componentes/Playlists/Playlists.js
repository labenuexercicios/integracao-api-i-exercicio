import React, {  useEffect, useState } from "react";
import Musicas from "../Musicas/Musicas";
import axios from "axios";
// const playlistsLocal = [
//     {
//         id: 1,
//         name: "Playlist 1"
//     },
//     {
//         id: 2,
//         name: "Playlist 2"
//     },
//     {
//         id: 3,
//         name: "Playlist 3"
//     },
//     {
//         id: 4,
//         name: "Playlist 4"
//     },
// ]



function Playlists() {
    const [playlists, setPlaylists] = useState([])
    const url = 'https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists'
    function playlistApi (){
        axios.get(url,{
            headers:{
                Authorization:'christhian-brandao-barbosa'
            }
        })
        .then((response)=>{
            setPlaylists(response.data.result.list)
        })
        .catch((error)=>{
            console.log(error.response.mensage)
        })
    }
    useEffect(()=>{
        playlistApi()
    },[])
  
    return (
        <>
            {playlists.map((playlist) => {
                return <Musicas key={playlist.id} playlist={playlist}/>
            })}

        </>
    );
}

export default Playlists;
