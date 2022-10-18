import React from "react";
import {StyleSheet, View } from "react-native";
import { Appbar } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from "react-redux";
import { logOutUser } from "../state/user";

const AppBar = ({navigation}) => {

    const dispatch = useDispatch();

    const handleLogout = async () => {
        
        await AsyncStorage.removeItem("token")
        const token = await AsyncStorage.getItem("token")
        console.log("TOKEN", token)
        await dispatch(logOutUser())
        navigation.navigate("/")
    }


  return (
    <View>
      <Appbar style={styles.bottom}>
        <Appbar.Action
          icon="calendar"
          onPress={() => console.log("Pressed archive")}
        />
        <Appbar.Content title="Securitynet" />
        <Appbar.Action
          icon="logout"
          onPress={() => handleLogout()}
        />
      </Appbar>
    </View>
  );
};

export default AppBar;

const styles = StyleSheet.create({
    bottom: {
      width: "100%",
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor:"blue"

    },
  });
