import React,{useState,useEffect} from 'react';
import {View,Text,Image, TouchableOpacity} from 'react-native'
import LoginScreen from './screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import 'react-native-screens';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RegisterScreen from './screens/RegisterScreen';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ChatScreen from './screens/ChatScreen';
import Chat from './screens/Chat';

import PostScreen from './screens/PostScreen';
import AddPost from './screens/AddPost';


const Stack = createStackNavigator();
const Navigation = ()=>{
  const [user,setuser] = useState('');
  
  
  
  
  useEffect(()=>{
    
   const unregister =  auth().onAuthStateChanged(userExist=>{
      if(userExist){
       
        firestore().collection('users')
        .doc(userExist.uid)
        .update({
          status:"online"
        })
        setuser(userExist)
       

      } 
      else{
        setuser('');
        
      }
    
    })

    return ()=>{
      unregister()
    }

  },[])

return(
  <SafeAreaProvider>
    <NavigationContainer>
    <Stack.Navigator 
       screenOptions={{
         headerTintColor:"green"
       }}
      
      >
         {user?
        <>
          <Stack.Screen name="ChatScreen"  options={{
          headerRight:()=>
          
          <TouchableOpacity  onPress={()=>{
            firestore().collection('users')
            .doc(user.uid)
             .update({
             status:firestore.FieldValue.serverTimestamp()
             }).then(()=>{
                  auth().signOut()
             })
             
           
             }}>
          <Text
          style={{marginRight:20,fontSize:16,color:"white"}}>Log Out</Text>
          </TouchableOpacity>,
          
          title:"Converso",
          headerTitleStyle:{color:'white'},
          headerStyle:{backgroundColor:'#041b38',height:80} 
        }}> 
         {props => <ChatScreen {...props}  user={user} />}
        </Stack.Screen>
        <Stack.Screen name="Chat" options={({ route }) => ({ title:<View style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
          <Image source={{uri:route.params.pic}} style={{width:50,height:50,borderRadius:100}}/>
          <Text style={{color:'white',fontSize:18,marginLeft:20}}>{route.params.name}</Text>
          </View>,headerTitleAlign:'left',headerStyle:{backgroundColor:'#041b38',height:80} })}>
          {props => <Chat {...props} user={user} /> }
        </Stack.Screen> 
        <Stack.Screen name="PostScreen" component={PostScreen} options={{headerTitle:"Posts",headerTitleStyle:{color:"white"},headerStyle:{backgroundColor:'#041b38',height:80}}}/>
        
        


        <Stack.Screen name="AddPost" component={AddPost} options={{headerShown:false}}/>
         </>
        :
        <>
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown:false}}/>
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{headerShown:false}}/>
        
        
        </>
        }
        </Stack.Navigator>
    </NavigationContainer>
  </SafeAreaProvider>  
  
    );
}

const App=()=>{
  return(
  <View style={{  flex:1 , backgroundColor:"white"}}>
    <Navigation/>
  </View>
  );
};
export default App;