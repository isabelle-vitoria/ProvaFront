import { View, Pressable, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { Eye, EyeOff } from "lucide-react-native";
import { useEffect, useState } from "react";
import { api } from "@/utils/api";

export default function App() {

    const [email, setEmail] = useState('exemplo@exemplo.com');
    const [erroEmail, setErroEmail] = useState(false);

    const [senha, setSenha] = useState('Ex12345@');
    const [erroSenha, setErroSenha] = useState(false);

    const [SenhaConf, setSenhaConf] = useState('Ex12345@');
    const [erroSenhaConf, setErroSenhaConf] = useState(false);

    const [mostrarSenha, setMostrarSenha] = useState(true);
    const [mostrarSenhaConf, setMostrarSenhaConf] = useState(true);

    const [formularioValido, setFormularioValido] = useState(true);

    useEffect(()=>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if(email === 'exemplo@exemplo.com'){
            setFormularioValido(true)
        }
        else if(emailRegex.test(email)){
            setErroEmail(false)
            setFormularioValido(false)
        }
        else{
            setErroEmail(true)
            setFormularioValido(true)
        }
    }, [email])


    useEffect(()=>{
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
        
        if(senha === '123Pass@')
        {
            setFormularioValido(true)
        }
        else if(passwordRegex.test(senha)){
            setErroSenha(false)
            setFormularioValido(false)
        }
        else
        {
            setErroSenha(true)
            setFormularioValido(true)
        }
    }, [senha])

    useEffect(()=>{
        if(senha === SenhaConf){
            setErroSenhaConf(false)
        }   
        else{
            setErroSenhaConf(true)
        }
    }, [senha, SenhaConf])

    async function cadastrar() {
        try {
            console.log("Dados enviados:", { email, senha })
            const resposta = await api.post('/criarconta', {
                email: email,
                senha: senha
            });
            if(resposta.status === 201){
                alert('Cadastrado com sucesso!');
            }

            }
        catch (error: any) {
            if (error.response) {
                if (error.response.status === 409){
                    alert("Este email já está cadastrado.");
                }
                else if (error.response.status === 500){
                    alert("Erro inesperado no servidor. Tente novamente mais tarde.");
                } 
                else{
                    alert(`Erro ao cadastrar: ${error.response.status}`);
                }
            } else {
                alert("Erro de conexão. Verifique sua internet.");
            }
        }
    }

    return (
        <Tela>
            <Titulo>CRIAR CONTA</Titulo>
            
            <ContainerCampoTexto>

                {/* Campo Email */}
                <View>
                    <EmailContainer>
                    <Label> Email </Label>
                        <InputEmail
                            erro={erroEmail}
                            placeholder="Digite seu e-mail"
                            onChangeText={(text: string) => setEmail(text)}
                            autoCapitalize="none"
                        />
                    </EmailContainer>
                    {erroEmail ? <TextErrorHint>E-mail inválido</TextErrorHint> : null}
                </View>

                {/* Campo Senha */}
                <View>
                <Label> Senha </Label> 
                    <SenhaContainer>
                        <InputSenha
                            erro={erroSenha}
                            placeholder="Digite uma senha"
                            secureTextEntry={!mostrarSenha}
                            onChangeText={(text: string) => setSenha(text)}
                        />
                        <Pressable onPress={() => setMostrarSenha(!mostrarSenha)} style={styles.icone}>
                            {mostrarSenha ? <EyeOff size={24} color="#F0FFCE" /> : <Eye size={24} color="#F0FFCE" />}
                        </Pressable>
                    </SenhaContainer>
                    {erroSenha ? <TextErrorHint>Senha inválida</TextErrorHint> : null}
                </View>

                {/* Campo Confirmar Senha */}
                <View>
                <Label> Confirmar Senha </Label>
                    <SenhaContainer>
                        <InputSenha
                            erro={erroSenhaConf}
                            placeholder="Repita sua senha"
                            secureTextEntry={!mostrarSenhaConf}
                            onChangeText={(text: string) => setSenhaConf(text)}
                        />
                        <Pressable onPress={() => setMostrarSenhaConf(!mostrarSenhaConf)} style={styles.icone}>
                            {mostrarSenhaConf ? <EyeOff size={24} color="#F0FFCE" /> : <Eye size={24} color="#F0FFCE" />}
                        </Pressable>
                    </SenhaContainer>
                    {erroSenhaConf ? <TextErrorHint>Senhas diferentes</TextErrorHint> : null}
                </View>

            </ContainerCampoTexto>

            {/* Botão de Cadastro */}
            <ContainerBotoes>
                <Botao
                    disabled={formularioValido}
                    onPress={()=>{
                        cadastrar()}}
                >
                    <TextoBotao>Criar minha conta</TextoBotao>
                </Botao>

            </ContainerBotoes>
        </Tela>
    );
}

/* --- Styled Components --- */

const Titulo = styled.Text`
font-family: "Kanit";
color: #F0FFCE;
font-size: 50px;
margin-bottom: 100px;
margin-top: 150px;

`
const Label = styled.Text`
font-family: "Kanit";
color: #F0FFCE;
font-size: 20px;
`
const Tela = styled.View`
    flex: 1;
    background-color: #280004;
    padding: 26px;
`;

const ContainerCampoTexto = styled.View`
    gap: 25px;
`;

const ContainerBotoes = styled.View`
    margin-top: 65px;
    gap: 25px;
`;

const Botao = styled.Pressable`
    background-color: #F0FFCE;
    padding: 15px;
    border-radius: 10px;
`;

const TextoBotao = styled.Text`
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    color: #A53F2B;
`;

const Links = styled.Text`
    font-family: "Kanit";
    text-align: center;
    color: #F0FFCE;
    font-size: 18px;
`;

const TextErrorHint = styled.Text`
    font-size: 16px;
    color: #E63946;
`;

const SenhaContainer = styled.View`
    position: relative;
    width: 100%;
    margin-bottom: 10px;
`;

const InputSenha = styled.TextInput<{ erro?: boolean }>`
    width: 100%;
    height: 60px;
    padding: 12px;
    padding-right: 40px;
    background-color: #A53F2B;
    color: #F0FFCE;
    border: 2px solid ${({ erro }) => (erro ? '#D72638' : '#F0FFCE')};
    border-radius: 10px;
    margin-bottom: 10px;
`;

const EmailContainer = styled.View`
    position: relative;
    width: 100%;
`;

const InputEmail = styled.TextInput<{ erro?: boolean }>`
    width: 100%;
    height: 60px;
    padding: 12px;
    padding-right: 40px;
    background-color: #A53F2B;
    color: #F0FFCE;
    border: 2px solid ${({ erro }) => (erro ? '#D72638' : '#F0FFCE')};
    border-radius: 10px;
`;

const styles = StyleSheet.create({
    icone: {
        position: "absolute",
        right: 10,
        top: "50%",
        transform: [{ translateY: -12 }],
    },
});
