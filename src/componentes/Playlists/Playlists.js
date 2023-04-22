import axios from "axios";
import React, {  useEffect, useState } from "react";
import Musicas from "../Musicas/Musicas";

const playlistsLocal = [
    {
        id: 1,
        name: "Playlist 1"
    },
    {
        id: 2,
        name: "Playlist 2"
    },
    {
        id: 3,
        name: "Playlist 3"
    },
    {
        id: 4,
        name: "Playlist 4"
    },
]
function Playlists() {
    const [playlists, setPlaylists] = useState([])
    const [pesquisaMusica, setPesquisamusica] = useState("")
    const [criaPlaylist, setCriaplaylist] = useState("")
    const [atualizaPagina,setAtualizapagina] = useState(1)

    const headers = {
        headers: {
          Authorization: "gabriel-garuthi-conway"
        }
    }

    const recebePlaylist = () =>{
        axios.get("https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists", headers
        ).then((resposta) =>{
            // console.log(resposta.data.result.list)
            setPlaylists(resposta.data.result.list)
        }).catch((erro) =>{
            console.log(erro)
        })
      }
      
    useEffect(() =>{
        recebePlaylist()
    }, [])


    const pesquisaPlaylist = async () => {
        try {
           const response = await axios.get(
            `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/search?name=${pesquisaMusica}`, headers);
          console.log(response.data.result.playlist)
            setPlaylists(response.data.result.playlist)
            // recebePlaylist(response.data.result.playlist)
        } catch (error) {
          console.log(error.response);
        }
      };


    const criarPlaylist = async (nome) =>{
        const body ={
            name: nome
        }

        try {
            const resposta = await axios.post(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists`, body, headers)
            console.log(resposta)
            setPlaylists(resposta)
            recebePlaylist()
        } catch (error) {
            
        }
    }
    // useEffect(() =>{
    //     criarPlaylist()
    // }, [playlists])
    
    const criaPlaylist2 = () =>{
        setAtualizapagina(!atualizaPagina)
    }

    return (
        <div>
            <input value={pesquisaMusica} onChange = {(e) => setPesquisamusica(e.target.value)} placeholder="Digite o nome da playlist"></input>
            <button onClick={pesquisaPlaylist}>Enter</button>
            <button onClick={criaPlaylist2}>Criar Playlist</button>

            {atualizaPagina != 1 ? (
            <div>
            <input value={criaPlaylist} onChange={(e) =>{setCriaplaylist(e.target.value)}} placeholder="Digite o nome da playlist"></input>
            
            <button onClick={() => {criarPlaylist(criaPlaylist)}}>Criar</button>
            </div>

            )
            :
            (
                <div></div>
            )}

            {/* <button value={criaPlaylist} onChange={(e) =>{setCriaplaylist(e.target.value)}}>Criar Playlist</button> */}


            {playlists.map((playlist) => {
                return <Musicas key={playlist.id} playlist={playlist} recebePlaylist = {recebePlaylist}/>
            })}
        </div>
    );
}

export default Playlists;
