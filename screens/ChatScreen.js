import { View, Text,Image,SafeAreaView,TextInput} from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore, { firebase } from '@react-native-firebase/firestore'; 
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Chat from './Chat';
import PostScreen from './PostScreen';
import { useRoute } from '@react-navigation/native';



const ChatScreen = ({user,navigation}) => {

  const [users,setUsers]=useState(null);
  const [search,setSearch]=useState();

  const current=firebase.auth().currentUser;
  
  
  const SearchUser=async()=>{
    const snap=firestore().collection('users').where('name','==',search).get();
    const user1=(await snap).docs.map(docSnap=>docSnap.data())
    setUsers(user1)
    .catch(error=>(
      console.log(error)
    ))
  }
  
  
  

  const DisplayUsers=async()=>{
    const querysnap=firestore().collection('users').where("uid","!=",current.uid).get();
    const allusers=(await querysnap).docs.map(docSnap=>docSnap.data())
     setUsers(allusers)
    
   
  }
 

  useEffect(()=>{
    DisplayUsers();
    console.log(current.uid);
  
    
  },[])

  
  const RenderCard=({item})=>{
    return(
      <TouchableOpacity onPress={()=>navigation.navigate('Chat',{name:item.name,uid:item.uid,pic:item.pic
    })}>
      <View>
      <SafeAreaView style={{display:'flex',flex:1,flexDirection:'row',alignItems:'center',marginTop:10}}>
      <Image source={{uri:item.pic}} 
      style={{width:50,height:50,borderRadius:30,borderColor:'black',borderWidth:2}}/>
      <View style={{marginLeft:20}}>
        <Text style={{color:"black",fontSize:18}}>{item.name}</Text>
      </View>
      </SafeAreaView>
      <View style={{borderColor:"grey",borderWidth:1,marginTop:15}}></View>
      </View>
      </TouchableOpacity>
    )
  }
  return (
      
    <View style={{alignItems:"center"}}>
      <View style={{alignItems:"center",flexDirection:"row"}}>
      <View style={{borderWidth:2,borderColor:"black",borderRadius:20,width:290,marginTop:20,paddingLeft:20}}>
        <TextInput style={{color:"black",fontSize:18}} placeholder="Search" placeholderTextColor="grey"
        onChangeText={(val)=>setSearch(val)}/>
      </View>
      <TouchableOpacity onPress={SearchUser} >
      <View style={{backgroundColor:"green",width:80,alignItems:"center",padding:5,marginTop:20,marginLeft:10}}>
    <Text style={{fontSize:18,color:"white"}}>Search</Text>
     </View>
     </TouchableOpacity>
      </View>  
    <View style={{marginTop:20,height:710,width:400}}>
      
      <FlatList
      data={users}
      renderItem={({item})=>
      <ScrollView>
      <RenderCard item={item}/>
      </ScrollView>
    }
      keyExtractor={(item)=>item.uid}/>
      
     
     </View>
     
     <View style={{alignItems:"center",backgroundColor:"green",marginTop:660,borderRadius:30,position:"absolute"}}>
     <TouchableOpacity onPress={()=>navigation.navigate("PostScreen",{user})}>
      <Text style={{paddingVertical:20,width:200,color:"white",paddingHorizontal:50,fontSize:16}}>Go To Posts</Text>
      </TouchableOpacity>
     </View> 
    
    </View>
    
  )
}

export default ChatScreen;