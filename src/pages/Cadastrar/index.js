import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import firebase from '../../services/firebase';

export default function index({ navigation }) {
  const [form, setForm] = useState({});

  function cadastrar() {
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(form.email, form.senha)
        .then(value => {
          firebase
            .database()
            .ref('usuarios')
            .child(value.user.uid)
            .set({
              nome: form.nome,
              sobrenome: form.sobrenome,
              pai: form.pai,
              mae: form.mae,
              idade: form.idade,
              email: form.email,
              senha: form.senha,
              cidade: form.cidade,
            })
            .then(() => {
              Alert.alert('Usuário cadastrado com sucesso !', 'Seja bem vindo');
              navigation.navigate('Login');
            });
        })
        .catch(err => {
          console.log(err.code);
          Alert.alert(
            'Não foi possível criar o seu cadastro',
            'Verifique os campos e tente novamente',
          );
        });
    } catch (error) {
      Alert.alert('Ocorreu um erro', 'Não foi possível cadastrar o usuário');
    }
  }

  const validar = useCallback(() => {
    const campos = [
      'nome',
      'sobrenome',
      'pai',
      'mae',
      'idade',
      'email',
      'senha',
      'cidade',
    ];

    return campos.every(
      campo =>
        form[campo] !== undefined && form[campo] !== null && form[campo] !== '',
    );
  }, [form]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar</Text>
      <TextInput
        placeholder="Nome"
        style={styles.input}
        onChangeText={text => {
          setForm(prevState => ({ ...prevState, nome: text }));
        }}
        value={form.name}
      />
      <TextInput
        placeholder="Sobrenome"
        style={styles.input}
        onChangeText={text => {
          setForm(prevState => ({ ...prevState, sobrenome: text }));
        }}
        value={form.sobrenome}
      />
      <TextInput
        placeholder="Pai"
        style={styles.input}
        onChangeText={text => {
          setForm(prevState => ({ ...prevState, pai: text }));
        }}
        value={form.pai}
      />
      <TextInput
        placeholder="Mãe"
        style={styles.input}
        onChangeText={text => {
          setForm(prevState => ({ ...prevState, mae: text }));
        }}
        value={form.mae}
      />
      <TextInput
        placeholder="Idade"
        style={styles.input}
        onChangeText={text => {
          setForm(prevState => ({ ...prevState, idade: text }));
        }}
        value={form.idade}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        onChangeText={text => {
          setForm(prevState => ({ ...prevState, email: text }));
        }}
        value={form.email}
      />
      <TextInput
        placeholder="Senha"
        secureTextEntry={true}
        style={styles.input}
        onChangeText={text => {
          setForm(prevState => ({ ...prevState, senha: text }));
        }}
        value={form.senha}
      />
      <TextInput
        placeholder="Cidade"
        style={styles.input}
        onChangeText={text => {
          setForm(prevState => ({ ...prevState, cidade: text }));
        }}
        value={form.cidade}
      />
      <View style={styles.button}>
        <Button
          title="Cadastrar"
          disabled={!validar()}
          onPress={() => cadastrar()}
        />
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
    marginTop: '3%',
  },
  button: {
    marginTop: 10,
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
