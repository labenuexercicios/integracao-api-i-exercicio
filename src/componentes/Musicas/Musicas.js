import axios from 'axios'
import React, { useState } from 'react'
import { Botao, ContainerInputs, ContainerMusicas, InputMusica, Musica } from './styled'
import { useEffect } from 'react'

const musicasLocal = [{
    artist: "Artista 17",
    id: "1",
    name: "Musica17",
    url: "http://spoti4.future4.com.br/1.mp3"
},
{
    artist: "Artista 65",
    id: "2",
    name: "Musica65",
    url: "http://spoti4.future4.com.br/2.mp3"
},
{
    artist: "Artista 25",
    id: "3",
    name: "Musica25",
    url: "http://spoti4.future4.com.br/3.mp3"
}]

export default function Musicas(props) {
    const [musicas, setMusicas] = useState(musicasLocal)
    const [musica, setMusica] = useState([])
    const [nome, setNome] = useState("")
    const [artista, setArtista] = useState("")
    const [url, setUrl] = useState("")


    const getPlaylistTracks = () => {
        axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`, {
            headers: {
                Authorization: "giovanna-calegaro-ammalb"
            }
        })
        .then((resposta) => {
            setMusicas(resposta.data.result.tracks)
        })
        .catch((erro) => {
            console.log(erro)
        })

    }
    useEffect(() => {
        getPlaylistTracks()
    })


    const addTrackToPlaylist = () => {
        const body = {
            name: nome,
            artist: artista,
            url: url,
        }

        axios.post(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`, body, {
            headers: {
                Authorization: "giovanna-calegaro-ammalb"
            }
        })
        .then((resposta) => {

        })
        .catch((erro) => {
            console.log(erro)
        })
    }


    const removeTrackFromPlaylist= (id) => {
        axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks/${id}`, {
            headers: {
                Authorization: "giovanna-calegaro-ammalb"
            }
        })
        .then((resposta) => {

        })
        .catch((erro) => {
            console.log(erro)
        })
    }

    return (
        <ContainerMusicas>
            export default funcion Musicas(props){
                    <Musica key={musica.id}>
                        <h3>{musica.name} - {musica.artist}</h3>
                        <audio src={musica.url} controls />
                        <button>X</button>
                        <button onClick={() => removeTrackFromPlaylist(musica.id)}>X</button>
                    </Musica>}
            
            <ContainerInputs>
                <InputMusica placeholder="artista" />
                <InputMusica placeholder="musica" />
                <InputMusica placeholder="url" />
                <Botao>Adicionar musica</Botao>
                <InputMusica placeholder="artista" value={artista} onChange={(e) => setArtista(e.target.value)} />
                <InputMusica placeholder="musica" value={nome} onChange={(e) => setNome(e.target.value)} />
                <InputMusica placeholder="url" value={url} onChange={(e) => setUrl(e.target.value)} />
                <Botao onClick={addTrackToPlaylist}>Adicionar musica</Botao>
            </ContainerInputs>
        </ContainerMusicas>
    )
}
