import React, { useEffect, useState } from "react";
import Musicas from "../Musicas/Musicas";
import axios from "axios";
import { BASE_URL } from "../../Constants/BASE_URL";
import { AUTH_TOKEN } from "../../Constants/AUTH_TOKEN";



function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [inputPesquisa, setImputPesquisa]= useState('')

  useEffect(() => {
    pegaPlaylist();
  }, []);

  const pegaPlaylist = async () => {
    try{
      const resposta = await axios.get(BASE_URL,{
        headers: {
          Authorization: AUTH_TOKEN,
        },
        });
        setPlaylists(resposta.data.result.list)
    } catch(erro){
        console.log(erro.response);
      };
  };

  const procuraPlayList = async ()=>{
    try {
      const resposta = await axios.get(
        `${BASE_URL}/search?name=${inputPesquisa}`,{
          headers:{Authorization: AUTH_TOKEN,
          },
        }
      );
      if (resposta.data.result.length === 0){
        alert("Playlist não encontrada");
      }else{
        setPlaylists(resposta.data.result.playlist)
        setImputPesquisa('')
      }      
    }catch(error){
      console.log(error.response);
    }
  };

  

  return (
    <div>
      <label forhtml="pesquisa">Pesquisar playlist</label>
      <input
        placeholder="Digite uma playlist"
        value ={inputPesquisa}
        onChange={(e)=>setImputPesquisa(e.target.value)}
        id="pesquisa"
        name="pesquisa"
      />
      <button onClick={procuraPlayList}>Pesquisar playlist</button>
      <button onClick={pegaPlaylist}>inicio</button>

      {playlists.map((playlist) => {
        return (
          <Musicas
            key={playlist.id}
            playlist={playlist}
            pegaPlaylist={pegaPlaylist}
          />
        );
      })}
    </div>
  );
}

export default Playlists;
