import { View, Text,Image } from 'react-native'
import React,{useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import LoginScreen from './LoginScreen';


const SplashScreen = ({user}) => {
    const Navigation=useNavigation();
    useEffect(()=>{
        setTimeout(()=>{
           
            Navigation.navigate('LoginScreen');
        },4000);
    })
  return (
    
      <View style={{flex:1,backgroundColor:'#0d101c',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <Image source={require('../screens/mylogo.png')} style={{width:250,height:250,borderRadius:30}}/>
     </View>
    
  )
}

export default SplashScreen;