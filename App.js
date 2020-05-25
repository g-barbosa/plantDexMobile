import React, {useState} from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

import { StyleSheet, TouchableOpacity, Image } from 'react-native'

import Login from './src/screens/Login'
import HomeScreen  from './src/screens/HomeScreen'
import SignUp from './src/screens/SignUp'
import ChangePass from './src/screens/ChangePass'
import PlantInfo from './src/screens/PlantInfo'
import AddPlant from './src/screens/AddPlant'

import editIcon from './assets/edit.png'
import EditPlant from './src/screens/EditPlant';

const Stack = createStackNavigator()

const App = () => {
  const [routeName, setRouteName] = useState('Login')

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('@token')
      return value !== null ? 'Home' : 'Login'
    } catch(e) {
        console.warn(e)
    }
  }

  getToken()
  .then(response => setRouteName(response))

  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName={routeName} screenOptions={{ gestureEnabled: false, headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ChangePass" 
        component={ChangePass}  
        options={
          { headerTitleAlign: 'center', 
            headerStyle: Style.headerStyle, 
            headerShown: true, 
            title: 'Alterar senha', 
            headerTitleStyle: Style.titleStyle,
            headerTintColor: "#C4C4C4",
          }}/>
        <Stack.Screen name="SignUp" 
        component={SignUp} 
        options={
          {
            headerTitleAlign: 'center', 
            headerStyle: Style.headerStyle, 
            headerShown: true, 
            title: 'Cadastro', 
            headerTitleStyle: Style.titleStyle
          }}/>
        <Stack.Screen name="PlantInfo" 
        component={PlantInfo}
        options={
          {
            headerTitleAlign: 'center', 
            headerStyle: {height: 50, backgroundColor: "#CCFFC8", elevation:0}, 
            headerShown: true, 
            title: null, 
            headerTitleStyle: Style.titleStyle,
          }}/>
        <Stack.Screen name="AddPlant"
        component={AddPlant} 
        options={
          {
            headerTitleAlign: 'center', 
            headerStyle: {height: 50, backgroundColor: "#CCFFC8", elevation:0},
            headerShown: true, 
            title: null, 
            headerTitleStyle: Style.titleStyle
          }}/>
          <Stack.Screen name="Edit" 
          component={EditPlant}
          options={
            {
              headerTitleAlign: 'center', 
              headerStyle: {height: 50, backgroundColor: "#CCFFC8", elevation:0},
              headerShown: true, 
              title: null, 
              headerTitleStyle: Style.titleStyle
            }}
          />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const Style = StyleSheet.create({
  titleStyle: {
    fontWeight: 'bold',
    color: '#099820'
  },
  headerStyle: {
    height: 75,
  }
})

export default App;