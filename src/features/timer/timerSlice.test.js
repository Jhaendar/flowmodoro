import { describe, it, expect } from "vitest";
import timerReducer, {
  setMode,
  setStatus,
  resetTimer,
  startTimer,
  pauseTimer,
  resumeTimer,
} from "./timerSlice";
import { TIMER_MODE, TIMER_STATUS } from "@/lib/constants";

describe("timerSlice", () => {
  const initialState = {
    mode: TIMER_MODE.WORK,
    workStartTime: 0,
    workEndTime: 0,
    breakStartTime: 0,
    breakEndTime: 0,
    bankedBreakTime: 0,
    pauseStartTime: 0,
    pauseEndTime: 0,
    status: TIMER_STATUS.IDLE,
  };

  it("should return initial state", () => {
    expect(timerReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle setMode", () => {
    const actual = timerReducer(initialState, setMode(TIMER_MODE.BREAK));
    expect(actual.mode).toBe(TIMER_MODE.BREAK);
  });

  it("should handle setStatus", () => {
    const actual = timerReducer(initialState, setStatus(TIMER_STATUS.RUNNING));
    expect(actual.status).toBe(TIMER_STATUS.RUNNING);
  });

  it("should handle resetTimer", () => {
    const modifiedState = {
      mode: TIMER_MODE.BREAK,
      workStartTime: 1000,
      workEndTime: 2000,
      breakStartTime: 3000,
      breakEndTime: 4000,
      bankedBreakTime: 500,
      pauseStartTime: 5000,
      pauseEndTime: 6000,
      status: TIMER_STATUS.RUNNING,
    };

    const actual = timerReducer(modifiedState, resetTimer());
    expect(actual).toEqual(initialState);
  });

  it("should handle startTimer", () => {
    const now = performance.now();
    const actual = timerReducer(
      initialState,
      startTimer({
        workStartTime: now,
        workEndTime: now,
      })
    );

    expect(actual.status).toBe(TIMER_STATUS.RUNNING);
    expect(actual.workStartTime).toBe(now);
    expect(actual.workEndTime).toBe(now);
  });

  it("should handle pauseTimer", () => {
    const runningState = {
      ...initialState,
      status: TIMER_STATUS.RUNNING,
    };

    const now = performance.now();
    const actual = timerReducer(
      runningState,
      pauseTimer({
        pauseStartTime: now,
      })
    );

    expect(actual.status).toBe(TIMER_STATUS.PAUSED);
    expect(actual.pauseStartTime).toBe(now);
  });

  it("should handle resumeTimer for work mode", () => {
    const pausedState = {
      ...initialState,
      mode: TIMER_MODE.WORK,
      status: TIMER_STATUS.PAUSED,
      workStartTime: 1000,
      workEndTime: 2000,
      pauseStartTime: 2500,
    };

    const pauseEndTime = 3500; // Paused for 1000ms
    const actual = timerReducer(
      pausedState,
      resumeTimer({
        pauseEndTime,
      })
    );

    expect(actual.status).toBe(TIMER_STATUS.RUNNING);
    expect(actual.workStartTime).toBe(2000); // 1000 + 1000
    expect(actual.workEndTime).toBe(3000); // 2000 + 1000
  });

  it("should handle resumeTimer for break mode", () => {
    const pausedState = {
      ...initialState,
      mode: TIMER_MODE.BREAK,
      status: TIMER_STATUS.PAUSED,
      breakStartTime: 1000,
      breakEndTime: 2000,
      pauseStartTime: 2500,
    };

    const pauseEndTime = 3500; // Paused for 1000ms
    const actual = timerReducer(
      pausedState,
      resumeTimer({
        pauseEndTime,
      })
    );

    expect(actual.status).toBe(TIMER_STATUS.RUNNING);
    expect(actual.breakStartTime).toBe(2000); // 1000 + 1000
    expect(actual.breakEndTime).toBe(3000); // 2000 + 1000
  });
});
