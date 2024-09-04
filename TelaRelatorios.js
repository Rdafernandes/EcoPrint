import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from '@react-native-picker/picker';

const TelaRelatorios = () => {
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

  const [maxColumnWidths, setMaxColumnWidths] = useState({
    type: 0,
    quantity: 0,
    date: 0,
    status: 0,
  });

  const wasteData = [
    { id: '1', type: 'Papel', quantity: '3', date: '13/08/2024', status: 'reciclado' },
    { id: '2', type: 'Metal', quantity: '3', date: '02/08/2024', status: 'reciclado' },
    { id: '3', type: 'Tinta', quantity: '1', date: '15/08/2024', status: 'não reciclado' },
    { id: '4', type: 'Tinta', quantity: '4', date: '02/08/2024', status: 'reciclado' },
    { id: '5', type: 'Papel', quantity: '2', date: '10/09/2024', status: 'reciclado' },
    { id: '6', type: 'Metal', quantity: '5', date: '18/09/2024', status: 'aguardando coleta' },
    { id: '7', type: 'Tinta', quantity: '3', date: '23/09/2024', status: 'não reciclado' },
    { id: '8', type: 'Papel', quantity: '7', date: '12/10/2024', status: 'aguardando coleta' },
    { id: '9', type: 'Metal', quantity: '6', date: '05/11/2024', status: 'reciclado' },
    { id: '10', type: 'Tinta', quantity: '2', date: '28/11/2024', status: 'reciclado' },
    { id: '11', type: 'Papel', quantity: '1', date: '02/12/2024', status: 'não reciclado' },
    { id: '12', type: 'Metal', quantity: '8', date: '15/12/2024', status: 'aguardando coleta' },
    { id: '13', type: 'Tinta', quantity: '5', date: '20/12/2024', status: 'reciclado' },
    { id: '14', type: 'Papel', quantity: '9', date: '29/12/2024', status: 'reciclado' },
  ];

  const showStartDatePicker = () => {
    setStartDatePickerVisibility(true);
  };

  const hideStartDatePicker = () => {
    setStartDatePickerVisibility(false);
  };

  const handleStartDateConfirm = (date) => {
    setStartDate(date);
    hideStartDatePicker();
  };

  const showEndDatePicker = () => {
    setEndDatePickerVisibility(true);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisibility(false);
  };

  const handleEndDateConfirm = (date) => {
    setEndDate(date);
    hideEndDatePicker();
  };

  const filterWasteData = () => {
    return wasteData.filter((item) => {
      const withinDateRange =
        (!startDate || new Date(item.date) >= startDate) &&
        (!endDate || new Date(item.date) <= endDate);
      return (
        (selectedType === '' || item.type === selectedType) &&
        (selectedStatus === '' || item.status === selectedStatus) &&
        withinDateRange
      );
    });
  };

  const measureColumnWidth = (event, column) => {
    const width = event.nativeEvent.layout.width;
    setMaxColumnWidths((prevWidths) => ({
      ...prevWidths,
      [column]: Math.max(prevWidths[column], width),
    }));
  };

  const renderItem = ({ item }) => (
    <View style={[styles.row, styles.rowSpacing]}>
      <Text
        style={[styles.cell, getStatusColor(item.status), { width: maxColumnWidths.type }]}
        onLayout={(event) => measureColumnWidth(event, 'type')}
      >
        {item.type}
      </Text>
      <Text
        style={[styles.cell, getStatusColor(item.status), { width: maxColumnWidths.quantity }]}
        onLayout={(event) => measureColumnWidth(event, 'quantity')}
      >
        {item.quantity}
      </Text>
      <Text
        style={[styles.cell, getStatusColor(item.status), { width: maxColumnWidths.date }]}
        onLayout={(event) => measureColumnWidth(event, 'date')}
      >
        {item.date}
      </Text>
      <Text
        style={[styles.cell, getStatusColor(item.status), { width: maxColumnWidths.status }]}
        onLayout={(event) => measureColumnWidth(event, 'status')}
      >
        {item.status}
      </Text>
    </View>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'reciclado':
        return { backgroundColor: '#90ee90' }; // Verde
      case 'aguardando coleta':
        return { backgroundColor: '#ffea70' }; // Amarelo
      case 'não reciclado':
        return { backgroundColor: '#ffcccb' }; // Vermelho
      default:
        return { backgroundColor: '#d3d3d3' }; // Cinza
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>RELATÓRIOS</Text>

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filtrar por:</Text>
        <View style={styles.filtersRow}>
          <Picker
            selectedValue={selectedType}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedType(itemValue)}
          >
            <Picker.Item label="Tipo de resíduo" value="" />
            <Picker.Item label="Papel" value="Papel" />
            <Picker.Item label="Metal" value="Metal" />
            <Picker.Item label="Tinta" value="Tinta" />
          </Picker>
          <View style={styles.pickerSpacing} />
          <Picker
            selectedValue={selectedStatus}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedStatus(itemValue)}
          >
            <Picker.Item label="Status" value="" />
            <Picker.Item label="reciclado" value="reciclado" />
            <Picker.Item label="aguardando coleta" value="aguardando coleta" />
            <Picker.Item label="não reciclado" value="não reciclado" />
          </Picker>
        </View>
      </View>

      <View style={styles.dateFilterContainer}>
        <Text style={styles.filterLabel}>Período:</Text>
        <View style={styles.dateRow}>
          <TouchableOpacity onPress={showStartDatePicker} style={styles.dateButton}>
            <Text style={styles.dateButtonText}>
              {startDate ? startDate.toLocaleDateString() : 'Selecione a data inicial'}
            </Text>
          </TouchableOpacity>
          <Text style={styles.toText}>a</Text>
          <TouchableOpacity onPress={showEndDatePicker} style={styles.dateButton}>
            <Text style={styles.dateButtonText}>
              {endDate ? endDate.toLocaleDateString() : 'Selecione a data final'}
            </Text>
          </TouchableOpacity>
        </View>
        <DateTimePickerModal
          isVisible={isStartDatePickerVisible}
          mode="date"
          onConfirm={handleStartDateConfirm}
          onCancel={hideStartDatePicker}
        />
        <DateTimePickerModal
          isVisible={isEndDatePickerVisible}
          mode="date"
          onConfirm={handleEndDateConfirm}
          onCancel={hideEndDatePicker}
        />
      </View>

      <ScrollView horizontal>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.headerCell, { width: maxColumnWidths.type }]}>Tipo</Text>
            <Text style={[styles.headerCell, { width: maxColumnWidths.quantity }]}>
              Quantidade (kg)
            </Text>
            <Text style={[styles.headerCell, { width: maxColumnWidths.date }]}>Data</Text>
            <Text style={[styles.headerCell, { width: maxColumnWidths.status }]}>Status</Text>
          </View>

          <FlatList
            data={filterWasteData()}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  filterContainer: {
    marginBottom: 20,
  },
  filtersRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerSpacing: {
    width: 10,
  },
  picker: {
    height: 50,
    width: 150,
  },
  filterLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  dateFilterContainer: {
    marginBottom: 20,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toText: {
    marginHorizontal: 10,
  },
  dateButton: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  dateButtonText: {
    fontSize: 14,
  },
  table: {
    flexDirection: 'column',
    minWidth: '100%', 
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
  },
  headerCell: {
    flex: 1, 
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    minWidth: 100, 
  },
  row: {
    flexDirection: 'row',
  },
  rowSpacing: {
    marginBottom: 10,
  },
  cell: {
    flex: 1, 
    padding: 10,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    minWidth: 100, 
  },
});

export default TelaRelatorios;