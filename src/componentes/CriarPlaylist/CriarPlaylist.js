import axios from "axios";
import React, { useState } from "react";
import { headers } from "../../headers";
import { Input } from "./styled";
import { Botao, ContainerInputs } from "./styled";

//  =========================
//           EXTRA
//             -
//       CRIAR PLAYLIST
//  =========================

export default function CriarPlaylist(props) {
  const [titulo, setTitulo] = useState("");

  //   exercício 4
  const addPlaylist = () => {
    const body = {
      name: titulo
    };
    axios
      .post(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists`,
        body,
        headers
      )
      .then((res) => {
        console.log(res);
        props.pegaPlaylists();
        setTitulo("");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <ContainerInputs>
      <Input
        placeholder="Nova Playlist"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <Botao onClick={addPlaylist}>Add Playlist</Botao>
    </ContainerInputs>
  );
}
