import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  Button,
} from "react-native";
import { Input, Icon } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";
import { logIn, cleanLogIn, getUsers } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import {
  TabRouter,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { CLIENT_ID, REDIRECT_URL } from "@env";

WebBrowser.maybeCompleteAuthSession();

var { height } = Dimensions.get("window");

const LogIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const goForgotPassword = () => {
    navigation.navigate("ForgotPasswordA");
  };

  useEffect(() => {
    dispatch(cleanLogIn());
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const handleOnChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const registerUser = () => {
    if (!validateData()) return;
    dispatch(logIn(formData));
    navigation.navigate("Confirmation");
  };

  const registerUserGoogle = (userGoogle) => {
    dispatch(logIn(userGoogle));
    navigation.navigate("Confirmation");
  };

  const validateData = () => {
    setErrorEmail("");
    setErrorPassword("");
    let isValid = true;

    if (!validateEmail(formData.email)) {
      setErrorEmail("Debes ingresar un E-mail válido");
      isValid = false;
    }

    if (formData.password.length < 8) {
      setErrorPassword("Contraseña incorrecta");
      isValid = false;
    }

    return isValid;
  };

  // GOOGLE
  const [LogIngoogle, setLogInGoogle] = useState(false);
  const getAllEmails = useSelector((state) => state.users);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getUsers());
    }, [])
  );

  async function loadGoogleInfoUser(token) {
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const userInfo = await response.json();

    if (userInfo.email) {
      console.log(getAllEmails);
      const userFound = (await getAllEmails).find(
        (u) => u.email === userInfo.email
      );
      if (userFound) {
        const user = await userFound;
        user.password = `googleHENRYBANK${user.email.length * 2}`;
        registerUserGoogle(user);
      } else {
        navigation.navigate("RegisterB", {
          email: userInfo.email,
          image: userInfo.picture,
        });
      }
    }
  }

  async function signInGoogle() {
    const RESPONSE_TYPE = "token";
    const SCOPE = encodeURI("profile email");

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
    setLogInGoogle(true);
    const { params } = await AuthSession.startAsync({ authUrl });
    loadGoogleInfoUser(params.access_token);
  }

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <LinearGradient colors={["#126492", "#140152"]} style={styles.background}>
        <Image
          style={styles.image}
          source={require("../../imgs/HenryBank.png")}
        ></Image>

        <Input
          containerStyle={styles.input}
          placeholder="Soyhenry@gmail.com"
          label="E-mail"
          onChange={(e) => handleOnChange(e, "email")}
          errorMessage={errorEmail}
          defaultValue={formData.email}
        ></Input>
        <Input
          containerStyle={styles.input}
          placeholder="Soyhenry123"
          label="Contraseña"
          password={true}
          secureTextEntry={!showPassword}
          onChange={(e) => handleOnChange(e, "password")}
          errorMessage={errorPassword}
          defaultValue={formData.password}
          rightIcon={
            <Icon
              type="material-community"
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              iconStyle={styles.icon}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />

        <View style={styles.btnContainer}>
          <View style={styles.btn}>
            <Button
              title="GOOGLE"
              color={"purple"}
              onPress={() => signInGoogle()}
            ></Button>
          </View>
          <View style={styles.btn}>
            <Button
              title="Registrarse"
              color="trasparent"
              onPress={() => navigation.navigate("RegisterA")}
            ></Button>
          </View>
          <View style={styles.btn}>
            <Button
              title="Log In"
              color={"purple"}
              onPress={() => registerUser()}
            ></Button>
          </View>
        </View>
        <Text style={styles.text} onPress={() => goForgotPassword()}>
          ¿Olvidaste la contraseña?
        </Text>
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
};

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
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 25,
    paddingTop: 10,
    width: "80%",
  },
  icon: {
    color: "#85929E",
  },
  btnContainer: {
    flexDirection: "row",
  },
  btn: {
    margin: 5,
  },
  text: {
    color: "#fff",
    fontSize: 10,
  },
  passwordHelp: {
    color: "#fff",
  },
});

const validateEmail = function (email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export default LogIn;
