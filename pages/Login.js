import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Pressable, TouchableOpacity, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import UsuarioService from '../Services/UsuarioService'

const Login = ({ navigation }) => {

  const handlePress = () => {
    navigation.navigate('cadastro');
  };

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const usuario = new UsuarioService();

  const logar = async (usuarioService) => {
    if (!email || !senha) {

      setErrorMessage("Preencha todos os dados")
      setIsVisible(true)

    } else {

      setIsVisible(false)
      const usuarioExiste = await usuarioService.Exist(email, senha)

      if (usuarioExiste) {

        try {
          await AsyncStorage.setItem('usuarioData', JSON.stringify(usuarioExiste[0]));
        } catch (error) {
          console.error('Erro ao salvar no AsyncStorage:', error);
        }

        navigation.navigate('home');

      } else {

        setErrorMessage("E-mail ou senha incorretos")
        setIsVisible(true)

      }
    }
  }

  return (

    <View style={styles.container}>

      <Text style={styles.header}> FAROL </Text>

      <View style={styles.foto}>
        <Image style={styles.fotoImg} source={require('../img/farol-3.png')}/>          
      </View>

      <TextInput style={styles.login1}
        placeholder="Email"
        keyboardAppearance="email-address"
        autoCapitalize="none"
        autoComplete="email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput style={styles.login2}
        placeholder="Senha"
        autoCapitalize="none"
        secureTextEntry
        value={senha}
        onChangeText={(text) => setSenha(text)}
      />

      <TouchableOpacity onPress={() => logar(usuario)} style={styles.botao1} >
        <Text style={styles.botoes}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handlePress}>
        <Text style={styles.botoes}>Cadastre-se</Text>
      </TouchableOpacity>


      {isVisible && <Text style={styles.span}>{errorMessage}</Text>}

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#F4F4F4",
    justifyContent: "center"
  },
  header: {
    fontSize: 50,
    color: "#FF6A73",
    marginBottom: 15,
  },
  botoes: {
    fontSize: 15,
    color: "#565656",
    textAlign: "center",
  },
  login1: {
    borderColor: "#fef5da",
    borderWidth: 1,
    borderRadius: 10,
    width: '80%',
    padding: 10,
    margin: 20,
    fontSize: 25,
    marginTop: 50,
    textAlign: "center",
    backgroundColor: "#FFFFFF",
    color: "#565656",
    fontSize: 15,
  },
  login2: {
    borderColor: "#fef5da",
    borderWidth: 1,
    borderRadius: 10,
    width: '80%',
    padding: 10,
    margin: 20,
    fontSize: 25,
    textAlign: "center",
    backgroundColor: "#FFFFFF",
    color: "#565656",
    fontSize: 15,
  },
  botao1: {
    backgroundColor: "#FFCACA",
    color: "#565656",
    width: '80%',
    padding: 10,
    margin: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  botao2: {
    backgroundColor: "#FFFFFF",
    width: '80%',
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    alignItems: 'center',
  },

  foto:{    
    position:'center',
    width:250,
    height:250
    
  },

  fotoImg:{
    position:'center',
    width:250,
    height:250
  }


})

export default Login;
