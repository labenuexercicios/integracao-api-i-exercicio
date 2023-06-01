import React, { useEffect, useState } from "react";
import {
  Botao,
  ContainerInputs,
  ContainerMusicas,
  InputMusica,
  Musica,
} from "./styled";
import axios from "axios";
import { BASE_URL } from "../../Constants/BASE_URL";
import Playlists from "../Playlists/Playlists";
import { AUTH_TOKEN } from "../../Constants/AUTH_TOKEN";

// const musicasLocal = [{
//     artist: "Artista 1",
//     id: "1",
//     name: "Musica1",
//     url: "http://spoti4.future4.com.br/1.mp3"
// },
// {
//     artist: "Artista 2",
//     id: "2",
//     name: "Musica2",
//     url: "http://spoti4.future4.com.br/2.mp3"
// },
// {
//     artist: "Artista 3",
//     id: "3",
//     name: "Musica3",
//     url: "http://spoti4.future4.com.br/3.mp3"
// }]

export default function Musicas(props) {
  const [musicas, setMusicas] = useState([]);

  useEffect(() => {
    pegaMusica();
  }, []);

  const pegaMusica = () => {
    axios
      .get(
        `${BASE_URL}/${props.playlist.id}/tracks`,
        {
          headers: {
            Authorization: AUTH_TOKEN,
          },
        }
      )
      .then((resposta) => {
        setMusicas(resposta.data.result.tracks);
      })
      .catch((erro) => {
        console.log(erro.response);
      });
  };

  const [artista, setArtista] = useState("");
  const [musica, setMusica] = useState("");
  const [url, setUrl] = useState("");

  const adicionaMusica = () => {
    const body = {
      name: musica,
      artist: artista,
      url: url,
    };
    axios
      .post(
        `${BASE_URL}${props.playlist.id}/tracks`,
        body,
        {
          headers: {
            Authorization: AUTH_TOKEN,
          },
        }
      )
      .then((resposta) => {
        pegaMusica();
        setArtista("");
        setMusica("");
        setUrl("");
      })
      .catch((erro) => {
        console.log(erro.response.data);
      });
  };

  const removeMusica = (musicaId) => {
    axios
      .delete(
        `${BASE_URL}/${props.playlist.id}/tracks/${musicaId}`,
        {
          headers: {
            Authorization: AUTH_TOKEN,
          },
        }
      )
      .then((resposta) => {
        console.log(resposta);
        pegaMusica();
      })
      .catch((erro) => {
        console.log(erro.response.data);
      });
  };
  const deletarPlaylist = async ()=>{
    try {
      await axios.delete(`${BASE_URL}/${props.playlist.id}`,{
        headers:{
          Authorization: AUTH_TOKEN
        }
      });
      alert("Playlist Removida")
      props.pegaPlaylist()
    } catch (erro) {
      console.log(erro.data)
    }
  }

  //   useEffect(() => {
  //     adicionaMusica();
  //   }, []);

  return (
    <ContainerMusicas>
      <h2>{props.playlist.name}</h2>
      <button onClick={deletarPlaylist}>Remover Playlist</button>
      {musicas.map((musica) => {
        return (
          <Musica key={musica.id}>
            <h3>
              {musica.name} - {musica.artist}
            </h3>
            <audio src={musica.url} controls />
            <button onClick={() => removeMusica(musica.id)}>X</button>
          </Musica>
        );
      })}
      <ContainerInputs>
        <InputMusica
          placeholder="artista"
          value={artista}
          onChange={(event) => setArtista(event.target.value)}
        />
        <InputMusica
          placeholder="musica"
          value={musica}
          onChange={(event) => setMusica(event.target.value)}
        />
        <InputMusica
          placeholder="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />
        <Botao onClick={adicionaMusica}>Adicionar musica</Botao>
      </ContainerInputs>
    </ContainerMusicas>
  );
}
