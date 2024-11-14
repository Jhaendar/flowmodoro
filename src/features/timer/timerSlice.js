import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Satellite } from "lucide-react";

const initialState = {
  mode: "work", // work | break | long-break
  workStartTime: 0,
  workEndTime: 0,
  breakStartTime: 0,
  breakEndTime: 0,
  bankedBreakTime: 0,
  pauseStartTime: 0,
  pauseEndTime: 0,
  status: "idle", // 'idle' | 'running' | 'paused'
};

export const timerRefresh = createAsyncThunk(
  "timer/timerRefresh",
  async (_, { dispatch, getState }) => {
    // let animationFrameId;

    const updateTimer = () => {
      const { timer } = getState();
      const { mode, workStartTime, breakEndTime } = timer;

      if (mode === "work") {
        dispatch(
          updateWorkTimer({ workStartTime, workEndTime: performance.now() })
        );
      } else if (mode === "break") {
        let newBreakStartTime = performance.now();

        if (breakEndTime - newBreakStartTime < 0) {
          //switch mode
          dispatch(setMode("work"));
          dispatch(
            updateWorkTimer({
              workStartTime: performance.now(),
              workEndTime: performance.now(),
            })
          );
        } else {
          dispatch(
            updateBreakTimer({
              breakStartTime: performance.now(),
              breakEndTime,
            })
          );
        }
      }

      if (getState().timer.status === "running") {
        requestAnimationFrame(updateTimer);
      }
    };

    requestAnimationFrame(updateTimer);
  }
);

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    updateWorkTimer: (state, action) => {
      const { workStartTime, workEndTime } = action.payload;
      state.workStartTime = workStartTime;
      state.workEndTime = workEndTime;
    },
    updateBreakTimer: (state, action) => {
      const { breakStartTime, breakEndTime } = action.payload;
      state.breakStartTime = breakStartTime;
      state.breakEndTime = breakEndTime;
    },
    updatePauseTimer: (state, action) => {
      const { pauseStartTime, pauseEndTime } = action.payload;
      state.pauseStartTime = pauseStartTime;
      state.pauseEndTime = pauseEndTime;
    },
    setBankedBreakTime: (state, action) => {
      state.bankedBreakTime = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    resetTimer: (state) => {
      state.mode = "work";
      state.workStartTime = 0;
      state.workEndTime = 0;
      state.breakStartTime = 0;
      state.breakEndTime = 0;
      state.bankedBreakTime = 0;
      state.pauseStartTime = 0;
      state.pauseEndTime = 0;
      state.status = "idle";
    },
    startTimer: (state, action) => {
      // all preparation when starting timer for the first time
      const { workStartTime, workEndTime } = action.payload;
      state.status = "running";
      state.workEndTime = workStartTime;
      state.workStartTime = workEndTime;
    },
    pauseTimer: (state, action) => {
      // all preparation when pausing timer
      const { pauseStartTime } = action.payload;
      state.status = "paused";
      state.pauseStartTime = pauseStartTime;
    },
    resumeTimer: (state, action) => {
      // all preparation when resuming timer
      const { pauseEndTime } = action.payload;

      state.status = "running";
      const pauseDuration = pauseEndTime - state.pauseStartTime;

      if (state.mode === "work") {
        state.workEndTime += pauseDuration;
        state.workStartTime += pauseDuration;
      } else if (state.mode === "break") {
        state.breakEndTime += pauseDuration;
        state.breakStartTime += pauseDuration;
      }
    },
    changeToBreakTimer(state, action) {
      const { breakStartTime, breakMode } = action.payload;
      state.mode = "break";

      state.breakStartTime = breakStartTime;
      const breakFactor = breakMode === "long" ? 1 : 0.25;
      const currentBreakDuration =
        (state.workEndTime - state.workStartTime) * breakFactor;
      state.breakEndTime =
        state.breakStartTime + state.bankedBreakTime + currentBreakDuration;
    },
    changeToWorkTimer(state, action) {
      const { workStartTime, workEndTime } = action.payload;
      state.mode = "work";
      state.bankedBreakTime += state.breakEndTime - state.breakStartTime;

      state.workStartTime = workStartTime;
      state.workEndTime = workEndTime;
    },
  },
});

export const {
  setMode,
  setStatus,
  updateWorkTimer,
  updateBreakTimer,
  updatePauseTimer,
  resetTimer,
  startTimer,
  resumeTimer,
  pauseTimer,
  changeToWorkTimer,
  changeToBreakTimer,
} = timerSlice.actions;

export default timerSlice.reducer;
