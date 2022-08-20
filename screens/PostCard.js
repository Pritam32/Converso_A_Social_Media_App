import {View,Text,Image,TouchableOpacity} from 'react-native'
import React,{useState} from 'react';

const PostCard = ({img1,name,pimg}) => {

  const [liked,setLiked]=useState(false);
  
  
  

  
  return (
    
    <View style={{borderWidth:3,borderColor:"black",height:480,marginVertical:15}}>
      <View style={{borderWidth:3,borderColor:"black",height:100,flexDirection:"row",backgroundColor:"white",alignItems:"center"}} >
        <Image style={{height:50,width:50,borderRadius:100,marginLeft:10}} source={{uri:pimg}}/>
        <Text style={{color:"black",fontSize:18,marginLeft:20}}>{name}</Text>
      </View>
      
      <View style={{height:350}}>
      <Image style={{height:"80%",width:"100%"}} source={{uri:img1}}/>
      <View style={{height:90,borderWidth:2,borderColor:"black",marginTop:5,flexDirection:"row"}}>
      <TouchableOpacity onPress={()=>setLiked(!liked)}>
         <Image style={{height:45,width:45,marginTop:20,marginLeft:20}} source={{uri:liked?"https://toppng.com/uploads/preview/how-to-set-use-red-white-heart-icon-png-love-heart-11563411236sl0ynpmn4w.png":"https://www.iconpacks.net/icons/2/free-heart-icon-3510-thumb.png"}}/>
          
        </TouchableOpacity>
        <Image style={{height:45,width:45,marginTop:20,marginLeft:20}} source={{uri:"https://cdn-icons-png.flaticon.com/512/1380/1380338.png"}}/>
      </View> 
      </View>
      
      </View>
       
    
  )
}

export default PostCard;