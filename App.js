import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Importação dos ícones
import TelaLogin from './TelaLogin';
import TelaDashboard from './TelaDashboard';
import TelaRegistroResiduos from './TelaRegistroResiduos';
import TelaRastreamento from './TelaRastreamento';
import TelaRelatorios from './TelaRelatorios';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            // Definindo o ícone com base na rota
            if (route.name === 'Login') {
              iconName = 'log-in-outline';
            } else if (route.name === 'Dashboard') {
              iconName = 'home-outline';
            } else if (route.name === 'Registro de Resíduos') {
              iconName = 'add-circle-outline';
            } else if (route.name === 'Rastreamento') {
              iconName = 'location-outline';
            } else if (route.name === 'Relatórios') {
              iconName = 'stats-chart-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Login" component={TelaLogin} />
        <Tab.Screen name="Dashboard" component={TelaDashboard} />
        <Tab.Screen 
          name="Registro de Resíduos" 
          component={TelaRegistroResiduos} 
          options={{ tabBarLabel: 'Registro de Resíduos' }} // Define o texto completo
        />
        <Tab.Screen name="Rastreamento" component={TelaRastreamento} />
        <Tab.Screen name="Relatórios" component={TelaRelatorios} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}