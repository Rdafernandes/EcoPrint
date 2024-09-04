import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const TelaLogin = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>EcoPrint</Text>
      <TextInput placeholder="e-mail" style={styles.input} />
      <TextInput placeholder="senha" style={styles.input} secureTextEntry />
      <Button title="Entrar" onPress={() => {}} />
      <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  forgotPassword: {
    textAlign: 'center',
    color: 'blue',
    marginTop: 10,
  },
});

export default TelaLogin;
