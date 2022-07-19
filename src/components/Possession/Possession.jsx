import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getBalance, getMovements } from "../../redux/actions";
import { useFocusEffect } from "@react-navigation/native";

export default function Possession() {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const token = useSelector((state) => state.logIn.token);
  const balance = useSelector((state) => state.balance);
  const lockedStake = useSelector((state) => state.movements.pendingLockedStake);
  
  useFocusEffect(
    React.useCallback(() => {
      dispatch(getBalance(token));
      dispatch(getMovements(token));      
    }, [])
    );

    console.log("Este es el balance", balance)
  return (
    <ScrollView style={styles.card}>
      <View>
        <View style={{ display: "flex", alignItems: "center" }}>
          <Text
            style={{
              color: "white",
              fontSize: 30,
            }}
          >
            Tenecias
          </Text>
        </View>
        <View style={styles.caract}>
          <Text style={{ color: "white" }}>Simbolo</Text>
          <Text style={{ color: "white" }}>Cantidad</Text>
          <Text style={{ color: "white" }}>Rendimiento</Text>
          <Text style={{ color: "white" }}>Valorizado</Text>
        </View>
      </View>

      {balance.length > 0 &&
        balance.map((item, index) => (
          item.balance !== "0" &&
          <View key={index}>
            <TouchableOpacity
              style={styles.subCard}
              onPress={() => {
                navigation.navigate("InvestorDetail", {
                  id: item.name,
                  ticket: item.name,
                  cantidad: item.balance,
                  precio: item.buyPrice,
                });
              }}
            >
              <View style={styles.caract}>
                <Text style={{ color: "white" }}>{item.name}</Text>
                <Text style={{ color: "white" }}>
                  {parseInt(item.balance).toFixed(2)}
                </Text>
                <Text style={{ color: "green" }}>8.79%</Text>
                <Text style={{ color: "white" }}>
                  {parseInt(item.buyPrice).toFixed(2)}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}

      {/* Segunda seccion */}

      <View>
        <View style={{ display: "flex", alignItems: "center" }}>
          <Text
            style={{
              color: "white",
              fontSize: 30,
            }}
          >
            Plazo Fijo
          </Text>
        </View>
        <View style={styles.caract}>
          <Text style={{ color: "white" }}>Inversion</Text>
          <Text style={{ color: "white" }}>TNA</Text>
          <Text style={{ color: "white" }}>Días</Text>
          <Text style={{ color: "white" }}>Ganacias</Text>
        </View>
      </View>

      {      
        !lockedStake ? null :
        lockedStake.map((item, index) => (
          <View key={index}>
            <TouchableOpacity
              style={styles.subCard}
              onPress={() => {
                navigation.navigate("Detalle PF", {
                  id: item.name,
                  amount: item.amount,
                });                
              }}
            >
              <View style={styles.caract}>
                <Text style={{ color: "white" }}>$ {item.amount.substring(1)}</Text>
                <Text style={{ color: "white" }}>53%</Text>
                <Text style={{ color: "white" }}>30</Text>
                <Text style={{ color: "green" }}>$ {(item.amount.substring(1) * 1.05).toFixed(2)}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))        
        }

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(255, 255, 255, 0.5)",
    margin: 10,
    borderRadius: 8,
    padding: 10,
    height: 400,
  },
  subCard: {
    backgroundColor: "rgba(25, 23, 61, 0.5)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(255, 255, 255, 0.5)",
    margin: 10,
    borderRadius: 8,
    padding: 10,
  },
  caract: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
