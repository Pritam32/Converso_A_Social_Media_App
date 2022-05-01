import { View, Text,ScrollView,ImageBackground,Dimensions,Image,alert, Alert, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'react-native-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import {v4 as uuidv4} from 'uuid';
import { Button } from 'react-native-elements';

const ProfileScreen = () => {

  const [filepath,setFilePath]=useState(" ");
  const [profile,setProfile]=useState("");
  

  const setToastMsg=msg=>{
    ToastAndroid.showWithGravity(msg,ToastAndroid.SHORT,ToastAndroid.CENTER);
  }  
  
  const OpenCamera= async()=>{
      let options={
        mediaType:'photo',
        quality:1,
        includeBase64:true  
      };

      ImagePicker.launchImageLibrary(options,response=>{
        if(response.didCancel){
          setToastMsg("the request cancelled");
        }
        else if(response.errorCode=='permission'){
          setToastMsg("Permissions not satisfied");
        }
        else if(response.assets[0].fileSize>10097152){
          Alert.alert('Maximum size Exceeded','Please choose another Image',[{text:'OK'}]);
        }
        else if(response.errorCode=='others'){
          setToastMsg(response.errorMessage);
        }
        else{
          setFilePath(response.assets[0].base64);
        }

      })
      
    };

    const pickUpload=()=>{
      ImagePicker.launchImageLibrary({quality:0.5},(fileobj)=>{
            const uploadtask=firebase.storage().ref().child(`/userprofile/${uuidv4()}`).putFile(fileobj.uri)
            uploadTask.on('state_changed', 
            (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            if(progress==100)
              alert("image uploaded");
          }, 
  (error) => {
    alert("Something went wrong");
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    uploadtask.snapshot.ref.getDownloadURL().then((downloadURL) => {
      console.log('File available at', downloadURL);
      setProfile(downloadURL);
    });
  
      },
            );
    })
  }
    

    

    
  return (
    <ScrollView style={{flex:1,backgroundColor:'#ffffff'}}
    showsVerticalScrollIndicator={false}>
      <ImageBackground source={{uri:"https://media.istockphoto.com/photos/nautilus-blue-background-picture-id905432958?k=20&m=905432958&s=612x612&w=0&h=1QK1uB488NueaCd-4rVSUAStyqjLTU9ppNKWCcD0e_c="}}
      style={{height:Dimensions.get('window').height/2.5}}>
            <TouchableOpacity onPress={pickUpload}>
           <Image
           source={{uri:'data:image/png;base64,'+ filepath}} style={{borderWidth:3,borderColor:"white",width:180,height:180,marginLeft:120,marginTop:90,borderRadius:100}} />
            </TouchableOpacity>
    </ImageBackground>
    <View style={{display:'flex',flex:1.5,backgroundColor:"white",bottom:60,height:500,borderTopStartRadius:60,borderTopEndRadius:60}}>
        <View style={{padding:30}}>
        <Text style={{color:'black',fontSize:24,marginLeft:90}}>Pritam Kumar</Text>
        <Text style={{color:'black',fontSize:20,marginTop:50,marginLeft:30}}>Email:  pritamjad@gmail.com</Text>
        <Text style={{color:'black',fontSize:20,marginTop:50,marginLeft:30}}>Phone:  7903371032</Text>
        
        </View>
      </View>
    
    
    
    
    </ScrollView>
    );
};

export default ProfileScreen;