import { View, Text,Image,FlatList,ScrollView,TouchableOpacity } from 'react-native'
import React,{useEffect, useState} from 'react'
import PostCard from './PostCard';
import firestore from '@react-native-firebase/firestore';
import AddPost from './AddPost';
import {getAuth} from "@react-native-firebase/auth"




const PostScreen = ({navigation}) => {

  const [list,setList]=useState([]);
  const ref=firestore().collection('Posts');
  
  
  

useEffect(
  
   
  
  ()=>{
  return ref.orderBy("postTime","desc").onSnapshot(querySnapshot=>{
    const list=[]
    querySnapshot.forEach(doc=>{
      list.push({
        userid:doc.data().Userid,
        id:doc.id,
        name:doc.data().Username,
        image:doc.data().postImg,
        time:doc.data().postTime,
        photo:doc.data().userImg,
        likes:doc.data().likes,
      })
    })
    setList(list)
    console.log(list)
    
  })
  
},[])
  return ( 
    <View style={{alignItems:"center"}}>
      <View style={{borderWidth:2,borderColor:"black",width:"100%",height:"100%"}}>
      <FlatList
          data={list}
          renderItem={({item})=>(
            <ScrollView scrollEnabled>
             
              <PostCard item={item} img={item.image} pimg={item.photo} navigation={navigation}/>

            </ScrollView>
          )}/>
      </View>
      
      <View style={{marginTop:650,width:80,backgroundColor:"green",position:"absolute",borderRadius:100,height:80,alignItems:"center",justifyContent:"center"}}>
        <TouchableOpacity onPress={()=>navigation.navigate('AddPost')}>
        <Text style={{fontSize:40,color:"white"}}>+</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  )
}

export default PostScreen;