import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

export const getEventsGuard = createAsyncThunk("EVENTS_GUARD", async (id) => {
  try {
    const response = await axios.get(`http://localhost:3001/api/event/securityguards/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

const eventsGuardReducer = createReducer([], {
    [getEventsGuard.fulfilled]: (state, action) => action.payload,
    
  });

export default eventsGuardReducer;