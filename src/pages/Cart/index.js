import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import firebase from '../../services/firebase';
export default function Listagem() {
  const [data, setData] = useState([]);

  useEffect(() => {
    firebase
      .database()
      .ref('usuarios')
      .on('value', snapshot => {
        setData([]);
        snapshot.forEach(item => {
          let data = {
            key: item.key,
            nome: item.val().nome,
            sobrenome: item.val().sobrenome,
            idade: item.val().idade,
            pai: item.val().pai,
            mae: item.val().mae,
          };
          setData(oldArray => [...oldArray, data]);
        });
      });
  }, []);

  return (
    <FlatList
      keyExtractor={data.key}
      data={data}
      renderItem={() => {
        return (
          <View style={styles.container}>
            <Text style={styles.titulo}>Nome: {data[0].nome}</Text>
            <View style={styles.body}>
              <View>
                <Text style={styles.text}>Sobrenome: {data[0].sobrenome}</Text>
                <Text style={styles.text}>Idade: {data[0].idade}</Text>
              </View>
              <View>
                <Text style={styles.text}>Pai: {data[0].pai}</Text>
                <Text style={styles.text}>Mãe: {data[0].mae}</Text>
              </View>
            </View>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#c7c7c7',
    marginHorizontal: '5%',
    marginTop: '5%',
    borderRadius: 12,
    padding: '5%',
  },
  titulo: {
    textAlign: 'center',
    marginBottom: '5%',
    fontSize: 18,
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  text: {
    fontSize: 16,
  },
});
