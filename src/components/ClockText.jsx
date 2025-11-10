import { TimeDuration } from "@/lib/timer";
import { useSelector } from "react-redux";
import { TIMER_MODE } from "@/lib/constants";

const ClockText = () => {
  const mode = useSelector((state) => state.timer.mode);
  const workStartTime = useSelector((state) => state.timer.workStartTime);
  const workEndTime = useSelector((state) => state.timer.workEndTime);
  const breakStartTime = useSelector((state) => state.timer.breakStartTime);
  const breakEndTime = useSelector((state) => state.timer.breakEndTime);

  function getTime() {
    if (mode === TIMER_MODE.WORK) {
      return new TimeDuration(workStartTime, workEndTime);
    }
    if (mode === TIMER_MODE.BREAK) {
      return new TimeDuration(breakStartTime, breakEndTime);
    }
  }

  const time = getTime();
  let { hours, minutes, seconds } = time.getTimeComponents();

  return (
    <p
      className={`text-center font-mono text-5xl ${mode === TIMER_MODE.BREAK ? "text-green-500" : ""}`}
    >
      {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
      {String(seconds).padStart(2, "0")}
    </p>
  );
};

export default ClockText;
