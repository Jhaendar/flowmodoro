import { useEffect, useState } from "react";
import ClockText from "@/components/ClockText";
import ClockStatus from "@/components/ClockStatus";
import ClockControls from "./ClockControls";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [breakTime, setBreakTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkMode, setIsWorkMode] = useState(true);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        if (isWorkMode) {
          setTime((prev) => prev + 1);
        } else {
          setBreakTime((prev) => {
            if (Math.floor(prev) === 0) {
              setIsWorkMode(true);
              return 0;
            }
            return Math.floor(prev) - 1;
          });
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning, isWorkMode]);

  return (
    <div className='clock m-auto flex flex-col items-center justify-center'>
      <ClockStatus isWorkMode={isWorkMode} />
      <ClockText time={isWorkMode ? time : breakTime} />
      <ClockControls
        isRunning={isRunning}
        setIsRunning={setIsRunning}
        isWorkMode={isWorkMode}
        setIsWorkMode={setIsWorkMode}
        time={time}
        setTime={setTime}
        breakTime={breakTime}
        setBreakTime={setBreakTime}
      />
    </div>
  );
};

export default Stopwatch;
