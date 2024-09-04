import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const TelaRastreamento = () => {
  const [selectedType, setSelectedType] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const wasteData = [
    { id: '1', type: 'Papel', quantity: 3, date: '13/08/2024', status: 'reciclado' },
    { id: '2', type: 'Metal', quantity: 3, date: '02/08/2024', status: 'reciclado' },
    { id: '3', type: 'Tinta', quantity: 1, date: '15/08/2024', status: 'não reciclado' },
    { id: '4', type: 'Tinta', quantity: 4, date: '02/08/2024', status: 'reciclado' },
    { id: '5', type: 'Futuros registros', quantity: '-', date: '-', status: '-' },
  ];

  const filterWasteData = () => {
    return wasteData.filter((item) => {
      return (
        (selectedType === '' || item.type === selectedType) &&
        (selectedDate === '' || item.date === selectedDate) &&
        (selectedStatus === '' || item.status === selectedStatus)
      );
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'reciclado':
        return { backgroundColor: '#90ee90', color: '#000' }; 
      case 'aguardando coleta':
        return { backgroundColor: '#ffea70', color: '#000' }; 
      case 'não reciclado':
        return { backgroundColor: '#ffcccb', color: '#000' }; 
      default:
        return { backgroundColor: '#d3d3d3', color: '#000' }; 
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={[styles.cell, getStatusColor(item.status)]}>{item.type}</Text>
      <Text style={[styles.cell, getStatusColor(item.status)]}>{item.quantity}</Text>
      <Text style={[styles.cell, getStatusColor(item.status)]}>{item.date}</Text>
      <Text style={[styles.cell, getStatusColor(item.status)]}>{item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>RASTREAMENTO DE RESÍDUOS</Text>
      
      <View style={styles.filterContainer}>
        <View style={styles.pickerContainer}>
          <Text>Tipo de resíduo:</Text>
          <Picker
            selectedValue={selectedType}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedType(itemValue)}
          >
            <Picker.Item label="Selecione" value="" />
            <Picker.Item label="Papel" value="Papel" />
            <Picker.Item label="Metal" value="Metal" />
            <Picker.Item label="Tinta" value="Tinta" />
          </Picker>
        </View>
        
        <View style={styles.pickerContainer}>
          <Text>Data:</Text>
          <Picker
            selectedValue={selectedDate}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedDate(itemValue)}
          >
            <Picker.Item label="Selecione" value="" />
            <Picker.Item label="13/08/2024" value="13/08/2024" />
            <Picker.Item label="02/08/2024" value="02/08/2024" />
            <Picker.Item label="15/08/2024" value="15/08/2024" />
          </Picker>
        </View>
        
        <View style={styles.pickerContainer}>
          <Text>Status:</Text>
          <Picker
            selectedValue={selectedStatus}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedStatus(itemValue)}
          >
            <Picker.Item label="Selecione" value="" />
            <Picker.Item label="reciclado" value="reciclado" />
            <Picker.Item label="aguardando coleta" value="aguardando coleta" />
            <Picker.Item label="não reciclado" value="não reciclado" />
          </Picker>
        </View>
      </View>

      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>Tipo</Text>
        <Text style={styles.headerCell}>Quantidade (kg)</Text>
        <Text style={styles.headerCell}>Data</Text>
        <Text style={styles.headerCell}>Status</Text>
      </View>

      <FlatList
        data={filterWasteData()}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListFooterComponent={() => (
          <View>
            <Text style={styles.footerTitle}>Total</Text>
            <View style={styles.tableFooter}>
              <Text style={styles.footerCell}>Tipo</Text>
              <Text style={styles.footerCell}>Total Gerado (kg)</Text>
              <Text style={styles.footerCell}>Total Reciclado (kg)</Text>
            </View>
            <View style={styles.tableFooter}>
              <Text style={styles.footerCell}>Tinta</Text>
              <Text style={styles.footerCell}>5</Text>
              <Text style={[styles.footerCell, getStatusColor('não reciclado')]}>4</Text>
            </View>
            <View style={styles.tableFooter}>
              <Text style={styles.footerCell}>Metal</Text>
              <Text style={styles.footerCell}>3</Text>
              <Text style={[styles.footerCell, getStatusColor('reciclado')]}>3</Text>
            </View>
            <View style={styles.tableFooter}>
              <Text style={styles.footerCell}>Papel</Text>
              <Text style={styles.footerCell}>3</Text>
              <Text style={[styles.footerCell, getStatusColor('não reciclado')]}>0</Text>
            </View>
          </View>
        )}
      />
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
  filterContainer: {
    flexDirection: 'row',  
    justifyContent: 'space-between',  
    alignItems: 'center',  
    marginBottom: 10,
  },
  pickerContainer: {
    flex: 1,  
    marginLeft: 5,  
    marginRight: 5,  
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
  },
  headerCell: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  footerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  tableFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
  },
  footerCell: {
    flex: 1,
    textAlign: 'center',
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default TelaRastreamento;