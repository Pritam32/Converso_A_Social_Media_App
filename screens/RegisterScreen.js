import React,{createContext,useState} from 'react';
import {Text,View,ImageBackground,ScrollView,Dimensions, TouchableOpacity,Image,AlertActivityIndicator,alert
,PermissionsAndroid} from 'react-native';
import { TextInput,Button} from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import LoginScreen from './LoginScreen';
import SimpleToast from 'react-native-simple-toast';
import ChatScreen from './ChatScreen';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ImageCropPicker from 'react-native-image-crop-picker';




const RegisterScreen=({navigation})=>{

  const [name,setName]=useState();
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const[phone,setPhone]=useState();
  const [pic,setPic]=useState("https://cdn-icons-png.flaticon.com/512/2521/2521826.png");

  
  const AddImage=()=>{
    
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
          ImageCropPicker.openPicker({
            width: 750,
            height: 500,
            cropping: true,
          }).then((image) => {
            console.log(image);
            const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
            setPic(imageUri);
          });
        
      
  }  

  const  registerUser = async() => {
    
    if(email === '' && password === '') {
      alert('Enter details to signin!')
    } else {
     
     const result=await auth()
      .createUserWithEmailAndPassword(email.trim(),password)
      firestore().collection('users').doc(result.user.uid).set({
        name:name,
        email:result.user.email,
        uid:result.user.uid,
        phone:phone,
        pic:pic,
      })

      

      .then(() => {
        
        navigation.navigate("ChatScreen")
        console.log(name);
        console.log(pic);
      })
      .catch(error=>{
        if (error.code === 'auth/invalid-email') {
         console.log('That email address is invalid!');
        }
    
        console.error(error);
      });      
    };
}


      
  
  return (
    <ScrollView style={{flex:1,backgroundColor:'#ffffff'}}
    showsVerticalScrollIndicator={false}>
      <ImageBackground source={{uri:"https://media.istockphoto.com/photos/nautilus-blue-background-picture-id905432958?k=20&m=905432958&s=612x612&w=0&h=1QK1uB488NueaCd-4rVSUAStyqjLTU9ppNKWCcD0e_c="}}
      style={{height:Dimensions.get('window').height/2.5}}>
        
            <View style={{alignItems:'center',marginTop:70}}>
                <TouchableOpacity onPress={AddImage}>
                <View style={{width:160,height:160,borderColor:"white",borderWidth:1,borderRadius:100,alignItems:"center"}}>
                <Image style={{ width:150,
        height:150,borderRadius:100}} source={{uri:pic}} />
                </View>  
            </TouchableOpacity>
            </View>
      </ImageBackground>
      <View style={{display:'flex',flex:1.5,backgroundColor:"white",bottom:75,borderTopStartRadius:60,borderTopEndRadius:60}}>
        <View style={{padding:30}}>
          <Text style={{color:'#12235c',fontSize:28,paddingTop:20,paddingLeft:20,fontWeight:"bold"}}>Create New Account</Text>
           <View style={{marginTop:30}}>
              <TextInput mode='outlined' label="Username" onChangeText={(val)=>setName(val)} value={name}/>
              <TextInput mode='outlined' label="Phone" style={{marginTop:10}} onChangeText={(val)=>setPhone(val)} value={phone}/>
              <TextInput mode='outlined' label="Email" style={{marginTop:10}} onChangeText={(val)=>setEmail(val)} value={email} />
              <TextInput mode='outlined' label="Password" style={{marginTop:10}} 
              secureTextEntry={true}
              onChangeText={(val)=>setPassword(val)} value={password}
              />
              <Button  mode="contained" style={{marginTop:30,padding:5,backgroundColor:'#12235c'}} 
              onPress={registerUser}>
              Sign Up
              </Button>
              
              
              <View style={{display:'flex',flex:1,flexDirection:'row',
              marginTop:30,justifyContent:'center'}}>
                <Text style={{color:"black",fontSize:16}}>Already Have An Account ?</Text>
                <TouchableOpacity onPress={()=>navigation.navigate("LoginScreen")}>
                <Text style={{color:"#391ac4",marginLeft:5,fontWeight:"700",fontSize:16}}>Sign In</Text>
                </TouchableOpacity>
              </View>
             
              
          </View> 
        </View>
      </View>
    </ScrollView>
  );
};
export default RegisterScreen;