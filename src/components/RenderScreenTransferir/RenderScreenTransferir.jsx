import React, { useState } from "react";

import { View, Text, StyleSheet, Button } from "react-native";
import { Input, Icon } from "react-native-elements";
import {
  renderScreen,
  userTransfer,
  setTransfer,
  setTransferAlias,
  userTransferAlias,
} from "../../redux/actions/index";

import { useDispatch, useSelector } from "react-redux";
import Switch from "./Switch.jsx";

import UserCardTransferencia from "../UserCardTransferencia/UserCardTransferencia";

const RenderScreenTransferir = () => {
  const user = useSelector((state) => state.userTransfer);
  const users = useSelector((state) => state.allUsers);
  const token = useSelector((state) => state.logIn.token);

  const [params, setParams] = useState({ cbu: 0 });
  const [paramsAlias, setParamsAlias] = useState({ alias: "" });
  const [errors, setErrors] = useState("");
  const [render, setRender] = useState("");
  const [next, setNext] = useState(false);

  const dispatch = useDispatch();

  const setScreen = (screen) => {
    dispatch(renderScreen(screen));
  };

  const handleOnChange = (e, type) => {
    setParams({ ...params, [type]: e.nativeEvent.text });
  };

  const searchTransfer = () => {
    if (!params.cbu.length) {
      setErrors("Debes rellenar este campo.");
    }
    if (params.length > 22) {
      setErrors("Estas excediendo los caracteres.");
    }
    let userExist = users?.find((user) => user.cbu === params.cbu);
    if (!userExist) {
      setErrors("El identificador ingresado no existe");
    } else {
      dispatch(setTransfer(token, params));
      dispatch(userTransfer(userExist));
      setNext(true);
      setErrors("");
    }
  };

  const handleOnChangeAlias = (e, type) => {
    setParamsAlias({ ...paramsAlias, [type]: e.nativeEvent.text });
  };

  const searchTransferAlias = () => {
    if (!paramsAlias.alias.length) {
      setErrors("Debes rellenar este campo.");
    }
    let userExist = users?.find((user) => user.alias === paramsAlias.alias);
    if (!userExist) {
      setErrors("El identificador ingresado no existe");
    } else {
      dispatch(setTransferAlias(token, paramsAlias));
      dispatch(userTransferAlias(userExist));
      setNext(true);
      setErrors("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Transferencia</Text>
      <Switch setRender={setRender} />
      {render === "Alias" ? (
        <Input
          placeholder="Alias"
          placeholderTextColor={"gray"}
          errorMessage={errors}
          onChange={(e) => handleOnChangeAlias(e, "alias")}
          style={styles.input}
          rightIcon={
            <Icon
              name="search"
              color={"white"}
              size={30}
              onPress={() => searchTransferAlias()}
            />
          }
        />
      ) : (
        <Input
          placeholder="Número de CBU"
          placeholderTextColor={"gray"}
          keyboardType="number-pad"
          errorMessage={errors}
          onChange={(e) => handleOnChange(e, "cbu")}
          style={styles.input}
          rightIcon={
            <Icon
              name="search"
              color={"white"}
              size={30}
              onPress={() => searchTransfer()}
            />
          }
        />
      )}

      {!next ? null : <UserCardTransferencia data={user} />}
      <View>
        {!next ? (
          <Button title="Siguiente" color={"gray"} />
        ) : (
          <Button
            title="Siguiente"
            color={"purple"}
            onPress={() => setScreen(7)}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 8,
    height: 450,
    width: 350,
    paddingTop: 20,
  },
  input: {
    backgroundColor: "rgba(25, 23, 61, 0.5)",
    color: "white",
    borderRadius: 20,
    paddingLeft: 10,
    margin: 5,
    width: 170,
    height: 55,
    textDecorationColor: "transparent",
  },
  containerInput: {
    alignSelf: "flex-start",
    paddingLeft: 12,
  },
  inputCode: {
    backgroundColor: "rgba(25, 23, 61, 0.5)",
    color: "white",
    borderRadius: 20,
    paddingLeft: 10,
    margin: 5,
    width: 20,
    height: 55,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 100,
  },
  text: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
});

export default RenderScreenTransferir;
