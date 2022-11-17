import React, { useState, useEffect } from "react";
import Musicas from "../Musicas/Musicas";
import axios from 'axios'

const musicasLocal = [
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
    
  ]
  function Playlists() {
    const [playlists, setPlaylists] = useState(musicasLocal)
    const input =  {
      headers:{
        authorization: "giovanna-calegaro-ammalb"
        }
    } 
   const pegarPlaylists = ()=> { 
     axios.get("https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists", input)
    .then((response)=>{
    console.log("Ok")
    console.log(response)
    setPlaylists(response.data.result.list)
  })
  .catch((error)=>{
    console.log("Erro")
    console.log(error)
  })
  }
  useEffect(()=>{
    pegarPlaylists()
  },[])
    return (
        <div>
            {playlists.map((playlist) =>{
                return <Musicas key={playlist.id} playlist={playlist} id={playlist.id}/>
            }
            )}
        </div>
    );
  }

  export default Playlists;