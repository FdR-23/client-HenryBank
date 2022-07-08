import React from "react";

import Constants from 'expo-constants'

import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import UserCardHome from "../UserCardHome/UserCardHome.jsx";
import UserCapital from "../UserCapital/UserCapital.jsx";
import HomeBubbleMenu from "../HomeBubbleMenu/HomeBubbleMenu.jsx";
import RenderScreen from "../RenderScreen/RenderScreen.jsx";

const Home = () => {
  return (
    <View style={styles.container}>
      <LinearGradient colors={["#126492", "#140152"]} style={styles.background}>
        <View>
          <UserCardHome />
        </View>
        <View>
          <UserCapital />
        </View>
        <View style={styles.homeBubble}>
          <HomeBubbleMenu />
        </View>
        <View style={{flex:0, paddingTop:40, alignItems:'center'}}>
          <RenderScreen />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
  homeBubble: {
    paddingTop: 15,
  },
});

export default Home;
