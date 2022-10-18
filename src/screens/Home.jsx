
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Headline,
  Text,
  Dialog,
  Portal,
  Paragraph,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { getEventsGuard } from "../state/eventsGuard";
import Moment from "moment";
import * as Location from "expo-location"
import { sendReportArrive } from "../state/reports";
import AppBar from "./AppBar";
import NetInfo from '@react-native-community/netinfo';

const Home = ({navigation}) => {

  const user = useSelector((state) => state.user);
  const events = useSelector((state) => state.eventsGuard);
  
  const date = new Date();
  const hoy = Moment(date).format("YYYY-MM-DD");

  const actualEvent = events?.find((event) => event.start.split("T")[0] === hoy || event.end.split("T")[0] === hoy);

  const dispatch = useDispatch();

  const unsubscribe = NetInfo.addEventListener(state => {
    console.log('Connection type', state.type);
    console.log('Is connected?', state.isConnected);
  });


  useEffect(() => {
    dispatch(getEventsGuard(user.id))
  }, [dispatch]);

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLatitude(location.coords.latitude);
    setLongitude(location.coords.longitude);
  }

  getCurrentLocation()

  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();


  const [value, setValue] = useState(false);

  const [visible, setVisible] = React.useState(false);

  const hideDialog = () => setVisible(false);


  const onSubmit = async () => {
    const data = {
      latitude,
      longitude,
      securityGuardId: user.id,
      branchOfficeId: actualEvent?.branchofficeId
    }

    console.log("DATA", data)
    const response = await dispatch(sendReportArrive(data));

    console.log("RESPONSE", response)

    if (value === false) {
      setValue(true);
    } else {
      setValue(false);
    }
    //sendInfo()
    hideDialog();
  }
  


  return (
    <>
      <View style={styles.container}>
        <AppBar navigation={navigation}/>
        <Headline style={{textAlign:"center", marginTop:30}}>Bienvenid@ {user.name} {user.lastname}</Headline>
        {value === false ? (
          <Button // disabled={!isDirty || !isValid}
            style={{ marginTop: 25, width: "50%", alignSelf: "center" }}
            color="green"
            mode="contained"
            title="Submit"
            // onPress={handleSubmit(onSubmit)}
            onPress={() => setVisible(true)}
          >
            Llegué
          </Button>
        ) : (
          <Button // disabled={!isDirty || !isValid}
            style={{ marginTop: 25 }}
            color="red"
            mode="contained"
            title="Submit"
            // onPress={handleSubmit(onSubmit)}
            onPress={() => setVisible(true)}
          >
            Me voy
          </Button>
        )}
      </View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <Paragraph>
              ¿Estás seguro de realizar la siguiente acción?
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancelar</Button>
            <Button
              onPress={onSubmit}
            >
              Ok
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
    marginTop:50,
  },
});
export default Home;
