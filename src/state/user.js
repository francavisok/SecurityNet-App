import axios from "axios";
import { createAction, createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUser = createAsyncThunk("USER_ME", async () => {
  const token = await AsyncStorage.getItem("token");
  //console.log('token del me', token)
  try {
    const res = await axios.get("http://localhost:3001/api/securityguard/me", {
      headers: { token },
    });
    //console.log('resdata me', res.data)
    return res.data;
  } catch (error) {
    console.log("error de me", error);
  }
});

export const loginUser = createAsyncThunk("LOGIN_USER", async (userData) => {
  try {
    //console.log('userdata', userData)
    const response = await axios.post(
      "http://localhost:3001/api/securityguard/login",
      userData
    );
    //console.log('res try@', response)
    return response.data;
  } catch (error) {
    console.log("errrror response@", error.response);
    return error.response.status;
  }
});

export const logOutUser = createAction("LOGOUT_USER")

const userReducer = createReducer(
  {},
  {
    [loginUser.fulfilled]: (state, action) => action.payload,
    [getUser.fulfilled]: (state, action) => action.payload,
    [logOutUser]: (state, action) => state = {},
  }
);

export default userReducer;
