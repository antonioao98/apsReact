import React, { useCallback } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Detalhes() {
  const navigation = useNavigation();

  const goToScreen = useCallback(screen => {
    navigation.navigate(screen);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 10 }}>Tela de Opcões</Text>
      <Button title="Home" color="#53afff" onPress={() => goToScreen('Home')} />
      <View style={styles.btn}>
        <Button
          title="Carrinho"
          color="#53afff"
          onPress={() => goToScreen('Carrinho')}
        />
      </View>
      <Button
        title="Opções"
        color="#53afff"
        onPress={() => goToScreen('Opções')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  btn: {
    marginVertical: '5%',
  },
});
