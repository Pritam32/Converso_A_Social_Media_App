import { View, Text,Image,TouchableOpacity,FlatList } from 'react-native'
import React from 'react'
import { firebase } from '@react-native-firebase/firestore'
import { useRoute } from '@react-navigation/native'
import { List, TextInput } from 'react-native-paper'
import { useEffect } from 'react'
import { useState } from 'react'
import { black } from 'react-native-paper/lib/typescript/styles/colors'
import { ScrollView } from 'react-native-gesture-handler'
import firestore from '@react-native-firebase/firestore';
import PostScreen from './PostScreen'
import PostCard from './PostCard'

const CommentScreen = ({route,navigation}) => {

  
  const user1=route.params.user1;
 
  const [pic,setPic]=useState();
  const [UserComment,setComment]=useState("");
  const [name,setName]=useState("");
  const [count,setcount]=useState(0);

  const ShowComments=()=>{
    
    const [list,setList]=useState([]);
    const ref=firebase.firestore().collection("Posts").doc(user1.id).collection("Comments")
    
    
    
  
  useEffect(
    ()=>{
    return ref.orderBy('time').onSnapshot(querySnapshot=>{
      const list=[]
      querySnapshot.forEach(doc=>{
        list.push({
          photo:doc.data().photo,
          comment:doc.data().comment,
          name:doc.data().name,
        })
      })
      setList(list)
      setcount(list.length)
      console.log(list)
      
    })
    
  },[])
    return(
      <View>
      <Text style={{fontSize:20,color:"black",marginTop:20,marginLeft:15,marginBottom:10}}>All Comments</Text>
       <View style={{borderWidth:2,borderColor:"black",marginLeft:15,marginRight:15,height:420}}>
       {list==""?<Text style={{color:"grey",fontSize:18,marginLeft:10}}>No Comments</Text>:
       <FlatList
          data={list}
          renderItem={({item})=>(
            <ScrollView scrollEnabled={true}>
            <View style={{display:'flex',flexDirection:"row",marginLeft:8,marginTop:15}}>
            <Image style={{ width:40,height:40,borderRadius:100}} source={{uri:item.photo}}/>
            <View>
            <Text style={{fontSize:19,color:"black",marginLeft:10,fontWeight:'bold'}}>{item.name}</Text>
            <Text style={{color:"black",fontSize:18,marginTop:8,marginLeft:5}}>{item.comment}</Text>
            </View>
            </View>
            </ScrollView>
          )}/>}
      </View>
      </View>
    )
  }

  const handleComment=()=>{
    firebase.firestore().collection("Posts").doc(user1.id).collection("Comments").add({
      photo:pic,
      comment:UserComment,
      name:name,
      time:firestore.Timestamp.fromDate(new Date()),
      
    })
    setComment("");
    navigation.navigate("PostCard",{count:count});
  }

  useEffect(()=>{
    
    const user=firebase.auth().currentUser;
    firebase.firestore().collection("users").doc(user.uid).get()
    .then((snapshot)=>{
        setPic(snapshot.data().pic);
        setName(snapshot.data().name);
    })
    
    
    
 
   },[])


  return (
    <View>
      <View style={{marginTop:10}}>
        <View style={{display:'flex',flexDirection:"row",alignItems:'center',marginTop:20}}>
        <Image source={{uri:pic}} style={{width:45,height:45,marginLeft:20,borderRadius:100}}/>
        <Text style={{fontSize:19,color:"black",marginLeft:10,fontWeight:'bold'}}>{name}</Text>
        </View>
        <TextInput style={{borderWidth:2,borderColor:"black",marginLeft:10,marginBottom:10,marginTop:10,marginRight:10,fontSize:18}}
        placeholder="Add your Comment.." multiline={true} onChangeText={(val)=>setComment(val)} value={UserComment}/>
        <TouchableOpacity onPress={UserComment==""?null:handleComment}>
          <View style={{backgroundColor:"green",marginRight:10,marginBottom:10,alignItems:"center",marginLeft:10}}>
            <Text style={{color:"white",fontSize:18,padding:10}}>Send</Text>
          </View>
        </TouchableOpacity>

      </View>
      <ShowComments/>
    </View>
  )
}

export default CommentScreen;