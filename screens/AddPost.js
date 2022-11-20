import { View, Text,Dimensions,TouchableOpacity,Platform,TextInput,PermissionsAndroid,Alert,Image,ScrollView } from 'react-native'
import React,{useEffect, useState} from 'react'
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'
import ImageCropPicker from 'react-native-image-crop-picker';
import PostScreen from './PostScreen';
import firebase from '@react-native-firebase/app'




const AddPost= ({navigation}) => {
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [post, setPost] = useState(null);
    const [name,setName]=useState();
    const [photo,setPhoto]=useState();
    const user=firebase.auth().currentUser;
    useEffect(()=>{
      
      firebase.firestore().collection("users").doc(user.uid).get()
      .then((snapshot)=>{
          console.log("Details"+snapshot.data().name);
          setName(snapshot.data().name);
          setPhoto(snapshot.data().pic);
      })
      
      
   
     },[])
    

    const takePhotoFromCamera = () => {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA) ;
        ImageCropPicker.openCamera({
          width: 1200,
          height: 780,
          cropping: true,
        }).then((image) => {
          console.log(image);
          const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
          setImage(imageUri);
        });
      };
    
      const choosePhotoFromLibrary = () => {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
        ImageCropPicker.openPicker({
          width: 750,
          height: 500,
          cropping: true,
        }).then((image) => {
          console.log(image);
          const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
          setImage(imageUri);
        });
      };
    
      const submitPost = async () => {
        const imageUrl = await uploadImage();
        console.log('Image Url: ', imageUrl);
        console.log('Post: ', name);
        

        
          firestore().collection('Posts').add({
          Userid:user.uid,
          Username:name,
          postImg: image,
          postTime:firestore.Timestamp.fromDate(new Date()),
          userImg:photo,
          likes:0,
          
          
        })
        .then(() => {
           
            console.log('Post Added!');
            Alert.alert(
              'Post published!',
              'Your post has been published Successfully!',
            );
            setPost(null);
          })
          .catch((error) => {
            console.log('Something went wrong with added post to firestore.', error);
          })
          navigation.navigate("PostScreen");
          
        }
    
        
        const uploadImage = async () => {
          if( image == null ) {
            return null;
          }
          const uploadUri = image;
          let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
      
          // Add timestamp to File Name
          const extension = filename.split('.').pop(); 
          const name = filename.split('.').slice(0, -1).join('.');
          filename = name + Date.now() + '.' + extension;
      
          setUploading(true);
          setTransferred(0);
          
      
          const storageRef =storage().ref(`photos/${filename}`);
          const task=storageRef.putFile(uploadUri);
      
          // Set transferred state
          task.on('state_changed', (taskSnapshot) => {
            console.log(
              `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
            );
      
            setTransferred(
              Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
                100,
            );
          });
      
          try {
            await task;
      
            const url = await storageRef.getDownloadURL();
      
            setUploading(false);
            setImage(null);
      
            // Alert.alert(
            //   'Image uploaded!',
            //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
            // );
            return url;
      
          } catch (e) {
            console.log(e);
            return null;
          }
      
        };
      

        
  return (
    <ScrollView scrollEnabled={true}>
    <View style={{alignItems:"center",marginTop:20}}>
      <Text style={{color:"black",fontSize:25,marginTop:30,marginLeft:20}}>CHOOSE YOUR POST:</Text>
      <TouchableOpacity onPress={takePhotoFromCamera}>
        <View style={{backgroundColor:"chocolate",width:300,alignItems:"center",marginTop:30}}>
        <Text style={{color:"white",padding:15,fontSize:20}}>Take Photo</Text>
        </View>
      </TouchableOpacity> 
      <TouchableOpacity onPress={choosePhotoFromLibrary}>
        <View style={{backgroundColor:"chocolate",width:300,alignItems:"center",marginTop:20}}>
        <Text style={{color:"white",padding:15,fontSize:20}}>Upload From Library</Text>
        </View>
        </TouchableOpacity> 
        {image==null?null: <Image source={{uri:image}} style={{width:296,height:246,marginTop:30}}/>}
        <TouchableOpacity onPress={image==null?null:submitPost}>
        <View style={{backgroundColor:"chocolate",width:300,alignItems:"center",marginTop:30}}>
        <Text style={{color:"white",margin:20,fontSize:20}}>Post</Text>
        </View>
        </TouchableOpacity>      
      </View>
      </ScrollView>
  )
}

export default AddPost;