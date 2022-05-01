import React from 'react';
import {} from 'react-native';
import LoginScreen from './screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RegisterScreen from './screens/RegisterScreen';
import ChatScreen from './screens/ChatScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createStackNavigator()

const App=()=>{
  return(
  <SafeAreaProvider>
    <NavigationContainer>
        <Stack.Navigator initialRouteName='ProfileScreen' screenOptions={{headerTitleAlign:'center'}}>
         <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown:false}} />
         <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{headerShown:false}} />
         <Stack.Screen name="ChatScreen" component={ChatScreen} options={{title:"Chats",headerStyle:{height:50,backgroundColor:'green'}}}/>
         <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{headerShown:false}} /> 
        </Stack.Navigator>
    </NavigationContainer>
  </SafeAreaProvider>  
  
    
  );
};
export default App;