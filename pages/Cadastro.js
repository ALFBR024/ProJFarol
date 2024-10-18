import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, CheckBox } from 'react-native';
import UsuarioService from '../Services/UsuarioService';
import BibliotecaService from '../Services/BibliotecaService';

const Cadastro = ({ navigation }) => {
  const handlePress = () => {
    navigation.navigate('login');
  };

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cpf, setCPF] = useState('');
  const [celular, setCel] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedRole, setSelectedRole] = useState(''); // Estado para a checkbox selecionada
  const [campoComplementar, setCampoComplementar] = useState(''); // Campo adicional

  const usuario = new UsuarioService();
  const biblioteca = new BibliotecaService();

  const cadastrar = async (usuarioService, bibliotecaService) => {
    if (!nome || !email || !senha) {
      setErrorMessage('É necessário preencher todos os dados');
      setIsVisible(true);
    } else {
      setIsVisible(false);
      const usuarioExiste = await usuarioService.Exist(email);
      if (usuarioExiste.length > 0) {
        setErrorMessage('Usuário já cadastrado');
        console.log(usuarioExiste);
        setIsVisible(true);
      } else {
        setIsVisible(false);
        const novoUsuario = await usuarioService.Post({
          nome,
          email,
          senha,
        });
        bibliotecaService.Post({
          usuarioId: novoUsuario.id,
          livros: [],
        });

        navigation.navigate('home');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cadastre-se</Text>

      <TextInput
        style={styles.login2}
        placeholder="Nome"
        autoCapitalize="none"
        value={nome}
        onChangeText={(text) => setNome(text)}
      />
      <TextInput
        style={styles.login2}
        placeholder="CPF/CNPJ"
        autoCapitalize="none"
        value={cpf}
        onChangeText={(text) => setCPF(text)}
      />
      <TextInput
        style={styles.login2}
        placeholder="Email"
        keyboardAppearance="email-address"
        autoCapitalize="none"
        autoComplete="email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.login2}
        placeholder="Celular"
        keyboardAppearance="email-address"
        autoCapitalize="none"
        autoComplete="celular"
        value={celular}
        onChangeText={(text) => setCel(text)}
      />
      <TextInput
        style={styles.login2}
        placeholder="Estado"
        keyboardAppearance="email-address"
        autoCapitalize="none"
        autoComplete="estado"
        value={estado}
        onChangeText={(text) => setEstado(text)}
      />
      <TextInput
        style={styles.login2}
        placeholder="Cidade"
        keyboardAppearance="email-address"
        autoCapitalize="none"
        autoComplete="email"
        value={cidade}
        onChangeText={(text) => setCidade(text)}
      />
      <TextInput
        style={styles.login2}
        placeholder="Bairro"
        keyboardAppearance="email-address"
        autoCapitalize="none"
        autoComplete="email"
        value={bairro}
        onChangeText={(text) => setBairro(text)}
      />
      <TextInput
        style={styles.login2}
        placeholder="Logradouro"
        keyboardAppearance="email-address"
        autoCapitalize="none"
        autoComplete="email"
        value={logradouro}
        onChangeText={(text) => setLogradouro(text)}
      />
      <TextInput
        style={styles.login2}
        placeholder="Número"
        keyboardAppearance="email-address"
        autoCapitalize="none"
        autoComplete="email"
        value={numero}
        onChangeText={(text) => setNumero(text)}
      />
      <TextInput
        style={styles.login2}
        placeholder="Senha"
        autoCapitalize="none"
        secureTextEntry
        value={senha}
        onChangeText={(text) => setSenha(text)}
      />

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={selectedRole === 'advogado'}
          onValueChange={() => setSelectedRole(selectedRole === 'advogado' ? '' : 'advogado')}
        />
        <Text>É advogado?</Text>
      </View>

      {selectedRole === 'advogado' && (
        <TextInput
          style={styles.login2}
          placeholder="Insira a quantidade de atendimentos que gostaria de prover diariamente"
          value={campoComplementar}
          onChangeText={(text) => setCampoComplementar(text)}
          keyboardType="numeric" // Permite apenas entrada numérica
        />
      )}

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={selectedRole === 'psicologo'}
          onValueChange={() => setSelectedRole(selectedRole === 'psicologo' ? '' : 'psicologo')}
        />
        <Text>É psicólogo?</Text>
      </View>

      {selectedRole === 'psicologo' && (
        <TextInput
          style={styles.login2}
          placeholder="Insira a quantidade de atendimentos que gostaria de prover diariamente"
          value={campoComplementar}
          onChangeText={(text) => setCampoComplementar(text)}
          keyboardType="numeric" // Permite apenas entrada numérica
        />
      )}

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={selectedRole === 'instituicao'}
          onValueChange={() => setSelectedRole(selectedRole === 'instituicao' ? '' : 'instituicao')}
        />
        <Text>É uma instituição de apoio?</Text>
      </View>

      {selectedRole === 'instituicao' && (
        <TextInput
          style={styles.login2}
          placeholder="Insira a quantidade de quartos disponíveis"
          value={campoComplementar}
          onChangeText={(text) => setCampoComplementar(text)}
          keyboardType="numeric" // Permite apenas entrada numérica
        />
      )}

      <Pressable onPress={() => cadastrar(usuario, biblioteca)} style={styles.botao1}>
        <Text style={styles.botoes}>Cadastrar</Text>
      </Pressable>

      <Pressable onPress={handlePress}>
        <Text style={styles.text}>Já possuo cadastro</Text>
      </Pressable>

      {isVisible && <Text style={styles.span}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    justifyContent: 'center',
  },
  header: {
    fontSize: 30,
    color: '#565656',
    marginBottom: 20,
    marginTop: 20,
  },
  botoes: {
    fontSize: 15,
    color: '#565656',
    textAlign: 'center',
  },
  login1: {
    borderColor: '#FFEDED',
    backgroundColor: '#FFEDED',
    borderWidth: 1,
    borderRadius: 10,
    width: '80%',
    padding: 10,
    margin: 20,
    fontSize: 15,
    marginTop: 50,
    textAlign: 'left',
    color: '#565656',
  },
  login2: {
    borderColor: '#FFEDED',
    backgroundColor: '#FFEDED',
    borderWidth: 1,
    borderRadius: 10,
    width: '80%',
    padding: 10,
    margin: 20,
    fontSize: 15,
    textAlign: 'left',
    color: '#565656',
  },
  botao1: {
    backgroundColor: '#FFCACA',
    color: '#565656',
    width: '80%',
    padding: 10,
    margin: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default Cadastro;
