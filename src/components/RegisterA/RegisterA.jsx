import React, { useState } from "react";
import { Button, StyleSheet, Text, Dimensions, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";
import { Input, Icon } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { postUser, getUsers } from "../../redux/actions";

var { height } = Dimensions.get("window");

export default function RegisterA() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  const getAllUsers = useSelector((state) => state.users);
  console.log("Aca hay getUsers", getAllUsers);

  const navigation = useNavigation();

  const goRegisterB = () => {
    navigation.navigate("RegisterB");
  };

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });
  const [errorEmail, setErrorEmail] = useState("");
  const [errorConfirmEmail, setErrorConfirmEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirPassword, setErrorConfirmPassword] = useState("");

  const handleOnChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const registerUser = () => {
    if (!validateData()) {
      return;
    }
    dispatch(postUser(formData));
    goRegisterB();
  };

  const validateData = () => {
    setErrorEmail("");
    setErrorConfirmEmail("");
    setErrorPassword("");
    setErrorConfirmPassword("");
    let isValid = true;

    if (!validateEmail(formData.email)) {
      setErrorEmail("Debes ingresar un E-mail válido");
      isValid = false;
    }
    if (getAllUsers?.find((u) => u.email === formData.email)) {
      Alert.alert("Este E-mail ya está asociado a una cuenta");
      navigation.navigate("Log In");
      isValid = false;
    }
    if (!validateEmail(formData.confirmEmail)) {
      setErrorConfirmEmail("Debes ingresar un E-mail válido");
      isValid = false;
    }
    if (formData.email !== formData.confirmEmail) {
      setErrorEmail("Los E-mails no coinciden");
      setErrorConfirmEmail("Los E-mails  no coinciden");
      isValid = false;
    }
    if (formData.password.length < 8) {
      setErrorPassword("Debes ingresar una contraseña de 8 carácteres");
      isValid = false;
    }
    if (formData.confirmPassword.length < 8) {
      setErrorConfirmPassword("Debes ingresar una contraseña de 8 carácteres");
      isValid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorPassword("Las contraseñas no coinciden");
      setErrorConfirmPassword("Las contraseñas no coinciden");
      isValid = false;
    }

    return isValid;
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <LinearGradient colors={["#126492", "#140152"]} style={styles.background}>
        <Text style={styles.tittle}>Regístrate</Text>
        <Input
          containerStyle={styles.input}
          placeholder="soyhenry@gmail.com"
          label="E-mail"
          onChange={(e) => handleOnChange(e, "email")}
          errorMessage={errorEmail}
        />
        <Input
          containerStyle={styles.input}
          placeholder="soyhenry@gmail.com"
          label="Confirmar E-mail"
          onChange={(e) => handleOnChange(e, "confirmEmail")}
          errorMessage={errorConfirmEmail}
        />
        <Input
          containerStyle={styles.input}
          placeholder="8 digitos"
          label="Contraseña"
          password={true}
          secureTextEntry={!showPassword}
          onChange={(e) => handleOnChange(e, "password")}
          errorMessage={errorPassword}
          rightIcon={
            <Icon
              type="material-community"
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              iconStyle={styles.icon}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />
        <Input
          containerStyle={styles.input}
          placeholder="8 digitos"
          label="Confirmar Contraseña"
          password={true}
          secureTextEntry={!showPassword}
          onChange={(e) => handleOnChange(e, "confirmPassword")}
          errorMessage={errorConfirPassword}
          rightIcon={
            <Icon
              type="material-community"
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              iconStyle={styles.icon}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />

        <Button
          style={styles.btn}
          title="Siguiente"
          onPress={() => registerUser()}
        ></Button>
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#140152",
  },
  background: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-around",
    paddingTop: Constants.statusBarHeight,
    height: height,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 25,
    margin: 5,
    paddingLeft: 25,
    paddingTop: 15,
    width: "85%",
  },
  btn: {
    flexDirection: "column",
  },
  text: {
    color: "#fff",
    fontSize: 25,
  },
  tittle: {
    color: "#fff",
    fontSize: 45,
  },
  icon: {
    color: "#85929E",
  },
});

const validateEmail = function (email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
