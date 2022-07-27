import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  deleteTarjetas,
  getTarjetas,
} from "../CreditCardAsyncStorage/CreditCardAsyncStorage";
import { useFocusEffect } from "@react-navigation/native";
import { Button } from "@rneui/themed";

export default function CreditCards() {
  const [tarjetas, setTarjetas] = React.useState([]);

  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      getTarjetas().then((res) => {
        console.log(res);
        setTarjetas(res);
      });
    }, [])
  );

  function borrarTarjetas() {
    deleteTarjetas().then((res) => {
      setTarjetas([]);
      console.log(res);
    });
  }

  return (
    <View style={{ display: "flex", justifyContent: "space-around" }}>
      <Text
        style={{
          fontSize: 18,
          color: "white",
          justifyContent: "center",
        }}
      >
        Tarjetas asociadas
      </Text>
      <ScrollView style={{ height: 400 }}>
        {tarjetas?.length > 0 &&
          tarjetas.map((item, index) => (
            <View key={index} style={styles.subCard}>
              <Text
                style={{
                  color: "white",
                  fontSize: 15,
                }}
              >
                Nombre: {item.name}
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 15,
                }}
              >
                Numero: {item.number}
              </Text>
            </View>
          ))}
      </ScrollView>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <Button
          title="Agregar Nueva tarjeta"
          color={"purple"}
          onPress={() => navigation.navigate("NewCreditCard")}
          style={{ marginVertical: 100 , }}
        />
        <Button
          title="Eliminar tarjetas"
          onPress={() => borrarTarjetas()}          
          color={"purple"}
          containerStyle={{
            marginTop: 15,              
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subCard: {
    backgroundColor: "rgba(25, 23, 61, 0.5)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(255, 255, 255, 0.5)",
    margin: 10,
    borderRadius: 8,
    padding: 10,
  },
});
