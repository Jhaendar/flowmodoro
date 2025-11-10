/**
 * Application-wide constants
 */

// Timer constants (in milliseconds)
export const MINIMUM_WORK_TIME_FOR_BREAK = 5000; // 5 seconds minimum work to enable break
export const SHORT_BREAK_FACTOR = 0.25; // 25% of work time
export const LONG_BREAK_FACTOR = 1.0; // 100% of work time

// Timer modes
export const TIMER_MODE = {
  WORK: "work",
  BREAK: "break",
  LONG_BREAK: "long-break",
};

// Timer status
export const TIMER_STATUS = {
  IDLE: "idle",
  RUNNING: "running",
  PAUSED: "paused",
};

// Break modes for button actions
export const BREAK_MODE = {
  SHORT: "break",
  LONG: "long",
};
