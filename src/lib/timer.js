/**
 * Represents a time duration between a start time and an end time.
 * @class
 *
 * @property {number} startTime - The start time of the timer.
 * @property {number} endTime - The end time of the timer.
 */
class TimeDuration {
  /**
   * Creates a new Timer instance.
   * @constructor
   * @param {number} [startTime=0] - The start time of the timer.
   * @param {number} [endTime=0] - The end time of the timer.
   */
  constructor(startTime = 0, endTime = 0) {
    if (startTime === 0) {
      startTime = Date.now();
    }
    if (endTime === 0) {
      endTime = Date.now();
    }
    this.startTime = startTime;
    this.endTime = endTime;
  }

  /**
   * Returns the time elapsed between the start and end times.
   * @returns {number} The time elapsed in milliseconds.
   */
  getElapsed() {
    return this.endTime - this.startTime;
  }

  getTimeComponents() {
    const elapsed = this.getElapsed();
    const hours = Math.floor(elapsed / 3600000);
    const minutes = Math.floor((elapsed % 3600000) / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);

    return { hours, minutes, seconds };
  }

  adjustStartTimeDueToPause(pauseDuration) {
    this.startTime =
      pauseDuration.endTime - (pauseDuration.startTime - this.startTime);
    this.endTime = pauseDuration.endTime;
    return this;
  }

  adjustEndTimeDueToPause(pauseDuration) {
    this.endTime += pauseDuration.getElapsed();
    return this;
  }
}

export { TimeDuration };
