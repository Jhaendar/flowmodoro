import { describe, it, expect } from "vitest";
import { TimeDuration } from "./timer";

describe("TimeDuration", () => {
  it("should create instance with start and end times", () => {
    const timer = new TimeDuration(1000, 2000);
    expect(timer.startTime).toBe(1000);
    expect(timer.endTime).toBe(2000);
  });

  it("should calculate elapsed time correctly", () => {
    const timer = new TimeDuration(1000, 3500);
    expect(timer.getElapsed()).toBe(2500);
  });

  it("should get time components correctly for simple case", () => {
    const timer = new TimeDuration(1000, 6000); // 5 seconds difference
    const { hours, minutes, seconds } = timer.getTimeComponents();

    expect(hours).toBe(0);
    expect(minutes).toBe(0);
    expect(seconds).toBe(5);
  });

  it("should get time components correctly for minutes", () => {
    const timer = new TimeDuration(1000, 126000); // 125 seconds = 2 minutes 5 seconds
    const { hours, minutes, seconds } = timer.getTimeComponents();

    expect(hours).toBe(0);
    expect(minutes).toBe(2);
    expect(seconds).toBe(5);
  });

  it("should get time components correctly for hours", () => {
    const timer = new TimeDuration(1000, 3666000); // 3665 seconds = 1 hour 1 minute 5 seconds
    const { hours, minutes, seconds } = timer.getTimeComponents();

    expect(hours).toBe(1);
    expect(minutes).toBe(1);
    expect(seconds).toBe(5);
  });

  it("should handle negative elapsed time", () => {
    const timer = new TimeDuration(2000, 1000); // End before start
    expect(timer.getElapsed()).toBe(-1000);
  });

  it("should adjust end time due to pause correctly", () => {
    const timer = new TimeDuration(1000, 5000);
    const pauseDuration = new TimeDuration(2000, 3000); // 1000ms pause

    timer.adjustEndTimeDueToPause(pauseDuration);

    expect(timer.endTime).toBe(6000); // 5000 + 1000
    expect(timer.startTime).toBe(1000); // Unchanged
  });
});
