import styled from "styled-components";

export const ContainerInputs = styled.article`
  @import url("https://fonts.googleapis.com/css2?family=Raleway:wght@100&display=swap");
  font-family: "Raleway", sans-serif;
  border: 6px double black;
  width: 65vw;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 0;
  margin: 16px;
  min-width: fit-content;
`;
export const Musica = styled.section`
  display: flex;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;
  flex-wrap: wrap;
`;

export const Input = styled.input`
  width: 25vw;
  height: 10vh;
`;

export const Botao = styled.button`
  width: 12vw;
  height: 13vh;
  text-align: center;
`;
