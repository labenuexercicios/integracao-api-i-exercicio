import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Botao, ContainerInputs, ContainerMusicas, InputMusica, Musica } from './styled'

const musicasLocal = [{
    artist: "Artista 1",
    id: "1",
    name: "Musica1",
    url: "http://spoti4.future4.com.br/1.mp3"
},
{
    artist: "Artista 2",
    id: "2",
    name: "Musica2",
    url: "http://spoti4.future4.com.br/2.mp3"
},
{
    artist: "Artista 3",
    id: "3",
    name: "Musica3",
    url: "http://spoti4.future4.com.br/3.mp3"
}]

export default function Musicas(props) {
    const [musicas, setMusicas] = useState([])
    const [nome, setNome] = useState("")
    const [artist, setArtista] = useState("")
    const [url, setUrl] = useState("")

    const headers = {
        headers: {
          Authorization: "gabriel-garuthi-conway"
        }
    }

    const pegaMusicas = () =>{
        axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`, headers
        ).then((resposta) =>{
            // console.log(resposta)
            setMusicas(resposta.data.result.tracks)
        }).catch((erro) =>{
            console.log(erro)
        })
    }
    useEffect(() =>{
        pegaMusicas()
    }, [])


    const novasMusicas = () =>{

        const novamusica = {
            name: nome,
            artist: artist,
            url: url
        }

        axios.post(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`, novamusica,  headers
        ).then(() =>{
            // console.log(resposta.data)
            pegaMusicas()
        }).catch((erro) =>{
            console.log(erro.response)
        })
    }



    const removeMusicas = (id) =>{
        axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks/${id}`, headers
        ).then((resposta) =>{
            console.log(resposta)
            pegaMusicas()
        }).catch((erro) =>{
            console.log(erro)
        })
    }

    const deletarPlaylist = async (id) => {
        try {
            await axios.delete(
            `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${id}`, headers);
        //   console.log(response.data.result.playlist)
            // setPlaylists(response.data.result.playlist)
            // recebePlaylist(response.data.result.playlist)
            props.recebePlaylist()
        } catch (error) {
          console.log(error.response);
        }
      };


    return (
        <ContainerMusicas>
            <button onClick={(e) => {deletarPlaylist(props.playlist.id)}}>Deletar</button>
            <h2>{props.playlist.name}</h2>
            {musicas.map((musica) => {
                return (
                    <Musica key={musica.id}>
                        <h3>{musica.name} - {musica.artist}</h3>
                        <audio src={musica.url} controls />
                        <button onClick={() =>{removeMusicas(musica.id)}}>X</button>
                    </Musica>)
            })}
            <ContainerInputs>
                <InputMusica value={artist} onChange={(e) => setArtista(e.target.value)} placeholder="artista" />
                <InputMusica value={nome} onChange={(e) => setNome(e.target.value)} placeholder="musica" />
                <InputMusica value={url} onChange={(e) => setUrl(e.target.value)} placeholder="url" />
                <Botao onClick={novasMusicas}>Adicionar musica</Botao>
            </ContainerInputs>
        </ContainerMusicas>
    )
}

