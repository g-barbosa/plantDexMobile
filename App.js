import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer'

import ThemeContext from './context/ThemeContext'
import Login from './src/screens/Login'
import HomeScreen  from './src/screens/HomeScreen'
import SignUp from './src/screens/SignUp'
import ChangePass from './src/screens/ChangePass'
import PlantInfo from './src/screens/PlantInfo'
import AddPlant from './src/screens/AddPlant'
import EditPlant from './src/screens/EditPlant'
import DrawerContent from './src/screens/DrawerContent'
import AuthLoadingScreen from './src/screens/AuthLoadingScreen'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const Menu = () => {

  return (
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>} drawerStyle={{backgroundColor: "#F2FFF1"}}>
        <Drawer.Screen name='HomeScreen' component={HomeScreen}/>
      </Drawer.Navigator>
  )
}

const App = () => {
  const themeHook = useState('light')

  return (
    <ThemeContext.Provider value={themeHook}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Auth'} screenOptions={{ gestureEnabled: false, headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthLoadingScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ChangePass" component={ChangePass}  
        options={{ headerTitleAlign: 'center', headerShown: true, title: 'Alterar senha' }}/>

        <Stack.Screen name="SignUp" component={SignUp} 
          options={{ headerTitleAlign: 'center', headerShown: true, title: 'Cadastro' }}/>

        <Stack.Screen name="PlantInfo" component={PlantInfo}
          options={{ headerTitleAlign: 'center', headerShown: true, title: null }}/>

        <Stack.Screen name="AddPlant"component={AddPlant} 
          options={{ headerTitleAlign: 'center', headerShown: true, title: null }}/>

          <Stack.Screen name="Edit" component={EditPlant}
            options={{ headerTitleAlign: 'center', headerShown: true, title: null }}
          />
        <Stack.Screen name="Home" component={Menu} />
      </Stack.Navigator>
    </NavigationContainer>
    </ThemeContext.Provider>
  )
}

export default App;