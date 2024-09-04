import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker'; 

const TelaRegistroResiduos = () => {
  const [type, setType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowCalendar(false);
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>REGISTRO DE RESÍDUOS</Text>

      <Text style={styles.label}>TIPO DE RESÍDUO</Text>
      <Picker
        selectedValue={type}
        onValueChange={(itemValue) => setType(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione o resíduo" value="" />
        <Picker.Item label="Papel" value="Papel" />
        <Picker.Item label="Plástico" value="Plástico" />
        <Picker.Item label="Tinta" value="Tinta" />
      </Picker>

      <Text style={styles.label}>QUANTIDADE</Text>
      <TextInput
        placeholder="Adicionar texto"
        keyboardType="numeric"
        style={styles.input}
        value={quantity}
        onChangeText={setQuantity}
      />

      <Text style={styles.label}>DATA</Text>
      <Button title="Selecionar Data" onPress={() => setShowCalendar(true)} />

      {showCalendar && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="SALVAR" onPress={() => {}} color="#4e73df" />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="CANCELAR" onPress={() => {}} color="#4e73df" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonWrapper: {
    marginHorizontal: 10, 
    width: 100, 
  },
});

export default TelaRegistroResiduos;