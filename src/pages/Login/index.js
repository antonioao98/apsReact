/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';

import firebase from '../../services/firebase';

export default function index({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function cadastrar() {
    navigation.navigate('Cadastrar');
  }

  function logar() {
    try {
      if (email && senha) {
        firebase
          .auth()
          .signInWithEmailAndPassword(email, senha)
          .then(() => {
            Alert.alert('Usuário cadastrado com sucesso !', 'Seja bem vindo');
            navigation.navigate('APS');
          })
          .catch(error => {
            if (error.code === 'auth/wrong-password') {
              Alert.alert(
                'Não foi possível efetuar o login',
                'Senha incorreta',
              );
            } else {
              console.log(error)
              Alert.alert(
                'Erro ao efetuar o login',
                'Verifique os dados e tente novamente',
              );
            }
          });
      } else {
        Alert.alert('Campos vazios', 'Por favor preencha os campos');
      }
    } catch (error) {
      Alert.alert('Ocorreu um erro', 'Não foi possível cadastrar o usuário');
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        onChangeText={text => {
          setEmail(text);
        }}
      />
      <TextInput
        placeholder="Senha"
        secureTextEntry={true}
        style={[styles.input, { marginTop: '3%' }]}
        onChangeText={text => {
          setSenha(text);
        }}
      />
      <TouchableOpacity style={styles.btnCadastrar} onPress={cadastrar}>
        <Text style={styles.txtCadastrar}>Cadastrar</Text>
      </TouchableOpacity>
      <View style={styles.button}>
        <Button title="Entrar" onPress={logar} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '5%',
  },
  title: {
    fontSize: 26,
    marginBottom: '10%',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#c7c7c7',
    width: '100%',
  },
  button: {
    width: '45%',
  },
  btnCadastrar: {
    marginVertical: '5%',
    alignSelf: 'flex-end',
  },
  txtCadastrar: {
    fontSize: 14,
  },
});
