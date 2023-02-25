import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  predictionMode: false,
  logMessage: [],
  classNames: ["Class 1", "Class 2"],
};

export const machineSlice = createSlice({
  initialState,
  name: "machine",
  reducers: {
    addClassName: (state, { payload: { name } }) => {
      state.classNames.push(name);
    },
    removeClassName: (state, { payload: { name } }) => {
      let newClassNames = state.classNames.filter((item) => item !== name);
      state.classNames = newClassNames;
    },
    resetClassName: (state) => {
      state.classNames = ["Class 1", "Class 2"];
    },

    setPredictionMode: (state, { payload: { isPrediction } }) => {
      state.predictionMode = isPrediction;
    },
    addLogMessage: (state, { payload: { message } }) => {
      state.logMessage.push(message);
    },
    clearLogMessage: (state) => {
      state.logMessage = [];
    },
  },
});

export const {
  addClassName,
  removeClassName,
  resetClassName,
  setPredictionMode,
  addLogMessage,
  clearLogMessage,
} = machineSlice.actions;
export default machineSlice.reducer;
