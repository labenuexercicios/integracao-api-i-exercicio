import React, { useState, useEffect } from 'react'
import { Botao, ContainerInputs, ContainerMusicas, InputMusica, Musica } from './styled'
import axios from 'axios'


export default function Musicas(props) {
    const [musicas, setMusicas] = useState([])
    const [artist, setArtist] = useState([])
    const [music, setMusic] = useState([])
    const [link, setLink] = useState([])

    const onChangeArtist = (e) => {
        setArtist(e.target.value)
    }

    const onChangeMusic = (e) => {
        setMusic(e.target.value)
    }

    const onChangeLink = (e) => {
        setLink(e.target.value)
    }

    const getTracks = () => {
        axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.id}/tracks`, {
            headers: {
                Authorization: "lucas-calabria-ammal"
            }
        })
        .then((resp)=> {
            setMusicas(resp.data.result.tracks)
            console.log(resp.data)
        })
        .catch((erro)=> {
            console.log(erro)
        })
    }
    useEffect(()=> {
        getTracks()
    }, [])

    const createSong = () => {
        let body = {
            name: music,
            artist: artist,
            url: link
        }
        axios.post(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.id}/tracks`, body, {
            headers: {
                Authorization: "lucas-calabria-ammal"
            }
        })
        .then((resp)=> {
            console.log(resp)
            getTracks()
            setArtist("")
            setMusic("")
            setLink("")
        })
        .catch((erro)=> {
            console.log(erro)
        })
    }

    const removeMusic = (id) => {
        let trackId = id
        axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.id}/tracks/${trackId}`, {
            headers: {
                Authorization: "lucas-calabria-ammal"
            }
        })
        .then((resp)=> {
            console.log(resp)
            getTracks()
        })
        .catch((erro)=> {
            console.log(erro)
        })
    }

    return (
        <ContainerMusicas>
            <h2>{props.playlist.name}</h2>
            {musicas.map((musica) => {
                return (
                    <Musica key={musica.id}>
                        <h3>{musica.name} - {musica.artist}</h3>
                        <audio src={musica.url} controls />
                        <button onClick={()=>removeMusic(musica.id)} >X</button>
                    </Musica>)
            })}
            <ContainerInputs>
                <InputMusica placeholder="artista" value={artist} onChange={onChangeArtist} />
                <InputMusica placeholder="musica" value={music} onChange={onChangeMusic} />
                <InputMusica placeholder="url" value={link} onChange={onChangeLink} />
                <Botao onClick={()=> createSong()} >Adicionar musica</Botao>
            </ContainerInputs>
        </ContainerMusicas>
    )
}

