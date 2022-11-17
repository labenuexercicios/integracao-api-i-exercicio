import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { HeaderAutho } from '../Authorization'
import { Botao, ContainerInputs, ContainerMusicas, InputMusica, Musica } from './styled'

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
    const {playlist}=props 
    const [musicas, setMusicas] = useState([])
    const [artista , setArtista] =useState("")
    const [musica, setMusica] =useState("")
    const[urlMusica, setUrlrMusica] =useState("")


    const getPlaylistTracks = ()=>{
        axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${playlist.id}/tracks`,HeaderAutho
        ).then((resposta)=>{
            
            setMusicas(resposta.data.result.tracks)
        }).catch((erro)=>{
            console.log(erro);
        })
    
    }

    const addTrackToPlaylist = ()=>{
        const body ={
            name: musica, 
            artist: artista,
            url: urlMusica
        }

        axios.post(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${playlist.id}/tracks`, body ,HeaderAutho
        ).then((resposta)=>{
            getPlaylistTracks()
        }).catch((erro)=>{
            console.log(erro);
        })
    }

    const removeTrackFromPlaylist = (musica)=> {
        console.log(musica);
        axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${playlist.id}/tracks/${musica.id}`, HeaderAutho
        ).then((resposta)=>{
            getPlaylistTracks()
        }).catch((erro)=>{
            console.log(erro);
        })
    }


    useEffect(()=>{getPlaylistTracks() },[])


    return (
        <ContainerMusicas>
            <h2>{props.playlist.name}</h2>
            {musicas.map((musica) => {
                return (
                    <Musica key={musica.id}>
                        <h3>{musica.name} - {musica.artist}</h3>
                        <audio src={musica.url} controls />
                        <button onClick={()=>removeTrackFromPlaylist(musica)} >X</button>
                    </Musica>)
            })}
            <ContainerInputs>
                <InputMusica value={artista} onChange={(e)=>setArtista(e.target.value)} placeholder="artista" />
                <InputMusica value={musica} onChange={(e)=>setMusica(e.target.value)} placeholder="musica" />
                <InputMusica value={urlMusica} onChange={(e)=>setUrlrMusica(e.target.value)} placeholder="url" />
                <Botao  onClick={addTrackToPlaylist} >Adicionar musica</Botao>
            </ContainerInputs>
        </ContainerMusicas>
    )
}

