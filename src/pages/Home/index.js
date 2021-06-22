import React, { useCallback, useState } from 'react';
import { View, StyleSheet, Button, Text, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from '../../services/firebase';

export default function Detalhes() {
  const navigation = useNavigation();
  const [form, setForm] = useState({});

  function cadastrar() {
    try {
      const cadastro = firebase.database().ref('usuarios');

      const chave = cadastro.push().key;

      cadastro
        .child(chave)
        .set({
          nome: form.nome,
          sobrenome: form.sobrenome,
          idade: form.idade,
          pai: form.pai,
          mae: form.mae,
        })
        .then(() => {
          Alert.alert('Cadastrado com sucesso !');
          setForm({});
        });
    } catch (error) {
      console.log(error);
    }
  }

  const validar = useCallback(() => {
    const campos = ['nome', 'sobrenome', 'idade', 'pai', 'mae'];

    return campos.every(
      campo =>
        form[campo] !== undefined && form[campo] !== null && form[campo] !== '',
    );
  }, [form]);

  const goToScreen = useCallback(screen => {
    navigation.navigate(screen);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar</Text>
      <TextInput
        placeholder="Nome"
        style={styles.input}
        onChangeText={text => {
          setForm(prevState => ({ ...prevState, nome: text }));
        }}
        value={form.nome}
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
        placeholder="Idade"
        style={styles.input}
        onChangeText={text => {
          setForm(prevState => ({ ...prevState, idade: text }));
        }}
        value={form.idade}
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
