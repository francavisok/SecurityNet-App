import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Headline,
  HelperText,
  Subheading,
  Text,
  TextInput,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { sendEmail } from "../state/reseted";

const SendMail = ({ navigation }) => {

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const [text, setText] = React.useState("");

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data) => {
   
    const response = await dispatch(sendEmail(data))
    console.log("PAYLOAD",response.payload)
    if (response.payload.info === "OK") {
      navigation.navigate("CodeReset");
    } else {
      console.log("mail incorrecto");
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.heading}>
          <Headline style={{ marginBottom: 10, textAlign: "center" }}>
            Cambio de contraseña
          </Headline>
          <Subheading style={{ textAlign: "center", marginTop: 10 }}>
            {user.reseted
              ? "Escribe tu email y te enviaremos las instrucciones para cambiar tu contraseña"
              : "Antes de comenzar debes cambiar la contraseña que te dimos, porfavor inserte su email y siga las instrucciones"}
          </Subheading>
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
              activeOutlineColor="blue"
              mode="outlined"
              label={"Email"}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="email"
        />
        {errors.email && (
          <Text style={{ color: "red", marginBottom: 10 }}>
            Email inválido.
          </Text>
        )}
        <Button
          style={{ marginTop: 40 }}
          //disabled={!isDirty || !isValid}
          color="blue"
          mode="contained"
          title="Submit"
          onPress={handleSubmit(onSubmit)}
        >
          Enviar
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 30,
  },
  heading: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 22,
  },
});

export default SendMail;
