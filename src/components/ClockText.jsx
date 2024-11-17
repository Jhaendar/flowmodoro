import { TimeDuration } from "@/lib/timer";
import { useSelector } from "react-redux";

const ClockText = () => {
  const mode = useSelector((state) => state.timer.mode);
  const workStartTime = useSelector((state) => state.timer.workStartTime);
  const workEndTime = useSelector((state) => state.timer.workEndTime);
  const breakStartTime = useSelector((state) => state.timer.breakStartTime);
  const breakEndTime = useSelector((state) => state.timer.breakEndTime);

  function getTime() {
    if (mode === "work") {
      return new TimeDuration(workStartTime, workEndTime);
    }
    if (mode === "break") {
      return new TimeDuration(breakStartTime, breakEndTime);
    }
  }

  const time = getTime();
  let { hours, minutes, seconds } = time.getTimeComponents();

  let breakStyle = "text-green-500";

  return (
    <p
      className={`text-center font-mono text-5xl ${mode === "break" ? breakStyle : ""}`}
    >
      {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
      {String(seconds).padStart(2, "0")}
    </p>
  );
};

export default ClockText;
