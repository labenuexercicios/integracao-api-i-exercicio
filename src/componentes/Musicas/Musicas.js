import React, { useState } from "react";
import {
  Botao,
  ContainerInputs,
  ContainerMusicas,
  InputMusica,
  Musica,
} from "./styled";

const musicasLocal = [
  {
    artist: "theAMPProject",
    id: "1",
    name: "lofi beats to code",
    url: "https://www.youtube.com/watch?v=f02mOEt11OQ&list=RDQMDrxX6HOm8Hs&index=2",
  },
  {
    artist: "Chill Music Lab",
    id: "2",
    name: "Chillstep para Programação",
    url: "https://www.youtube.com/watch?v=M5QY2_8704o&list=RDQMDrxX6HOm8Hs&index=1",
  },
  {
    artist: "Filfar",
    id: "3",
    name: "Hacking Music",
    url: "https://www.youtube.com/watch?v=Z6dIdJX4ens&list=RDQMDrxX6HOm8Hs&index=6",
  },
];

export default function Musicas(props) {
  const [musicas, setMusicas] = useState(musicasLocal);

  return (
    <>
      <h1>{props.playlist.name}</h1>
      <ContainerMusicas>
        <ContainerInputs>
          <InputMusica placeholder="artista" />
          <InputMusica placeholder="musica" />
          <InputMusica placeholder="url" />
          <Botao>Adicionar musica</Botao>
        </ContainerInputs>

        <tr>
          <th>URL/Música</th>
          <th>Artista</th>
          <th>Remover</th>
        </tr>

        {musicas.map((musica) => {
          return (
            <Musica key={musica.id}>
              <td>
                <a href={musica.url} target="blank">
                  {musica.name}{" "}
                </a>
              </td>
              <td>
                <p>{musica.artist}</p>
              </td>

              <td>
                <button>X</button>
              </td>
            </Musica>
          );
        })}
      </ContainerMusicas>
    </>
  );
}
