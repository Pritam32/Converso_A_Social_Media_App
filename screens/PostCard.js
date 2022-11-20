import {View,Text,Image,TouchableOpacity} from 'react-native'
import React,{useState} from 'react';
import { firebase } from '@react-native-firebase/firestore';
import CommentScreen from './CommentScreen';
import { useRoute } from '@react-navigation/native';
import { black } from 'react-native-paper/lib/typescript/styles/colors';

const PostCard = ({pimg,img,item,navigation}) => {

const [liked,setLiked]=useState(false);
const user=firebase.auth().currentUser;
  
const handleLike=()=>{
  setLiked(!liked);
    if(!liked){
      firebase.firestore().collection('Posts').doc(item.id)
      .update({
        likes:item.likes+1,
      })
    }
    else{
      firebase.firestore().collection('Posts').doc(item.id)
      .update({
        likes:item.likes-1,
      })
    }

}

const deletepost=()=>{
  if(user.uid==item.userid){
    firebase.firestore().collection('Posts').doc(item.id).delete();
  }
}

  
  return (
    
    <View style={{borderWidth:3,borderColor:"black",height:480,marginVertical:15}}>
      <View style={{borderWidth:3,borderColor:"black",height:100,flexDirection:"row",backgroundColor:"white",alignItems:"center"}} >
        <Image style={{height:50,width:50,borderRadius:100,marginLeft:10}} source={{uri:item.photo}}/>
        <Text style={{color:"black",fontSize:18,marginLeft:20}}>{item.name}</Text>
      </View>
      
      <View style={{height:350}}>
      <Image style={{height:"80%",width:"100%"}} source={{uri:img}}/>
      <View style={{height:90,borderWidth:2,borderColor:"black",marginTop:5,flexDirection:"row",alignItems:'center',justifyContent:'space-between'}}>

      <TouchableOpacity onPress={handleLike}>
       <View style={{display:"flex",flexDirection:"row"}}>
         <Image style={{height:45,width:45,marginTop:20,marginLeft:20}} source={{uri:liked?"https://toppng.com/uploads/preview/how-to-set-use-red-white-heart-icon-png-love-heart-11563411236sl0ynpmn4w.png":"https://www.iconpacks.net/icons/2/free-heart-icon-3510-thumb.png"}}/>
         <View style={{alignItems:"center",justifyContent:"center",marginTop:18}}>
         <Text style={{color:"black",fontSize:20,marginLeft:5}}>{item.likes}</Text>
         </View>
      </View>
      </TouchableOpacity>
      
      
      <View>
      <TouchableOpacity onPress={()=>navigation.navigate("CommentScreen",{user1:item,})}>
      
      <Image style={{height:45,width:45,marginTop:20}} source={{uri:"https://cdn-icons-png.flaticon.com/512/1380/1380338.png"}}/>
      
      </TouchableOpacity>
      </View>
      <View>
      <TouchableOpacity onPress={deletepost}>
      
      <Image style={{height:55,width:55,marginTop:20,marginRight:20}} source={{uri:"https://icons.veryicon.com/png/o/commerce-shopping/soft-designer-online-tools-icon/delete-77.png"}}/>
      
      </TouchableOpacity>
      </View>
      </View> 
      </View>
      
      </View>
       
    
  )
}

export default PostCard;