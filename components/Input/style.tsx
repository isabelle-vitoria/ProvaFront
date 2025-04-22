import styled from "styled-components/native";

type CampoTextoProps = {
    erro: boolean
}

export const CampoTexto = styled.TextInput<CampoTextoProps>`
    color: #F0FFCE;
    background-color: #A53F2B;
    font-size: 18px;
    padding: 20px;
    border-radius: 20px;
    border: 3px solid ${({erro} : {erro: boolean}) => erro ? '#D72638' :  '#F0FFCE'};
`