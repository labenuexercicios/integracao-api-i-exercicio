import axios from 'axios'
import React, { useEffect, useState } from 'react'
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
    const [musicas , setMusicas] = useState([])
    const [artista , setArtista]= useState('')
    const [musica , setMusica]= useState('')
    const [urls , setUrl]= useState('')
    
    const onChangeArtista =(e)=>{
        setArtista(e.target.value)
    }
    const onChangeMusica =(e)=>{
        setMusica(e.target.value)
    }
    const onChangeUrl=(e)=>{
        setUrl(e.target.value)
    }

    const idDaPlaylist = props.playlist.id

    const config = {
        headers: {
            Authorization:'christhian-brandao-barbosa'
    },}
    
        
    const url = `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${idDaPlaylist}/tracks`

    function musicasApi(){
    
        axios.get(url,config)
        
        .then((response)=>{
            setMusicas(response.data.result.tracks)
        })
        
        .catch((error)=>{
            console.log(error.data.mensage)
        })
    }

    const addTracksToPlasylist = ()=>{
        const url2 = `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${idDaPlaylist}/tracks`
        const body = {
            name: musica,
            artist: artista,
            url: urls      
        }
        axios.post(url2,body,config)
        .then((response)=>{
            musicasApi();
        })
        .catch((error)=>{
            alert('error')
        })
    }

    const delet= (idMusica)=>{
        const url = `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${idDaPlaylist}/tracks/${idMusica}`
        axios.delete(url,config)
        .then((response)=>{
            musicasApi()
        }).catch((error)=>{
            alert('error delet')
        })
     }

    useEffect(()=>{
        musicasApi()
})
    return (
        <ContainerMusicas>
            <h2>{props.playlist.name}</h2>
            {musicas.map((musica) => {
                return (
                    <Musica key={musica.id}>
                        <h3>{musica.name} - {musica.artist}</h3>
                        <audio src={musica.url} controls />
                        <button onClick={()=>{delet(musica.id)}}>X</button>
                    </Musica>)
            })}
            <ContainerInputs>
                <InputMusica onChange={onChangeArtista} placeholder="artista" />
                <InputMusica onChange={onChangeMusica}placeholder="musica" />
                <InputMusica onChange={onChangeUrl}placeholder="url" />
                <Botao onClick={addTracksToPlasylist}>Adicionar musica</Botao>
            </ContainerInputs>
        </ContainerMusicas>
    )
}

