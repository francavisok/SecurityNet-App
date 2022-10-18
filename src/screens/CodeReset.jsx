import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet,View } from "react-native";
import { Button, Headline, Subheading, Text, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { sendCode } from '../state/reseted';


const CodeReset = ({navigation}) => {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
    const {
        control,
        handleSubmit,
        formState: { errors, isDirty, isValid },
      } = useForm({
        defaultValues: {
          code:""
        },
        mode: "onChange",
      });


      const onSubmit = async (data) => {
        data.id=user.id
        const response = await dispatch(sendCode(data))
        console.log("PAYLOAD",response.payload)
        if (response.payload) {
          navigation.navigate("Reset");
        } else {
          console.log("codigo incorrecto");
        }
      };

  return (
    <View style={styles.container}>
        <Subheading style={{textAlign:"center", marginBottom:20}}>
            Ingrese el código de verificación que le enviamos a su correo electrónico.
        </Subheading>

        <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            error={errors.code ? true : false}
            activeOutlineColor="blue"
            mode="outlined"
            label={"Código"}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
          
        )}
        name="code"
      />
       {errors.code && (
        <Text style={{ color: "red", marginBottom: 10 }}>
          Campo requerido.
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
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      padding: 30,
    },
  });
export default CodeReset