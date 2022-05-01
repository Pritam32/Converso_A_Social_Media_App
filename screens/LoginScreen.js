import React,{useState} from 'react';
import {Text,View,ImageBackground,ScrollView,Dimensions, TouchableOpacity,Image} from 'react-native';
import { TextInput,Button} from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import RegisterScreen from './RegisterScreen';
import auth from '@react-native-firebase/auth';


const LoginScreen=({navigation})=>{

  const [checked, setChecked] = React.useState(false);

  const [name,setName]=useState();
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const[phone,setPhone]=useState();

  const LoginUser=()=>{
    
    if(email === '' && password === '') {
      Alert.alert('Enter details to signin!')
    } else {
     
      auth()
      .signInWithEmailAndPassword(email.trim(),password)
      .then((res) => {
        res.user.updateProfile({
          name:name,
          phone:phone,
        })
        console.log('User logged-in successfully!')
        setName('');
        setEmail('');
        setPassword('');
        setPhone('');
        console.log('User signed in Successfully!');
        navigation.navigate('ChatScreen')
      })
      .catch(error=>{
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
    
        console.error(error);
      });      
    };
  };
  

  const Checkbox1 = () => {
    const [tick,setTick]=useState(false);
    const check=()=>{
        setTick(!tick);
    };
  return (
    <View>
      <TouchableOpacity onPress={check}>
        {tick?
        <Image source={{uri:'https://www.citypng.com/public/uploads/preview/-316225907691vr4nvazfz.png'}}
      style={{width:25,height:25,marginTop:20,marginLeft:5}}/>:<View style={{borderWidth:1,borderColor:"black",backgroundColor:"white",width:25,height:25,
      marginLeft:5,marginTop:20}}/>}
      
      </TouchableOpacity>
    </View>
  );
};
 
  return(
    <ScrollView style={{flex:1,backgroundColor:'#ffffff'}}
    showsVerticalScrollIndicator={false}>
      <ImageBackground source={{uri:"https://media.istockphoto.com/photos/nautilus-blue-background-picture-id905432958?k=20&m=905432958&s=612x612&w=0&h=1QK1uB488NueaCd-4rVSUAStyqjLTU9ppNKWCcD0e_c="}}
      style={{height:Dimensions.get('window').height/2.5}}>

      </ImageBackground>
      <View style={{display:'flex',flex:1.5,backgroundColor:"white",bottom:60,borderTopStartRadius:60,borderTopEndRadius:60}}>
        <View style={{padding:30}}>
          <Text style={{color:'#12235c',fontSize:28,paddingTop:20,paddingLeft:20,fontWeight:"bold"}}>Login To continue.. </Text>
           <View style={{marginTop:30}}>
              <TextInput mode='outlined' label="Email" onChangeText={(val)=>setEmail(val)} value={email}/>
              <TextInput mode='outlined' label="Password" style={{marginTop:10}} 
              secureTextEntry={true} onChangeText={(val)=>setPassword(val)} value={password}
              />
              <Button  mode="contained" style={{marginTop:30,padding:5,backgroundColor:'#12235c'}} 
              onPress={LoginUser}>
              Sign In
              </Button>
              <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
              <Checkbox1/>
              <Text style={{color:'black',paddingTop:18,marginLeft:10,fontSize:14}}> Keep me Signed In</Text>
              </View>
              
              <View style={{display:'flex',flex:1,flexDirection:'row',
              marginTop:120,justifyContent:'center'}}>
                <Text style={{color:"black",fontSize:16}}>Create a new Account.</Text>
                <TouchableOpacity onPress={()=>navigation.navigate("RegisterScreen")}>
                <Text style={{color:"#391ac4",marginLeft:5,fontWeight:"700",fontSize:16}}>Sign Up</Text>
                </TouchableOpacity>
              </View>
              
          </View> 
        </View>
      </View>
    </ScrollView>
  );
};
export default LoginScreen;