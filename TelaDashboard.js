import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const TelaDashboard = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>TOTAL DE RESÍDUOS COLETADOS</Text>
      <View style={styles.calendarContainer}>
        <Image source={require('./assets/total.jpg')} style={styles.calendarImage} />
      </View>

      <Text style={styles.sectionTitle}>TIPOS DE RESÍDUOS</Text>
      <Image source={require('./assets/tipos.jpg')} style={styles.chartImage} />

      <Text style={styles.sectionTitle}>STATUS DOS RESÍDUOS</Text>
      <Image source={require('./assets/status.jpg')} style={styles.chartImage} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  
  calendarImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  chartImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});

export default TelaDashboard;