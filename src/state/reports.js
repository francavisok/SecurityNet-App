import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

export const sendReportArrive = createAsyncThunk("SEND_REPORT", async (data) => {
    const {securityGuardId, branchOfficeId, longitude, latitude} = data;
  try {
    const response = await axios.post(`http://localhost:3001/api/report/isthere/${securityGuardId}/${branchOfficeId}`,{longitude, latitude});
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

const reportReducer = createReducer([], {
    [sendReportArrive.fulfilled]: (state, action) => action.payload,
    
  });

export default reportReducer;