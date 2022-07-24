import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Icon, Button } from "@rneui/themed";

import {postContacts} from "../../redux/actions/index";

const UserCardTransferencia = ({data}) => {
  // console.log('esta es la data', data)
  const dispatch = useDispatch();  
  const token = useSelector((state) => state.logIn.token);  
  
  const [contacts, setContacts] = useState({
    id: '',
    image: '',
    name: '',
    lastName: '',
    email: '',
    cbu: '',
    alias: '',
  });  

  const  addContact = () => {    
    setContacts({...contacts, 
      id: data.id,
      image: data.image,
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      cbu: data.cbu,
      alias: data.alias,
    })        
    // console.log('contacts act', contacts)        
  };

  useEffect(() => {
    !contacts.id ? null :
    dispatch(postContacts(contacts, token));
  }, [contacts]);  
  
  return (
    <View style={styles.container}>
      <Image
        onAccessibilityTap={() => onClick()}
        style={styles.image}
        source={{ uri: `${data.image}` }}
      />
      <View style={styles.containerData}>
        <Icon
          style={{          
            paddingVertical: 1,
            paddingRight: 2,
            flexDirection: 'row-reverse',               
          }}
          name={'card-account-details-star-outline'}
          type="material-community"
          size={35}
          color={'purple'}        
          onPress={() => addContact()}
        />
        <Text style={styles.text}>{data.name} {data.lastName}</Text>
        <Text style={styles.textCBU}>CBU: {data.cbu}</Text>
      </View >
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent:'flex-start',
    alignItems:'center',
    backgroundColor: "rgba(25, 23, 61, 0.5)",
    paddingLeft:10,
    borderWidth:1,
    borderColor:'white',
    borderRadius:40,
    height:90,
    width:300
  },
  containerData:{
    paddingLeft:10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 100,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize:19
  },
  textCBU:{
    color:'gray',
    fontSize:12
  }
});

export default UserCardTransferencia;
