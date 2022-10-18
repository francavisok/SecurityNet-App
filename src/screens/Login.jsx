
import React, {useState, useEffect} from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  TextInput,
  Headline,
  Subheading,
  Caption,
  Button,
  Title,
  Snackbar
} from "react-native-paper";
import { loginUser } from "../state/user";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import AsyncStorage from '@react-native-async-storage/async-storage';
 import { getUser } from "../state/user";


const Login = ({ navigation }) => {

  const dispatch = useDispatch();
  const user = useSelector(state=> state.user)
  console.log("USER",user)

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('token', value)
    } catch (e) {
      // saving error
    }
  }

  useEffect(()=>{
    dispatch(getUser())
  }, [])

  useEffect(()=>{
    if(user.email && !user.reseted){
      navigation.navigate('Mail')
    } else if (user.email){
      navigation.navigate('Home')
    }

  }, [user])
  
  //snackbar
  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  //visual contraseña
  const [eye, setEye] = useState(false)

  //hook.form
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    //console.log(data);
    const response = await dispatch(loginUser(data));
    //console.log('resp fronttt @', response.payload)
     if (response.payload.email) {
      storeData(response.payload.token)
      if(user.email && !user.reseted){
        navigation.navigate('Mail')
      } else {
        navigation.navigate('Home')
    } }
    else {
      //console.log("mail incorrecto");
      onToggleSnackBar()
    } 
  };

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Headline style={{ marginBottom: 10 }}>
          Bienvenido a{" "}
          <Title style={{ color: "blue", fontSize: 35 }}>SecurityNet</Title>
        </Headline>
        <Subheading>Por favor loguearse antes de empezar</Subheading>
      </View>
      <Controller
        control={control}
        rules={{
          required: true,
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "invalid email address",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            error={errors.email ? true : false}
            style={styles.input}
            activeOutlineColor="blue"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
      />
      {errors.email && (
        <Text style={{ color: "red", marginBottom: 10 }}>Email invalido.</Text>
      )}
      <Controller
        control={control}
        rules={{
          required: true,
          minLength: {
            value: 8,
            message: "Minimum length should be 8",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            secureTextEntry={!eye}
            right={
              <TextInput.Icon
                icon={eye ? "eye-off" : "eye"}
                onPress={() => setEye(!eye)}
              />
            }
            error={errors.password ? true : false}
            style={styles.input}
            activeOutlineColor="blue"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="password"
      />
      {errors.password && (
        <Text style={{ color: "red", marginBottom: 10 }}>
          La contraseña debe tener al menos 8 caracteres.
        </Text>
      )}

      <TouchableOpacity onPress={() => navigation.navigate("Mail")}>
        <Caption>¿Olvidaste la contraseña ?</Caption>
      </TouchableOpacity>

      <Button
        // disabled={!isDirty || !isValid}
        style={{ marginTop: 25 }}
        color="blue"
        icon="account"
        mode="contained"
        title="Submit"

        onPress={handleSubmit(onSubmit)}

      >
        Log in
      </Button>
      <Snackbar
        visible={visible}
        duration={3000}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'cerrar',
          onPress: () => {
            // Do something
          },
        }}>
        Mail o contraseña incorrecta
      </Snackbar>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 40,
  },
  heading: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
});

export default Login;
