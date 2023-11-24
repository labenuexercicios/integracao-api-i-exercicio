import styled from "styled-components";

export const ContainerMusicas = styled.table`
  @import url("https://fonts.googleapis.com/css2?family=Raleway:wght@100&display=swap");
  font-family: "Raleway", sans-serif;
  border-radius: 10px;
  border: 0.2px solid #e1e1e1;
  width: 50vw;
  padding: 20px;
  margin: 10px;
  background-color: white;

  th {
    background-color: #a1a1a1;
    color: white;
    font-weight: bolder;
    border: 0.2px solid white;
    padding: 0px 10px;
    height: 5vh;
  
  }
  td {
    border: 0.2px solid #e1e1e1;
    padding: 0px 10px;
    
  }
`;
export const Musica = styled.tr`
  text-align: center;
  
`;
export const ContainerInputs = styled.div`
  display: flex;
  margin-top: 16px;
  justify-content: center;
  margin-bottom: 10px;
  gap: 5px;
`;
export const InputMusica = styled.input`
  width: 10vw;
`;

export const Botao = styled.button`
  width: 15vw;
  background-color: orange;
  color: white;
  border: none;
 
 
`;
