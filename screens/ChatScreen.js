import { View, Text,Image,SafeAreaView,TextInput} from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore'; 
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Chat from './Chat';
import PostScreen from './PostScreen';
import { useRoute } from '@react-navigation/native';

const ChatScreen = ({user,navigation}) => {

  const [users,setUsers]=useState(null);
  const [search,setSearch]=useState();
  
  const route=useRoute();
  
  
  

  const DisplayUsers=async()=>{
    const querysnap=firestore().collection('users').get();
    const allusers=(await querysnap).docs.map(docSnap=>docSnap.data())
    setUsers(allusers)
   
    .catch(error=>{
      console.error(error);
      });
  }
  useEffect(()=>{
    DisplayUsers();
    console.log(users);
    console.log(user.name)
    
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