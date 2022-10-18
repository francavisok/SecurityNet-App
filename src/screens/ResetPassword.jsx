import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { StyleSheet, View, Pressable } from "react-native";
import { TextInput, Text, Button, Headline } from "react-native-paper";
import { useDispatch } from "react-redux";
import { newPassword } from "../state/reseted";

const ResetPassword = ({navigation}) => {

 const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      newpassword: "",
      confirmpassword: "",
    },
    mode: "onChange",
  });

  const [eye, setEye] = useState(false);
  const[newPass, setNewPass] = useState("");

 

 const onSubmit = async (data) => {
   
  const response = await dispatch(newPassword(data))
  console.log("PAYLOAD",response.payload)
  if (response.payload === "password modificado con exito") {
    //DESLOGUEAR
    navigation.navigate("/");
  } else {
    console.log("mail incorrecto");
  }
};

  return (
    <View style={styles.container}>
      <View>
        <Headline style={{ marginBottom: 20, textAlign: "center" }}>
          Complete los campos para restablecer su contraseña
        </Headline>
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
            style={styles.input}
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
        <Text style={{ color: "red", marginBottom: 10 }}>Email inválido.</Text>
      )}

      <Controller
        control={control}
        rules={{
          required: true,
          minLength: {
            value: 8,
            message: "Minimum length should be 8",
          },
          validate: (value) => { 
            setNewPass(value);
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            label={"Nueva contraseña"}
            secureTextEntry={!eye}
            right={
              <TextInput.Icon
                icon={eye ? "eye-off" : "eye"}
                onPress={() => setEye(!eye)}
              />
            }
            error={errors.newPassword ? true : false}
            activeOutlineColor="blue"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="newPassword"
      />
      {errors.newPassword && (
        <Text style={{ color: "red", marginBottom: 10 }}>
          La contraseña debe tener al menos 8 caracteres.
        </Text>
      )}

      <Controller
        control={control}
        rules={{
          required: true,
          validate: (value) => value === newPass || "Las contraseñas no coinciden",
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            label={"Confirmar contraseña"}
            secureTextEntry={!eye}
            right={
              <TextInput.Icon
                icon={eye ? "eye-off" : "eye"}
                onPress={() => setEye(!eye)}
              />
            }
            error={errors.confirmPassword ? true : false}
            activeOutlineColor="blue"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="confirmPassword"
      />
      {errors.confirmPassword && (
        <Text style={{ color: "red", marginBottom: 10 }}>
          La contraseñas no coinciden.
        </Text>
      )}

      <Button
        style={{ marginTop: 40 }}
        disabled={!isDirty || !isValid}
        color="blue"
        mode="contained"
        title="Submit"
        onPress={handleSubmit(onSubmit)}
      >
        Enviar
      </Button>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "#fff",
  },
  input: {
    marginTop: 20,
  },
});

export default ResetPassword;
