import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/screens/Login";
import SendMail from "./src/screens/SendMail";
import Home from "./src/screens/Home";
import { Provider as PaperProvider } from "react-native-paper";
import ResetPassword from "./src/screens/ResetPassword";

import { Provider } from "react-redux";
import store from "./src/state/store";
import CodeReset from "./src/screens/CodeReset";


const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="/"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="/" component={Login} />
            <Stack.Screen name="Mail" component={SendMail} />
            <Stack.Screen name="Reset" component={ResetPassword} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="CodeReset" component={CodeReset} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
