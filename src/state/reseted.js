import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

/* const ipEmulador = 10.0.2.2;
const ipCelu = 192.168.0.53; */

export const sendEmail = createAsyncThunk("SEND_EMAIL", async ({email}) => {
  try {
    const res = await axios.put(`http://localhost:3001/api/securityguard/forgot-password`, {email});
    console.log("res de sendEmail", res.data);
    return res.data;
  } catch (error) {
    console.log("ERROR SENDMAIL",error);
  }

}); 

export const sendCode = createAsyncThunk("SEND_CODE", async (data) => {
    const {id,code} = data;
    try {
      const res = await axios.post(`http://localhost:3001/api/securityguard/verify/${id}`, {code});
      console.log("res de sendEmail", res.data);
      return res.data;
    } catch (error) {
      console.log("ERROR SENDMAIL",error);
    }
  
  }); 


  export const newPassword = createAsyncThunk("NEW_PASS", async (data) => {
    const {email,newPassword} = data;
    try {
      const res = await axios.put(`http://1localhost:3001/api/securityguard/create-new-password`, {email,newPassword});
      console.log("RES NEWPASS", res.data);
      return res.data;
    } catch (error) {
      console.log("ERROR NEWPASS",error);
    }
  
  }); 


const resetedReducer = createReducer(
  "",
  {
    [sendEmail.fulfilled]: (state, action) => action.payload,
    [sendCode.fulfilled]: (state, action) => action.payload,
    [newPassword.fulfilled]: (state, action) => action.payload,
  }
);

export default resetedReducer

