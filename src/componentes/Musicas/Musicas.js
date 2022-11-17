import axios from "axios";
import React, { useEffect, useState } from "react";
import { headers } from "../../headers";
import {
  Botao,
  ContainerInputs,
  ContainerMusicas,
  InputMusica,
  Musica
} from "./styled";

export default function Musicas(props) {
  const [musicas, setMusicas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [artista, setArtista] = useState("");
  const [url, setUrl] = useState("");

  //   Exercício 3
  const pegarMusica = () => {
    axios
      .get(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`,
        headers
      )
      .then((res) => {
        setMusicas(res.data.result.tracks);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    pegarMusica();
  }, []);

  //   exercício 4
  const addMusica = () => {
    const body = {
      artist: artista,
      name: titulo,
      url
    };
    axios
      .post(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`,
        body,
        headers
      )
      .then((res) => {
        console.log(res);
        pegarMusica();
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  // exercício 5
  const apagarMusica = (id) => {
    axios
      .delete(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks/${id}`,
        headers
      )
      .then((res) => {
        console.log(res);
        pegarMusica();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <ContainerMusicas>
      <h2>{props.playlist.name}</h2>
      {musicas.map((musica) => {
        return (
          <Musica key={musica.id}>
            <h3>
              {musica.name} - {musica.artist}
            </h3>
            <audio src={musica.url} controls />
            <button onClick={() => apagarMusica(musica.id)}>X</button>
          </Musica>
        );
      })}
      <ContainerInputs>
        <InputMusica
          placeholder="artista"
          value={artista}
          onChange={(e) => setArtista(e.target.value)}
        />
        <InputMusica
          placeholder="musica"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <InputMusica
          placeholder="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Botao onClick={addMusica}>Adicionar musica</Botao>
      </ContainerInputs>
    </ContainerMusicas>
  );
}
